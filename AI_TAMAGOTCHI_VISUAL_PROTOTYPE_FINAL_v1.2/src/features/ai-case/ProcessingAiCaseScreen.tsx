import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../../design-system/components/Button';
import { Card } from '../../design-system/components/Card';
import { useDemoControlStore } from '../../demo-controls/store';
import { createTask, getTaskProcessingState, PrototypeApiError } from '../../mock-api/client';
import { AiCaseFlowHeader } from './AiCaseFlowHeader';
import styles from './AiCaseFlow.module.css';
import { useAiCaseFlowStore } from './flowStore';

export function ProcessingAiCaseScreen() {
  const { taskId = '' } = useParams();
  const navigate = useNavigate();
  const flow = useAiCaseFlowStore();
  const demo = useDemoControlStore();

  const query = useQuery({
    queryKey: ['task-processing', taskId],
    queryFn: ({ signal }) => getTaskProcessingState(taskId, signal),
    enabled: Boolean(taskId),
  });

  const retryMutation = useMutation({
    mutationFn: createTask,
    onSuccess: async () => {
      await query.refetch();
    },
  });

  useEffect(() => {
    if (query.data?.status === 'waiting_clarification') {
      navigate(`/ai-cases/${taskId}/clarify`, { replace: true });
    }
    if (query.data?.status === 'completed') {
      navigate(`/ai-cases/${taskId}/result`, { replace: true });
    }
  }, [navigate, query.data?.status, taskId]);

  async function retryProcessing() {
    if (!flow.createRequest) {
      await query.refetch();
      return;
    }
    try {
      await retryMutation.mutateAsync({
        request: flow.createRequest,
        clarificationCount: demo.aiCaseClarifications,
        resultLevel: demo.aiCaseResultLevel,
        scenario: demo.aiCaseScenario,
        idempotencyKey: flow.taskIdempotencyKey,
      });
    } catch {
      // Typed retry failure remains visible through mutation/query state.
    }
  }

  const apiMessage = query.error instanceof PrototypeApiError
    ? query.error.payload.message
    : 'Не удалось получить состояние обработки.';

  const failed = query.data?.status === 'failed';

  return (
    <div className={styles.page}>
      <AiCaseFlowHeader title="Обрабатываем AI-задачу" lead="Исходное описание уже принято mock-backend. Числовые эффекты появятся только после server-side результата." backTo="/ai-cases/new" />
      <div className={styles.stack}>
        {query.isPending || query.isFetching ? (
          <section className={styles.processingStage} aria-live="polite" aria-busy="true">
            <div className={styles.processingIndicator} aria-hidden="true">AI</div>
            <strong>Анализируем описание…</strong>
            <p className={styles.note}>Проверяем факты, классификацию и необходимость уточнения.</p>
          </section>
        ) : null}

        {query.isError ? (
          <Card tone="error">
            <div className={styles.errorPanel}>
              <strong>Не удалось обновить состояние</strong>
              <p className={styles.note} role="alert">{apiMessage}</p>
              <Button type="button" onClick={() => void query.refetch()}>Повторить запрос</Button>
            </div>
          </Card>
        ) : null}

        {failed ? (
          <Card tone="error">
            <div className={styles.errorPanel}>
              <strong>Обработка не завершилась</strong>
              <p className={styles.note}>Raw input уже принят. Повторная отправка использует тот же Idempotency-Key и не должна создавать дубликат AI-кейса.</p>
              <Button type="button" loading={retryMutation.isPending} onClick={() => void retryProcessing()}>Повторить обработку</Button>
            </div>
          </Card>
        ) : null}

        {!query.isPending && !query.isError && !failed && query.data ? (
          <p className={styles.liveRegion} aria-live="polite">Состояние: {query.data.status}</p>
        ) : null}
      </div>
    </div>
  );
}
