import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../design-system/components/Button';
import { Card } from '../../design-system/components/Card';
import { useDemoControlStore } from '../../demo-controls/store';
import { PrototypeApiError, transcribeTaskAudio } from '../../mock-api/client';
import { AiCaseFlowHeader } from './AiCaseFlowHeader';
import styles from './AiCaseFlow.module.css';
import { useAiCaseFlowStore } from './flowStore';

type RecorderState = 'ready' | 'recording' | 'transcribing' | 'error' | 'microphone_denied';

function formatTimer(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

export function VoiceAiCaseScreen() {
  const navigate = useNavigate();
  const flow = useAiCaseFlowStore();
  const scenario = useDemoControlStore((state) => state.aiCaseScenario);
  const [state, setState] = useState<RecorderState>('ready');
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (state !== 'recording') return;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1_000);
    return () => window.clearInterval(timer);
  }, [state]);

  const mutation = useMutation({
    mutationFn: transcribeTaskAudio,
    onSuccess: (result) => {
      flow.setTranscript(result.transcript);
      flow.setDraft(result.transcript, []);
      flow.setInputChannel('voice');
      navigate('/ai-cases/new/transcript');
    },
    onError: () => setState('error'),
  });

  function startRecording() {
    if (scenario === 'microphone_denied') {
      setState('microphone_denied');
      return;
    }
    setSeconds(0);
    setState('recording');
  }

  async function stopRecording() {
    setState('transcribing');
    // DEMO_ONLY: transient in-memory bytes stand in for microphone audio. They are never persisted.
    const ephemeralAudio = new Blob(['DEMO_NONPRODUCTION_EPHEMERAL_AUDIO'], { type: 'audio/webm' });
    try {
      await mutation.mutateAsync({ audio: ephemeralAudio, scenario, idempotencyKey: flow.sttIdempotencyKey });
    } catch {
      // mutation.onError owns the accessible error state.
    }
  }

  const message = mutation.error instanceof PrototypeApiError
    ? mutation.error.payload.message
    : 'Не удалось распознать запись. Можно повторить попытку или перейти к текстовому вводу.';

  return (
    <div className={styles.page}>
      <AiCaseFlowHeader title="Голосовой ввод" lead="Запись используется только для mock STT. После получения текста исходное аудио не сохраняется." backTo="/ai-cases/new" />
      <div className={styles.stack}>
        <section className={styles.voiceStage} aria-live="polite">
          <div className={`${styles.voiceIndicator} ${state === 'recording' ? styles.recording : ''}`} aria-hidden="true">REC</div>
          {state === 'recording' ? <strong className={styles.timer}>{formatTimer(seconds)}</strong> : null}
          {state === 'ready' ? <p className={styles.lead}>Готово к записи</p> : null}
          {state === 'transcribing' ? <><strong>Распознаём запись…</strong><p className={styles.note}>Аудио остаётся только в памяти текущего запроса.</p></> : null}
          {state === 'microphone_denied' ? <><strong>Нет доступа к микрофону</strong><p className={styles.note}>Разрешите доступ или используйте текстовый ввод.</p></> : null}
          {state === 'error' ? <><strong>Не удалось распознать запись</strong><p className={styles.note} role="alert">{message}</p></> : null}
        </section>

        <div className={styles.actions}>
          {state === 'ready' || state === 'microphone_denied' || state === 'error' ? <Button type="button" onClick={startRecording}>Начать запись</Button> : null}
          {state === 'recording' ? <Button type="button" onClick={() => void stopRecording()}>Завершить запись</Button> : null}
          <Button variant="secondary" type="button" disabled={state === 'transcribing'} onClick={() => navigate('/ai-cases/new')}>Ввести текстом</Button>
        </div>
        {state === 'error' ? <Card tone="secondary"><p className={styles.note}>Повторная запись создаёт новый transient STT attempt, но не сохраняет исходный аудиофайл.</p></Card> : null}
      </div>
    </div>
  );
}
