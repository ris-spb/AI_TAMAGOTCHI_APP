import type { ReactNode } from 'react';
import { Button } from './Button';
import styles from './Modal.module.css';

export function ModalPreview({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={styles.stage} aria-label="Демонстрация modal component">
      <div className={styles.overlay} aria-hidden="true" />
      <section className={styles.modal} role="dialog" aria-modal="false" aria-labelledby="demo-modal-title">
        <h3 id="demo-modal-title">{title}</h3>
        <div className={styles.body}>{children}</div>
        <div className={styles.actions}>
          <Button variant="tertiary">Отмена</Button>
          <Button>Подтвердить</Button>
        </div>
      </section>
    </div>
  );
}
