import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

type CardProps = HTMLAttributes<HTMLElement> & {
  title?: string;
  children: ReactNode;
  tone?: 'default' | 'secondary' | 'success' | 'error';
};

export function Card({ title, children, tone = 'default', className = '', ...props }: CardProps) {
  return (
    <section {...props} className={`${styles.card} ${styles[tone]} ${className}`}>
      {title ? <h3 className={styles.title}>{title}</h3> : null}
      <div className={styles.body}>{children}</div>
    </section>
  );
}
