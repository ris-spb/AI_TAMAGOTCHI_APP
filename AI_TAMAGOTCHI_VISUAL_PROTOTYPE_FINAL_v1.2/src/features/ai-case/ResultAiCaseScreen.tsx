import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../../design-system/components/Button';
import { Card } from '../../design-system/components/Card';
import { getTaskResult, PrototypeApiError } from '../../mock-api/client';
import { AiCaseFlowHeader } from './AiCaseFlowHeader';
import styles from './AiCaseFlow.module.css';

export function ResultAiCaseScreen() {
  const { taskId = '' } = useParams();
  const navigate = useNavigate();
  const query = useQuery({
    queryKey: ['task-result', taskId],
    queryFn: ({ signal }) => getTaskResult(taskId, signal),
    enabled: Boolean(taskId),
  });

  if (query.isPending) {
    return (
      <div className={styles.page}>
        <AiCaseFlowHeader title="Результат" backTo={`/ai-cases/${taskId}/processing`} />
        <section className={styles.processingStage} aria-busy="true"><strong>Загружаем результат…</strong></section>
      </div>
    );
  }

  if (query.isError || !query.data) {
    return (
      <div className={styles.page}>
        <AiCaseFlowHeader title="Результат" backTo={`/ai-cases/${taskId}/processing`} />
        <Card tone="error">
          <div className={styles.errorPanel}>
            <p className={styles.note} role="alert">{query.error instanceof PrototypeApiError ? query.error.payload.message : 'Результат пока недоступен.'}</p>
            <Button onClick={() => void query.refetch()}>Повторить</Button>
          </div>
        </Card>
      </div>
    );
  }

  const result = query.data;
  return (
    <div className={styles.page}>
      <AiCaseFlowHeader title="AI-задача учтена" lead="Оценка и игровые эффекты получены от mock-backend по final API contract." backTo="/" />
      <div className={styles.stack}>
        <section className={styles.resultHero} role="status" aria-live="polite" aria-atomic="true" aria-label="Результат оценки AI-задачи">
          <div className={styles.resultScore}>
            <strong className={styles.score}>+{result.score}</strong>
            <span className={styles.level}>{result.complexity_level}</span>
          </div>
          <p className={styles.lead}>{result.normalized_description}</p>
          <span className={styles.caption} aria-label="Визуальная реакция Любознайки">Реакция питомца на результат</span>
        </section>

        <div className={styles.resultGrid}>
          <div className={styles.metric}><strong>+{result.evolution_xp_awarded} XP</strong><span>Evolution XP</span></div>
          <div className={styles.metric}><strong>{result.goal_contributions.length ? 'Обновлён' : 'Нет вклада'}</strong><span>Monthly Goals</span></div>
        </div>

        <Card title="Вклад в цели" tone="secondary">
          <div className={styles.details}>
            {result.goal_contributions.length ? result.goal_contributions.map((goal) => (
              <div className={styles.toolRow} key={goal.goal_id}>
                <div><strong>Monthly Goal</strong><p className={styles.note}>Вклад: +{goal.progress_delta}</p></div>
                <span className={styles.caption}>{goal.completed ? 'Выполнена' : 'Прогресс обновлён'}</span>
              </div>
            )) : <p className={styles.note}>Эта задача не изменила текущие Monthly Goals.</p>}
          </div>
        </Card>

        <div className={styles.actions}>
          <Button variant="secondary" onClick={() => navigate(`/ai-cases/${taskId}`)}>Подробнее</Button>
          <Button onClick={() => navigate('/')}>На главную</Button>
        </div>
      </div>
    </div>
  );
}
