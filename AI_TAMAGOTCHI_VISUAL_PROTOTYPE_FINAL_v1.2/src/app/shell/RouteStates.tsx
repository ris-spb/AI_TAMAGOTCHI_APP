import { Link } from 'react-router-dom';

import { Button } from '../../design-system';
import styles from './RouteStates.module.css';

export function RouteLoadingState({ label = 'Загрузка экрана' }: { label?: string }) {
  return (
    <section className={styles.state} role="status" aria-live="polite" aria-busy="true">
      <div className={styles.skeletonLine} />
      <div className={`${styles.skeletonLine} ${styles.short}`} />
      <span className={styles.label}>{label}</span>
    </section>
  );
}

export function RouteErrorState() {
  return (
    <section className={styles.state} role="alert">
      <h1>Не удалось загрузить экран</h1>
      <p>Проверьте соединение и повторите попытку. В прототипе это контролируемое demo-состояние.</p>
      <Button onClick={() => window.location.reload()}>Повторить</Button>
    </section>
  );
}

export function EmptyState() {
  return (
    <section className={styles.state} role="status">
      <h1>Данных пока нет</h1>
      <p>Экран поддерживает empty-state. Содержательная реализация появится на соответствующем этапе прототипа.</p>
    </section>
  );
}

export function ForbiddenState() {
  return (
    <section className={styles.state} role="alert">
      <p className={styles.eyebrow}>403 · Доступ ограничен</p>
      <h1>Этот раздел недоступен для текущей роли</h1>
      <p>Frontend guard скрывает privileged view; production backend обязан повторно проверять RBAC и object scope.</p>
      <Link to="/profile" className={styles.link}>Перейти в профиль</Link>
    </section>
  );
}

export function NotFoundState() {
  return (
    <section className={styles.state}>
      <p className={styles.eyebrow}>404</p>
      <h1>Экран не найден</h1>
      <Link to="/" className={styles.link}>На главную</Link>
    </section>
  );
}
