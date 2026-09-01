import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import styles from './Field.module.css';

type Common = { label: string; hint?: string; error?: string };

type TextFieldProps = Common & InputHTMLAttributes<HTMLInputElement>;
type TextAreaProps = Common & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextField({ label, hint, error, id, ...props }: TextFieldProps) {
  const resolvedId = id ?? `field-${label.replace(/\s+/g, '-').toLowerCase()}`;
  const describedBy = error ? `${resolvedId}-error` : hint ? `${resolvedId}-hint` : undefined;
  return (
    <label className={styles.field} htmlFor={resolvedId}>
      <span className={styles.label}>{label}</span>
      <input {...props} id={resolvedId} className={`${styles.control} ${error ? styles.invalid : ''}`} aria-invalid={Boolean(error)} aria-describedby={describedBy} />
      {error ? <span id={`${resolvedId}-error`} className={styles.error}>{error}</span> : hint ? <span id={`${resolvedId}-hint`} className={styles.hint}>{hint}</span> : null}
    </label>
  );
}

export function TextArea({ label, hint, error, id, ...props }: TextAreaProps) {
  const resolvedId = id ?? `field-${label.replace(/\s+/g, '-').toLowerCase()}`;
  const describedBy = error ? `${resolvedId}-error` : hint ? `${resolvedId}-hint` : undefined;
  return (
    <label className={styles.field} htmlFor={resolvedId}>
      <span className={styles.label}>{label}</span>
      <textarea {...props} id={resolvedId} className={`${styles.control} ${styles.textarea} ${error ? styles.invalid : ''}`} aria-invalid={Boolean(error)} aria-describedby={describedBy} />
      {error ? <span id={`${resolvedId}-error`} className={styles.error}>{error}</span> : hint ? <span id={`${resolvedId}-hint`} className={styles.hint}>{hint}</span> : null}
    </label>
  );
}
