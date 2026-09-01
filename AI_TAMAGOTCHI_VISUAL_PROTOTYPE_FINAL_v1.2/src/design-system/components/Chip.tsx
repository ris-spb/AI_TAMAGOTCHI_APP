import type { ButtonHTMLAttributes } from 'react';
import styles from './Chip.module.css';

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean };
export function Chip({ selected = false, children, ...props }: ChipProps) {
  return <button {...props} type={props.type ?? 'button'} aria-pressed={selected} className={`${styles.chip} ${selected ? styles.selected : ''}`}>{children}</button>;
}
