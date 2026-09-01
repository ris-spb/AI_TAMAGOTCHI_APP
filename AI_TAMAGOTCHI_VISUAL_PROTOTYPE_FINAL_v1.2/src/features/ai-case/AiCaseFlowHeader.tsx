import { useNavigate } from 'react-router-dom';

import styles from './AiCaseFlow.module.css';

export function AiCaseFlowHeader({ title, lead, backTo = '/' }: { title: string; lead?: string; backTo?: string }) {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <button className={styles.back} type="button" onClick={() => navigate(backTo)} aria-label="Назад">← Назад</button>
      <p className={styles.eyebrow}>AI-кейс · уже выполненная работа</p>
      <h1 className={styles.title}>{title}</h1>
      {lead ? <p className={styles.lead}>{lead}</p> : null}
    </header>
  );
}
