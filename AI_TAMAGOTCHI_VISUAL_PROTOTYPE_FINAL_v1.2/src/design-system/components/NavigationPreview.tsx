import styles from './NavigationPreview.module.css';

const items = ['Главная', 'История', 'Рейтинг', 'Профиль'] as const;

export function NavigationPreview({ active = 'Главная' }: { active?: (typeof items)[number] }) {
  return (
    <nav className={styles.nav} aria-label="Демонстрация нижней навигации">
      {items.map((item) => (
        <button key={item} type="button" className={`${styles.item} ${item === active ? styles.active : ''}`} aria-current={item === active ? 'page' : undefined}>
          <span className={styles.icon} aria-hidden="true" />
          <span>{item}</span>
        </button>
      ))}
    </nav>
  );
}
