import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { useDemoControlStore, type ViewportPreset } from '../../demo-controls/store';
import type { ScreenRouteContract } from '../../routes/contracts';
import { demoRoleToAppRole } from '../roleAdapter';
import { DesktopNavigation } from './DesktopNavigation';
import { MobileBottomNavigation } from './MobileBottomNavigation';
import { ScreenStateBoundary } from './ScreenStateBoundary';
import styles from './AppShell.module.css';

function shouldUseEmployeeBottomNav(contract: ScreenRouteContract, role: ReturnType<typeof demoRoleToAppRole>) {
  if (role !== 'employee') return false;
  return contract.routeClass === 'PRIMARY_TAB' || contract.routeClass === 'PRIMARY_OR_SELF';
}

function viewportPresetClass(preset: ViewportPreset) {
  if (!import.meta.env.DEV) return '';
  if (preset === '390x844') return styles.demo390;
  if (preset === '430-mobile') return styles.demo430;
  if (preset === 'desktop') return styles.demoDesktop;
  return '';
}

export function AppShell({ contract, children }: { contract: ScreenRouteContract; children: ReactNode }) {
  const demoRole = useDemoControlStore((state) => state.role);
  const viewportPreset = useDemoControlStore((state) => state.viewportPreset);
  const reducedMotion = useDemoControlStore((state) => state.reducedMotion);
  const role = demoRoleToAppRole(demoRole);
  const location = useLocation();
  const showEmployeeBottomNav = shouldUseEmployeeBottomNav(contract, role);
  const isHome = contract.screenId === 'SCR_HOME';
  const ownsScreenHeader = [
    'SCR_ONBOARDING', 'SCR_GOAL_SETUP',
    'SCR_CASE_ADD', 'SCR_CASE_VOICE', 'SCR_CASE_TRANSCRIPT', 'SCR_CASE_PROCESSING', 'SCR_CASE_CLARIFY', 'SCR_CASE_RESULT',
    'SCR_CASE_DETAIL', 'SCR_CASE_EDIT', 'SCR_HISTORY_TASKS', 'SCR_HISTORY_EVENTS', 'SCR_GOALS', 'SCR_RATING_EMPLOYEES', 'SCR_RATING_DIRECTORATES',
    'SCR_COMPANY_ANALYTICS', 'SCR_DIRECTORATE_CARD', 'SCR_PUBLIC_PROFILE', 'SCR_PROFILE_SELF', 'SCR_PRIVACY', 'SCR_VACATION',
    'SCR_ACHIEVEMENTS', 'SCR_SCORING_INFO', 'SCR_NOTIFICATIONS',
    'SCR_DIRECTOR_DASH', 'SCR_EXEC_DASH', 'SCR_ADMIN_PANEL', 'SCR_ADMIN_USERS', 'SCR_ADMIN_ORG', 'SCR_ADMIN_CALENDAR',
    'SCR_ADMIN_TAXONOMY', 'SCR_ADMIN_TOOLS', 'SCR_ADMIN_AUDIT', 'SCR_ADMIN_EXPORT',
  ].includes(contract.screenId);
  const demoMobileViewport = import.meta.env.DEV && (viewportPreset === '390x844' || viewportPreset === '430-mobile');
  const showDesktopNavigation = contract.shell !== 'public' && contract.routeClass !== 'AUTH_GATE' && contract.routeClass !== 'DATA_GATE' && !demoMobileViewport;

  if (contract.shell === 'public') {
    return <div className={styles.publicShell}><a className={styles.skipLink} href="#main-content">Перейти к основному содержимому</a>{children}</div>;
  }

  return (
    <div className={styles.shell} data-role={role} data-screen-id={contract.screenId} data-demo-reduced-motion={reducedMotion || undefined}>
      <a className={styles.skipLink} href="#main-content">Перейти к основному содержимому</a>
      {showDesktopNavigation ? <DesktopNavigation role={role} /> : null}
      <div className={`${styles.viewport} ${viewportPresetClass(viewportPreset)}`} data-demo-viewport={import.meta.env.DEV ? viewportPreset : undefined}>
        {!isHome && !ownsScreenHeader ? (
          <header className={styles.topbar}>
            <div>
              <span className={styles.screenId}>{contract.screenId}</span>
              <strong className={styles.screenName}>{contract.screenName}</strong>
            </div>
            {import.meta.env.DEV ? <span className={styles.roleBadge}>{demoRole}</span> : null}
          </header>
        ) : null}
        <main className={`${styles.main} ${isHome ? styles.homeMain : ''} ${showEmployeeBottomNav ? styles.withBottomNav : ''}`} id="main-content" key={location.pathname}>
          <ScreenStateBoundary bypass={isHome || ownsScreenHeader}>{children}</ScreenStateBoundary>
        </main>
        {showEmployeeBottomNav ? <MobileBottomNavigation /> : null}
      </div>
    </div>
  );
}
