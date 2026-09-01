import { useEffect, useState } from 'react';
import styles from './ApprovedAssetImage.module.css';

type ApprovedAssetImageProps = {
  readonly src: string;
  readonly alt: string;
  readonly fit?: 'cover' | 'contain';
  readonly className?: string;
  readonly missingLabel?: string;
};

export function ApprovedAssetImage({ src, alt, fit = 'cover', className = '', missingLabel = 'Approved visual asset недоступен в текущей execution-копии.' }: ApprovedAssetImageProps) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);

  if (failed) {
    return <div className={`${styles.missing} ${className}`} role="img" aria-label={`${alt}. ${missingLabel}`}>{import.meta.env.DEV ? missingLabel : 'Визуальная сцена временно недоступна'}</div>;
  }

  return (
    <div className={`${styles.frame} ${className}`}>
      <img className={`${styles.image} ${fit === 'contain' ? styles.contain : ''}`} src={src} alt={alt} onError={() => setFailed(true)} />
    </div>
  );
}
