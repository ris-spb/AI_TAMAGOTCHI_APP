import { NavLink } from 'react-router-dom';

import type { AppRole } from '../../routes/contracts';
import { MOBILE_PRIMARY_NAV } from '../../routes/routeCatalog';
import styles from './DesktopNavigation.module.css';

type NavItem = { label: string; to: string; end?: boolean };

const managementItems: Record<Exclude<AppRole, 'employee'>, readonly NavItem[]> = {
  director: [
    { label: 'Director Dashboard', to: '/director', end: true },
    { label: 'Рейтинг', to: '/rating' },
    { label: 'Профиль', to: '/profile' },
    { label: 'Экспорт', to: '/exports' },
  ],
  executive: [
    { label: 'Executive Dashboard', to: '/executive', end: true },
    { label: 'Рейтинг', to: '/rating' },
    { label: 'Профиль', to: '/profile' },
    { label: 'Экспорт', to: '/exports' },
  ],
  admin: [
    { label: 'Admin Panel', to: '/admin', end: true },
    { label: 'Пользователи и роли', to: '/admin/users' },
    { label: 'Оргструктура', to: '/admin/org' },
    { label: 'Календарь', to: '/admin/calendar' },
    { label: 'Taxonomy', to: '/admin/taxonomy' },
    { label: 'AI Tools', to: '/admin/tools' },
    { label: 'Audit / Technical Trace', to: '/admin/audit' },
    { label: 'Экспорт', to: '/exports' },
    { label: 'Рейтинг', to: '/rating' },
    { label: 'Профиль', to: '/profile' },
  ],
};

export function DesktopNavigation({ role }: { role: AppRole }) {
  const items: readonly NavItem[] = role === 'employee'
    ? MOBILE_PRIMARY_NAV.map((item) => ({ label: item.label, to: item.to, end: item.to === '/' }))
    : managementItems[role];

  return (
    <aside className={styles.sidebar} aria-label="Навигация по приложению">
      <div className={styles.brand}>
        <div><strong>Любознайка</strong><span>AI-Тамагочи</span></div>
      </div>
      <nav className={styles.links}>
        {items.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
