import { Link } from 'react-router-dom';

import type { ScreenRouteContract } from '../routes/contracts';
import { HOME_PRIMARY_CTA } from '../routes/routeCatalog';
import styles from './SkeletonScreen.module.css';

const routeHints: Partial<Record<string, readonly { label: string; to: string }[]>> = {
  SCR_HOME: [HOME_PRIMARY_CTA],
  SCR_HISTORY_TASKS: [{ label: 'События', to: '/history/events' }],
  SCR_RATING_EMPLOYEES: [
    { label: 'Дирекции', to: '/rating/directorates' },
    { label: 'Аналитика', to: '/rating/analytics' },
  ],
  SCR_PROFILE_SELF: [
    { label: 'Цели месяца', to: '/goals' },
    { label: 'Приватность', to: '/profile/privacy' },
    { label: 'Отпуск', to: '/profile/vacation' },
    { label: 'Достижения', to: '/profile/achievements' },
    { label: 'Как считается Score', to: '/profile/scoring' },
  ],
  SCR_ADMIN_PANEL: [
    { label: 'Пользователи и роли', to: '/admin/users' },
    { label: 'Оргструктура', to: '/admin/org' },
    { label: 'Календарь', to: '/admin/calendar' },
    { label: 'Taxonomy', to: '/admin/taxonomy' },
    { label: 'AI Tools', to: '/admin/tools' },
    { label: 'Audit / Technical Trace', to: '/admin/audit' },
  ],
  SCR_DIRECTOR_DASH: [{ label: 'Экспорт', to: '/exports' }],
  SCR_EXEC_DASH: [{ label: 'Экспорт', to: '/exports' }],
};

export function SkeletonScreen({ contract }: { contract: ScreenRouteContract }) {
  const hints = routeHints[contract.screenId] ?? [];

  return (
    <section className={styles.screen} aria-labelledby={`${contract.screenId}-title`}>
      <div className={styles.heading}>
        <p>PROTOTYPE STAGE 3 · ROUTE SKELETON</p>
        <h1 id={`${contract.screenId}-title`}>{contract.screenName}</h1>
        <span>{contract.path} · {contract.platform}</span>
      </div>

      <div className={styles.placeholder}>
        <div className={styles.lineWide} />
        <div className={styles.lineMid} />
        <div className={styles.panelGrid}>
          <div /><div /><div />
        </div>
        <p>Содержательная реализация этого экрана относится к следующим этапам. Stage 3 фиксирует shell, route, role gate и responsive boundary.</p>
      </div>

      {hints.length > 0 ? (
        <nav className={styles.routeLinks} aria-label="Связанные маршруты">
          {hints.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}
        </nav>
      ) : null}
    </section>
  );
}
