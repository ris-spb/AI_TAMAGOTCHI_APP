import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';
import styles from './SelectionControls.module.css';

type ChoiceProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: ReactNode;
};

function Choice({ type, label, ...props }: ChoiceProps & { type: 'checkbox' | 'radio' }) {
  return (
    <label className={styles.choice}>
      <input {...props} type={type} className={styles.nativeChoice} />
      <span>{label}</span>
    </label>
  );
}

export function Checkbox(props: ChoiceProps) { return <Choice {...props} type="checkbox" />; }
export function Radio(props: ChoiceProps) { return <Choice {...props} type="radio" />; }

export function Toggle({ label, ...props }: ChoiceProps) {
  return (
    <label className={styles.choice}>
      <input {...props} type="checkbox" role="switch" className={styles.nativeChoice} />
      <span>{label}</span>
    </label>
  );
}

export function SelectField({ label, children, id, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: ReactNode }) {
  const resolvedId = id ?? `select-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <label className={styles.selectField} htmlFor={resolvedId}>
      <span className={styles.selectLabel}>{label}</span>
      <select {...props} id={resolvedId} className={styles.select}>{children}</select>
    </label>
  );
}
