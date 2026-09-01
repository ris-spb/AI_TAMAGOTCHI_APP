import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../design-system/components/Button';
import { Card } from '../../design-system/components/Card';
import { TextArea } from '../../design-system/components/Field';
import { useDemoControlStore } from '../../demo-controls/store';
import { createTask, PrototypeApiError } from '../../mock-api/client';
import { AiCaseFlowHeader } from './AiCaseFlowHeader';
import styles from './AiCaseFlow.module.css';
import { useAiCaseFlowStore } from './flowStore';
import { taskCreateRequestSchema } from './schemas';

type TranscriptForm = { transcript: string };

export function TranscriptAiCaseScreen() {
  const navigate = useNavigate();
  const flow = useAiCaseFlowStore();
  const demo = useDemoControlStore();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<TranscriptForm>({ defaultValues: { transcript: flow.transcript } });
  const transcript = watch('transcript');

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: (accepted, variables) => {
      flow.setTranscript(variables.request.raw_input);
      flow.setDraft(variables.request.raw_input, []);
      flow.setInputChannel('voice');
      flow.setAcceptedTask(accepted.task_id, variables.request);
      navigate(`/ai-cases/${accepted.task_id}/processing`);
    },
  });

  const submit = handleSubmit(async ({ transcript: text }) => {
    const parsed = taskCreateRequestSchema.safeParse({ input_channel: 'voice', raw_input: text.trim() });
    if (!parsed.success) return;
    try {
      await mutation.mutateAsync({
        request: parsed.data,
        clarificationCount: demo.aiCaseClarifications,
        resultLevel: demo.aiCaseResultLevel,
        scenario: demo.aiCaseScenario,
        idempotencyKey: flow.taskIdempotencyKey,
      });
    } catch {
      // Keep the editable transcript and expose the mutation error in-place.
    }
  });

  return (
    <div className={styles.page}>
      <AiCaseFlowHeader title="Проверьте текст" lead="Исправьте transcript перед отправкой. Именно этот текст станет raw input AI-кейса." backTo="/ai-cases/new/voice" />
      {!flow.transcript ? (
        <Card tone="secondary">
          <div className={styles.stack}>
            <p className={styles.note}>В текущей demo session ещё нет распознанного текста.</p>
            <Button variant="secondary" onClick={() => navigate('/ai-cases/new/voice')}>К голосовой записи</Button>
          </div>
        </Card>
      ) : (
        <form className={styles.form} onSubmit={submit} noValidate>
          <TextArea
            label="Распознанный текст"
            rows={8}
            error={errors.transcript?.message}
            {...register('transcript', { required: 'Transcript не может быть пустым.' })}
          />
          {mutation.isError ? <Card tone="error"><p className={styles.note} role="alert">{mutation.error instanceof PrototypeApiError ? mutation.error.payload.message : 'Не удалось отправить transcript.'}</p></Card> : null}
          <div className={styles.actions}>
            <Button variant="secondary" type="button" onClick={() => navigate('/ai-cases/new/voice')}>Перезаписать</Button>
            <Button type="submit" loading={mutation.isPending} disabled={!transcript?.trim()}>Отправить на обработку</Button>
          </div>
        </form>
      )}
    </div>
  );
}
