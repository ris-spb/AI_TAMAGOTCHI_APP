import { Component, type ErrorInfo, type ReactNode } from 'react';

import styles from './FatalBootstrapBoundary.module.css';

type Props = { children: ReactNode };
type State = { failed: boolean };

export class FatalBootstrapBoundary extends Component<Props, State> {
  override state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('Prototype bootstrap failure', error, info);
    }
  }

  override render() {
    if (this.state.failed) {
      return (
        <main className={styles.page} role="alert">
          <section className={styles.card}>
            <p className={styles.kicker}>AI-Тамагочи</p>
            <h1>Приложение не удалось запустить</h1>
            <p>Это техническая ошибка интерфейса. Перезагрузите страницу.</p>
            <button type="button" onClick={() => window.location.reload()}>Перезагрузить</button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
