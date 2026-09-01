import type { ScreenRouteContract } from '../routes/contracts';
import styles from './PublicSkeletonScreen.module.css';

export function PublicSkeletonScreen({ contract }: { contract: ScreenRouteContract }) {
  return (
    <main className={styles.page}>
      <section className={styles.panel} aria-labelledby={`${contract.screenId}-title`}>
        <p>PROTOTYPE STAGE 3 · PUBLIC ROUTE</p>
        <h1 id={`${contract.screenId}-title`}>{contract.screenName}</h1>
        <span>{contract.path}</span>
        <div className={styles.placeholder} aria-hidden="true"><i /><i /><i /></div>
        <small>Форма и Personnel mock flow будут реализованы на соответствующем этапе. Сейчас маршрут и public shell уже активны.</small>
      </section>
    </main>
  );
}
