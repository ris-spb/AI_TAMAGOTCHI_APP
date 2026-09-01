import styles from './AmbientLayer.module.css';

export function AmbientLayer({ active }: { readonly active: boolean }) {
  if (!active) return null;
  return (
    <div className={styles.layer} aria-hidden="true" data-testid="ambient-layer">
      <span className={styles.daylight} />
      <span className={styles.floorLight} />
    </div>
  );
}
