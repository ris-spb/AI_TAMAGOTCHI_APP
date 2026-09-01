import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { productionAssets } from '../../assets/productionAssets';
import { useDemoControlStore } from '../../demo-controls/store';
import { Button } from '../../design-system';
import { fetchHome, PrototypeApiError } from '../../mock-api/client';
import type { MascotState } from '../../mock-api/contracts';
import { HOME_PRIMARY_CTA } from '../../routes/routeCatalog';
import { SceneHostBoundary } from './SceneHostBoundary';
import styles from './HomeScreen.module.css';

const healthLabels: Record<MascotState, string> = {
  happy: 'Бодрый',
  normal: 'Нормальный',
  bored: 'Скучает',
  tired: 'Уставший',
  very_weak: 'Очень слабый',
  coma: 'Кома',
};


function AssetIcon({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  return failed
    ? <span className={styles.iconFallback} aria-hidden="true" />
    : <img className={styles.assetIcon} src={src} alt={alt} onError={() => setFailed(true)} />;
}

function HomeHud({ streak, todayCount, unreadCount }: { streak: number; todayCount: number; unreadCount: number }) {
  return (
    <div className={styles.hud} aria-label="Краткий статус Home">
      <span className={styles.hudItem} aria-label={`Streak: ${streak}`}>
        <AssetIcon src={productionAssets.icon.streak} alt="" />
        <span>Серия <strong>{streak}</strong></span>
      </span>
      <div className={styles.hudRight}>
        <span className={styles.hudItem} aria-label={`AI-кейсов сегодня: ${todayCount}`}>
          <span>Сегодня <strong>{todayCount}</strong></span>
        </span>
        <Link className={styles.notificationButton} to="/notifications" aria-label={unreadCount > 0 ? `Уведомления: непрочитанных ${unreadCount}` : 'Уведомления'}>
          <AssetIcon src={unreadCount > 0 ? productionAssets.icon.notificationUnread : productionAssets.icon.notificationDefault} alt="" />
          {unreadCount > 0 ? <span className={styles.badge} aria-hidden="true">{Math.min(unreadCount, 9)}</span> : null}
        </Link>
      </div>
    </div>
  );
}

function MonthlyGoalsCompact({ goals }: { goals: readonly { goal_id: string; display_text: string; current_value: number; target_value: number; completed: boolean }[] }) {
  const completed = goals.filter((goal) => goal.completed).length;
  return (
    <section className={styles.goals} aria-labelledby="home-goals-title">
      <Link className={styles.goalsSurface} to="/goals" aria-label="Открыть цели месяца">
        <span className={styles.goalsHead}>
          <h2 className={styles.goalsTitle} id="home-goals-title">Цели месяца</h2>
          <strong className={styles.goalsCount}>{completed} / {goals.length || 3}</strong>
        </span>
        {goals.length === 0 ? (
          <span className={styles.emptyGoals}>Активных целей пока нет.</span>
        ) : (
          <span className={styles.goalSegments} aria-label={`Выполнено целей: ${completed} из ${goals.length}`}>
            {goals.map((goal) => {
              const visualPercent = goal.target_value > 0 ? Math.min(100, (goal.current_value / goal.target_value) * 100) : 0;
              return (
                <span className={styles.segmentTrack} key={goal.goal_id} title={goal.display_text}>
                  <span className={`${styles.segmentFill} ${goal.completed ? styles.completedFill : ''}`} style={{ width: `${visualPercent}%` }} />
                </span>
              );
            })}
          </span>
        )}
      </Link>
    </section>
  );
}

function HealthDetailDialog({ state, hp, onClose }: { state: MascotState; hp: number; onClose: () => void }) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter((node) => !node.hasAttribute('disabled'));
      if (!focusable.length) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <div className={styles.healthDialogBackdrop} onMouseDown={onClose}>
      <section ref={dialogRef} className={styles.healthDialog} role="dialog" aria-modal="true" aria-labelledby="health-detail-title" aria-describedby="health-detail-note" tabIndex={-1} onMouseDown={(event) => event.stopPropagation()}>
        <div className={styles.dialogHead}>
          <div>
            <span className={styles.contextLabel}>Состояние Любознайки</span>
            <h2 id="health-detail-title">{healthLabels[state]}</h2>
          </div>
          <button ref={closeRef} className={styles.dialogClose} type="button" onClick={onClose} aria-label="Закрыть состояние питомца">×</button>
        </div>
        <div className={styles.hpRow}>
          <span className={styles.hpLabel}>HP</span>
          <span className={styles.hpValue}>{hp} / 100</span>
        </div>
        <div className={styles.hpTrack} role="progressbar" aria-label="HP Любознайки" aria-valuemin={0} aria-valuemax={100} aria-valuenow={hp}>
          <div className={styles.hpFill} style={{ width: `${hp}%` }} />
        </div>
        <p className={styles.dialogNote} id="health-detail-note">Точное значение показывается только по запросу; на Home постоянной цифровой HP-полосы нет.</p>
      </section>
    </div>
  );
}

function HomeLoading() {
  const mascotState = useDemoControlStore((state) => state.mascotState);
  const threeMode = useDemoControlStore((state) => state.threeMode);
  const navigate = useNavigate();

  return (
    <div className={styles.page} aria-busy="true">
      <div className={styles.homeFrame}>
        <div className={`${styles.sceneWrap} ${styles.loadingScene}`}>
          <SceneHostBoundary healthState={mascotState} threeMode={threeMode} loading />
        </div>
        <div className={`${styles.content} ${styles.loadingContent}`}>
          <div className={styles.context} role="status" aria-live="polite">
            <span className={styles.contextLabel}>Home</span>
            <span className={styles.contextValue}>Загрузка…</span>
          </div>
          <div className={styles.emptyGoals}>Загружаем цели и статус. Основные действия остаются доступны.</div>
          <Button className={styles.cta} onClick={() => navigate(HOME_PRIMARY_CTA.to)}>{HOME_PRIMARY_CTA.label}</Button>
        </div>
      </div>
    </div>
  );
}

function HomeApiFailure({ error, retry }: { error: unknown; retry: () => void }) {
  const navigate = useNavigate();
  const forbidden = error instanceof PrototypeApiError && error.status === 403;

  return (
    <section className={styles.statusSurface} role="alert">
      <span className={styles.contextLabel}>{forbidden ? '403 · Доступ ограничен' : 'Home API'}</span>
      <h1>{forbidden ? 'Главная недоступна для текущего mock scope' : 'Не удалось загрузить главную'}</h1>
      <p>{forbidden ? 'Это контролируемое forbidden-состояние прототипа.' : 'Проверьте подключение и повторите попытку. 3D/визуальный слой не является причиной route-fatal ошибки.'}</p>
      {!forbidden ? <Button variant="secondary" onClick={retry}>Повторить</Button> : null}
      {!forbidden ? <Button onClick={() => navigate(HOME_PRIMARY_CTA.to)}>{HOME_PRIMARY_CTA.label}</Button> : null}
    </section>
  );
}

export function HomeScreen() {
  const dataScenario = useDemoControlStore((state) => state.dataScenario);
  const mascotState = useDemoControlStore((state) => state.mascotState);
  const streak = useDemoControlStore((state) => state.streak);
  const goalProgress = useDemoControlStore((state) => state.goalProgress);
  const threeMode = useDemoControlStore((state) => state.threeMode);
  const [healthOpen, setHealthOpen] = useState(false);
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ['home', dataScenario, mascotState, streak, goalProgress.join(',')],
    enabled: dataScenario !== 'loading',
    queryFn: ({ signal }) => fetchHome({
      scenario: dataScenario === 'loading' ? 'success' : dataScenario,
      healthState: mascotState,
      streak,
      goalProgress,
      signal,
    }),
  });

  if (dataScenario === 'loading') return <HomeLoading />;
  if (query.isPending) return <HomeLoading />;
  if (query.isError) return <HomeApiFailure error={query.error} retry={() => void query.refetch()} />;

  const home = query.data;
  const healthLabel = healthLabels[home.pet.health_state];

  return (
    <div className={styles.page}>
      <div className={styles.homeFrame}>
        <div className={styles.sceneWrap}>
          <SceneHostBoundary healthState={home.pet.health_state} threeMode={threeMode} />
          <HomeHud streak={home.pet.current_streak} todayCount={home.today_task_count} unreadCount={home.unread_notification_count} />
        </div>

        <div className={styles.content}>
          <button className={styles.healthButton} type="button" onClick={() => setHealthOpen(true)} aria-haspopup="dialog">
            <strong>Любознайка: {healthLabel}</strong>
            {home.ambient_message ? <span>{home.ambient_message}</span> : null}
          </button>
          <MonthlyGoalsCompact goals={home.goals} />
          <Button className={styles.cta} onClick={() => navigate(HOME_PRIMARY_CTA.to)}>{HOME_PRIMARY_CTA.label}</Button>
        </div>
      </div>
      {healthOpen ? <HealthDetailDialog state={home.pet.health_state} hp={home.pet.hp} onClose={() => setHealthOpen(false)} /> : null}
    </div>
  );
}
