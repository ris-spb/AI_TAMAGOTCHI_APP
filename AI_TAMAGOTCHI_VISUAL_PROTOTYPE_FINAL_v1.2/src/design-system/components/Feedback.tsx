import styles from './Feedback.module.css';

export function Feedback({ kind, title, body }: { kind: 'success' | 'error' | 'loading'; title: string; body: string }) {
  return (
    <div className={`${styles.feedback} ${styles[kind]}`} role={kind === 'error' ? 'alert' : 'status'} aria-live="polite">
      <span className={styles.marker} aria-hidden="true" />
      <div><strong>{title}</strong><p>{body}</p></div>
    </div>
  );
}
