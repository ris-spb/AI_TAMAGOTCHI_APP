import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import styles from './Layout.module.css';

type CommonProps = HTMLAttributes<HTMLDivElement> & { children: ReactNode };

export function PageContainer({ children, className = '', ...props }: CommonProps) {
  return <div {...props} className={`${styles.pageContainer} ${className}`}>{children}</div>;
}

export function Stack({ children, className = '', ...props }: CommonProps) {
  return <div {...props} className={`${styles.stack} ${className}`}>{children}</div>;
}

export function ResponsiveGrid({ children, className = '', minColumnPx = 260, ...props }: CommonProps & { minColumnPx?: number }) {
  const style = { '--prototype-grid-min': `${minColumnPx}px`, ...props.style } as CSSProperties;
  return <div {...props} style={style} className={`${styles.grid} ${className}`}>{children}</div>;
}
