import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../design-system/components/Button';
import { Card } from '../../design-system/components/Card';
import { TextArea, TextField } from '../../design-system/components/Field';
import { useDemoControlStore } from '../../demo-controls/store';
import { createTask, PrototypeApiError } from '../../mock-api/client';
import { AiCaseFlowHeader } from './AiCaseFlowHeader';
import styles from './AiCaseFlow.module.css';
import { useAiCaseFlowStore } from './flowStore';
import { taskCreateRequestSchema } from './schemas';

const DEFAULT_LINKS = [''];

type TextCaseForm = { rawInput: string };

function errorText(error: unknown) {
  if (error instanceof PrototypeApiError) return error.payload.message;
  return 'Не удалось отправить AI-кейс. Проверьте соединение и повторите попытку.';
}

export function AddAiCaseScreen() {
  const navigate = useNavigate();
  const flow = useAiCaseFlowStore();
  const demo = useDemoControlStore();
  const [links, setLinks] = useState<string[]>(flow.links.length ? [...flow.links] : DEFAULT_LINKS);
  const [linksError, setLinksError] = useState<string | null>(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<TextCaseForm>({
    defaultValues: { rawInput: flow.draftText },
  });
  const rawInput = watch('rawInput');

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: (accepted, variables) => {
      flow.setDraft(variables.request.raw_input, variables.request.links ?? []);
      flow.setInputChannel('text');
      flow.setAcceptedTask(accepted.task_id, variables.request);
      navigate(`/ai-cases/${accepted.task_id}/processing`);
    },
  });

  const submit = handleSubmit(async ({ rawInput: input }) => {
    const normalizedLinks = links.map((value) => value.trim()).filter(Boolean);
    const candidate = { input_channel: 'text' as const, raw_input: input.trim(), ...(normalizedLinks.length ? { links: normalizedLinks } : {}) };
    const parsed = taskCreateRequestSchema.safeParse(candidate);
    if (!parsed.success) {
      const linkIssue = parsed.error.issues.find((issue) => issue.path[0] === 'links');
      setLinksError(linkIssue?.message ?? null);
      return;
    }
    setLinksError(null);
    try {
      await mutation.mutateAsync({
        request: parsed.data,
        clarificationCount: demo.aiCaseClarifications,
        resultLevel: demo.aiCaseResultLevel,
        scenario: demo.aiCaseScenario,
        idempotencyKey: flow.taskIdempotencyKey,
      });
    } catch {
      // React Query mutation state renders the typed failure without losing the draft.
    }
  });

  return (
    <div className={styles.page}>
      <AiCaseFlowHeader
        title="Добавить AI-задачу"
        lead="Опишите рабочую задачу, которую вы уже выполнили с помощью ИИ. Это не список будущих дел."
      />
      <form className={styles.form} onSubmit={submit} noValidate>
        <TextArea
          label="Что вы сделали с помощью ИИ?"
          hint="Опишите результат и то, как ИИ участвовал в работе."
          rows={7}
          error={errors.rawInput?.message}
          {...register('rawInput', { required: 'Опишите уже выполненную AI-задачу.' })}
        />

        <Card title="Ссылки — необязательно" tone="secondary">
          <div className={styles.links}>
            <p className={styles.note}>Ссылки сохраняются как текст. Макет не открывает и не анализирует их содержимое.</p>
            {links.map((value, index) => (
              <div className={styles.linkRow} key={`link-${index}`}>
                <TextField
                  label={`Ссылка ${index + 1}`}
                  type="url"
                  value={value}
                  error={index === 0 ? linksError ?? undefined : undefined}
                  onChange={(event) => setLinks((current) => current.map((item, itemIndex) => itemIndex === index ? event.target.value : item))}
                  placeholder="https://"
                />
                <button className={styles.removeLink} type="button" onClick={() => setLinks((current) => current.length === 1 ? [''] : current.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Удалить ссылку ${index + 1}`}>×</button>
              </div>
            ))}
            <Button variant="tertiary" type="button" onClick={() => setLinks((current) => [...current, ''])}>Добавить ссылку</Button>
          </div>
        </Card>

        {mutation.isError ? <Card tone="error"><p className={styles.note} role="alert">{errorText(mutation.error)}</p></Card> : null}

        <div className={styles.actions}>
          <Button variant="secondary" type="button" onClick={() => navigate('/ai-cases/new/voice')}>Записать голосом</Button>
          <Button type="submit" loading={mutation.isPending} disabled={!rawInput?.trim()}>Отправить на обработку</Button>
        </div>
      </form>
    </div>
  );
}
