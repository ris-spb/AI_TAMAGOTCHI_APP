import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { productionAssets } from '../../assets/productionAssets';
import { useDemoControlStore } from '../../demo-controls/store';
import { MOBILE_PRIMARY_NAV } from '../../routes/routeCatalog';
import styles from './MobileBottomNavigation.module.css';

const iconMap = {
  SCR_HOME: { active: productionAssets.icon.navHomeActive, inactive: productionAssets.icon.navHomeInactive },
  SCR_HISTORY_TASKS: { active: productionAssets.icon.navHistoryActive, inactive: productionAssets.icon.navHistoryInactive },
  SCR_RATING_EMPLOYEES: { active: productionAssets.icon.navRatingActive, inactive: productionAssets.icon.navRatingInactive },
  SCR_PROFILE_SELF: { active: productionAssets.icon.navProfileActive, inactive: productionAssets.icon.navProfileInactive },
} as const;

function NavigationIcon({ screenId, active }: { screenId: keyof typeof iconMap; active: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className={styles.iconSlot} aria-hidden="true" />;
  return <img className={styles.icon} src={active ? iconMap[screenId].active : iconMap[screenId].inactive} alt="" onError={() => setFailed(true)} />;
}

export function MobileBottomNavigation() {
  const viewportPreset = useDemoControlStore((state) => state.viewportPreset);
  const forceMobile = import.meta.env.DEV && (viewportPreset === '390x844' || viewportPreset === '430-mobile');
  return (
    <nav className={`${styles.nav} ${forceMobile ? styles.forceMobile : ''}`} aria-label="Основная навигация">
      {MOBILE_PRIMARY_NAV.map((item) => (
        <NavLink
          key={item.screenId}
          to={item.to}
          className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
          end={item.to === '/'}
        >
          {({ isActive }) => (
            <>
              <NavigationIcon screenId={item.screenId as keyof typeof iconMap} active={isActive} />
              <span>{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
