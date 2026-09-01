import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../../design-system/components/Button';
import { Card } from '../../design-system/components/Card';
import { TextArea } from '../../design-system/components/Field';
import { answerTaskClarification, getTaskProcessingState, PrototypeApiError } from '../../mock-api/client';
import { AiCaseFlowHeader } from './AiCaseFlowHeader';
import styles from './AiCaseFlow.module.css';
import { useAiCaseFlowStore } from './flowStore';

export function ClarifyAiCaseScreen() {
  const { taskId = '' } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const flow = useAiCaseFlowStore();
  const [answer, setAnswer] = useState('');

  const query = useQuery({
    queryKey: ['task-processing', taskId],
    queryFn: ({ signal }) => getTaskProcessingState(taskId, signal),
    enabled: Boolean(taskId),
  });

  const mutation = useMutation({
    mutationFn: ({ clarificationId, answerText }: { clarificationId: string; answerText: string }) => answerTaskClarification(
      taskId,
      clarificationId,
      { answer_text: answerText, answer_channel: 'text' },
      `${flow.taskIdempotencyKey}-clarification-${query.data?.pending_clarification?.sequence_no ?? 1}`,
    ),
    onSuccess: (nextState) => {
      queryClient.setQueryData(['task-processing', taskId], nextState);
      setAnswer('');
      if (nextState.status === 'completed') {
        navigate(`/ai-cases/${taskId}/processing`, { replace: true });
      }
    },
  });

  const pending = query.data?.pending_clarification ?? null;

  if (query.isPending) {
    return (
      <div className={styles.page}>
        <AiCaseFlowHeader title="Уточнение" backTo={`/ai-cases/${taskId}/processing`} />
        <section className={styles.processingStage} aria-busy="true"><strong>Загружаем вопрос…</strong></section>
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className={styles.page}>
        <AiCaseFlowHeader title="Уточнение" backTo={`/ai-cases/${taskId}/processing`} />
        <Card tone="error">
          <div className={styles.errorPanel}>
            <p className={styles.note} role="alert">{query.error instanceof PrototypeApiError ? query.error.payload.message : 'Не удалось загрузить уточнение.'}</p>
            <Button onClick={() => void query.refetch()}>Повторить</Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!pending) {
    return (
      <div className={styles.page}>
        <AiCaseFlowHeader title="Уточнение" backTo={`/ai-cases/${taskId}/processing`} />
        <Card tone="secondary">
          <div className={styles.stack}>
            <p className={styles.note}>{query.data?.clarification_count === 3 ? 'Лимит уточнений достигнут. Четвёртый вопрос не задаётся.' : 'Дополнительный вопрос не требуется.'}</p>
            <Button onClick={() => navigate(`/ai-cases/${taskId}/processing`)}>Продолжить обработку</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <AiCaseFlowHeader title="Нужно короткое уточнение" lead="Ответьте только на текущий вопрос. Суммарный hard limit — три уточнения." backTo={`/ai-cases/${taskId}/processing`} />
      <form className={styles.form} onSubmit={(event) => {
        event.preventDefault();
        const answerText = answer.trim();
        if (!answerText) return;
        mutation.mutate({ clarificationId: pending.clarification_id, answerText });
      }}>
        <span className={styles.questionCount}>Вопрос {pending.sequence_no} из максимум 3</span>
        <Card>
          <p className={styles.question}>{pending.question_text}</p>
        </Card>
        <TextArea
          label="Ваш ответ"
          rows={5}
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          error={mutation.isError ? (mutation.error instanceof PrototypeApiError ? mutation.error.payload.message : 'Ответ не отправлен.') : undefined}
        />
        <Button type="submit" loading={mutation.isPending} disabled={!answer.trim()}>Ответить</Button>
      </form>
    </div>
  );
}
