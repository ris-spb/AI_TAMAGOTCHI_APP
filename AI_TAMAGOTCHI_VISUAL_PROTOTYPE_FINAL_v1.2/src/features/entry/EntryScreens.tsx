import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDemoControlStore } from '../../demo-controls/store';
import { Button, Card, TextField } from '../../design-system';
import { RouteLoadingState } from '../../app/shell/RouteStates';
import { completeOnboarding, getGoalSetup, getOnboarding, submitGoalSetup, verifyPersonnel } from './api';
import { DEMO_PERSONNEL_NUMBER, DEMO_PHONE, ONBOARDING_CONTENT_VERSION } from './fixtures';
import styles from './EntryScreens.module.css';

const onboardingSteps = [
  {
    title: 'AI-Тамагочи помогает развивать практику работы с ИИ',
    body: 'Приложение систематизирует реальные рабочие AI-use cases, показывает личный прогресс и помогает формировать регулярную практику использования ИИ.',
  },
  {
    title: 'Фиксируйте уже выполненные AI-задачи',
    body: 'Опишите выполненный AI-assisted work case текстом или голосом. Это не список будущих дел: система учитывает только заявленную уже выполненную работу.',
  },
  {
    title: 'Complexity оценивается по единой шкале C1–C5',
    body: 'Система классифицирует сложность по наблюдаемым признакам workflow. Фиксированная шкала Score: C1 = 1, C2 = 5, C3 = 15, C4 = 40, C5 = 100.',
  },
  {
    title: 'Любознайка отражает регулярность практики',
    body: 'HP, AI Streak и Evolution XP показывают регулярность и долгосрочный прогресс. Питомец не заменяет рабочую аналитику и не блокирует основные действия.',
  },
  {
    title: 'Каждый месяц действуют три AI Goals',
    body: 'Система предлагает пять измеримых вариантов: сотрудник выбирает два, а третья цель назначается системой. Прогресс обновляется по зарегистрированным AI-кейсам.',
  },
] as const;

export function LoginScreen() {
  const scenario = useDemoControlStore((state) => state.dataScenario);
  const navigate = useNavigate();
  const [personnelNumber, setPersonnelNumber] = useState(DEMO_PERSONNEL_NUMBER);
  const [phone, setPhone] = useState(DEMO_PHONE);
  const [attempted, setAttempted] = useState(false);
  const personnelError = attempted && !personnelNumber.trim() ? 'Введите табельный номер.' : undefined;
  const phoneError = attempted && !phone.trim() ? 'Введите номер телефона.' : undefined;
  const mutation = useMutation({
    mutationFn: () => verifyPersonnel({ personnel_number: personnelNumber.trim(), phone: phone.trim() }, scenario),
    onSuccess: (data) => navigate(data.onboarding_required ? '/onboarding' : data.goal_setup_required ? '/goals/setup' : '/'),
  });

  return (
    <main className={styles.publicPage} id="main-content">
      <section className={styles.authCard} aria-labelledby="login-title">
        <p className={styles.eyebrow}>Первый вход</p>
        <h1 className={styles.title} id="login-title">Вход в AI-Тамагочи</h1>
        <p className={styles.lead}>Введите табельный номер и телефон. Самостоятельной регистрации аккаунта в MVP нет.</p>
        <TextField label="Табельный номер" autoComplete="username" required value={personnelNumber} error={personnelError} onChange={(event) => setPersonnelNumber(event.target.value)} />
        <TextField label="Номер телефона" inputMode="tel" autoComplete="tel" required value={phone} error={phoneError} onChange={(event) => setPhone(event.target.value)} />
        <div className={styles.demoBox}>
          <strong>DEMO-данные</strong><br />
          <code>{DEMO_PERSONNEL_NUMBER}</code> · <code>{DEMO_PHONE}</code>
        </div>
        <div className={styles.actions}>
          <Button loading={mutation.isPending || scenario === 'loading'} disabled={mutation.isPending || scenario === 'loading'} onClick={() => { setAttempted(true); if (personnelNumber.trim() && phone.trim()) mutation.mutate(); }}>Продолжить</Button>
        </div>
        {mutation.isError ? <p className={styles.error} role="alert">{mutation.error instanceof Error ? mutation.error.message : 'Не удалось выполнить проверку.'}</p> : null}
      </section>
    </main>
  );
}

export function OnboardingScreen() {
  const scenario = useDemoControlStore((state) => state.dataScenario);
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const query = useQuery({ queryKey: ['prototype-onboarding', scenario], enabled: scenario !== 'loading', queryFn: () => getOnboarding(scenario) });
  const mutation = useMutation({
    mutationFn: () => completeOnboarding({ content_version: query.data?.content_version ?? ONBOARDING_CONTENT_VERSION }, 'prototype-onboarding-complete-v1'),
    onSuccess: () => navigate('/goals/setup'),
  });

  if (scenario === 'loading' || query.isPending) return <RouteLoadingState label="Загрузка onboarding" />;
  if (query.isError) return <div className={styles.page}><Card tone="error"><p className={styles.error} role="alert">{query.error instanceof Error ? query.error.message : 'Не удалось загрузить onboarding.'}</p><Button variant="secondary" onClick={() => void query.refetch()}>Повторить</Button></Card></div>;

  const current = onboardingSteps[step]!;
  const last = step === onboardingSteps.length - 1;
  return (
    <div className={styles.page}>
      <div className={styles.stepMeta}><span>Onboarding</span><span>{step + 1} / {onboardingSteps.length}</span></div>
      <section className={styles.stepCard} aria-live="polite" aria-labelledby="onboarding-step-title">
        <p className={styles.eyebrow}>Шаг {step + 1}</p>
        <h2 id="onboarding-step-title">{current.title}</h2>
        <p>{current.body}</p>
      </section>
      <div className={styles.stepActions}>
        {step > 0 ? <Button variant="secondary" onClick={() => setStep((value) => Math.max(0, value - 1))}>Назад</Button> : null}
        {!last ? <Button onClick={() => setStep((value) => Math.min(onboardingSteps.length - 1, value + 1))}>Далее</Button> : <Button loading={mutation.isPending} disabled={mutation.isPending} onClick={() => mutation.mutate()}>Завершить onboarding</Button>}
      </div>
      {mutation.isError ? <p className={styles.error} role="alert">Не удалось завершить onboarding. Повторите действие с тем же idempotency key.</p> : null}
    </div>
  );
}

export function GoalSetupScreen() {
  const scenario = useDemoControlStore((state) => state.dataScenario);
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const query = useQuery({ queryKey: ['prototype-goal-setup', scenario], enabled: scenario !== 'loading', queryFn: () => getGoalSetup(scenario) });
  const canSubmit = selected.length === 2 && query.data?.status === 'ready';
  const mutation = useMutation({
    mutationFn: () => submitGoalSetup({ cycle_id: query.data!.cycle_id, selected_option_ids: [selected[0]!, selected[1]!] }, `prototype-goal-setup-${query.data!.cycle_id}`),
  });

  const selectedSet = useMemo(() => new Set(selected), [selected]);
  if (scenario === 'loading' || query.isPending) return <RouteLoadingState label="Загрузка вариантов Monthly Goals" />;
  if (query.isError) return <div className={styles.page}><Card tone="error"><p className={styles.error} role="alert">{query.error instanceof Error ? query.error.message : 'Не удалось загрузить цели.'}</p><Button variant="secondary" onClick={() => void query.refetch()}>Повторить</Button></Card></div>;

  if (query.data.status === 'pending') {
    return <div className={styles.page}><Card><p className={styles.eyebrow}>Monthly Goals</p><h1 className={styles.title}>Варианты целей готовятся</h1><p className={styles.lead} role="status">Система ещё не вернула пять вариантов. Ничего выбирать не нужно до состояния ready.</p><Button variant="secondary" onClick={() => void query.refetch()}>Обновить</Button></Card></div>;
  }

  if (query.data.status === 'submitted' && !mutation.isSuccess) {
    return <div className={styles.page}><Card><p className={styles.eyebrow}>Monthly Goals</p><h1 className={styles.title}>Цели уже настроены</h1><p className={styles.lead}>Текущий цикл уже находится в состоянии submitted.</p><Button onClick={() => navigate('/')}>Перейти на главную</Button></Card></div>;
  }

  if (mutation.isSuccess) {
    return (
      <div className={styles.page}>
        <p className={styles.eyebrow}>Monthly Goals · сентябрь 2026</p>
        <h1 className={styles.title}>Цели настроены</h1>
        <div className={styles.goalList}>
          {mutation.data.goals.map((goal) => <Card key={goal.goal_id} tone={goal.source === 'system_assigned' ? 'secondary' : 'default'}><strong>{goal.display_text}</strong><p className={`${styles.note} ${goal.source === 'system_assigned' ? styles.assigned : ''}`}>{goal.source === 'system_assigned' ? 'Системная цель' : 'Выбранная цель'} · target {goal.target_value}</p></Card>)}
        </div>
        <Button onClick={() => navigate('/')}>Перейти на главную</Button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <p className={styles.eyebrow}>Обязательная настройка месяца</p>
      <h1 className={styles.title}>Выберите 2 Monthly Goals</h1>
      <p className={styles.lead}>Показаны пять персонализированных измеримых вариантов. Третья цель будет назначена системой.</p>
      <div className={styles.selectionMeta} aria-live="polite"><span>Выбрано: {selected.length} из 2</span><span>Вариантов: {query.data.options.length}</span></div>
      <div className={styles.goalList}>
        {query.data.options.map((option) => {
          const checked = selectedSet.has(option.option_id);
          const disabled = !checked && selected.length >= 2;
          return (
            <label className={styles.goalOption} key={option.option_id}>
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={() => setSelected((current) => checked ? current.filter((id) => id !== option.option_id) : [...current, option.option_id].slice(0, 2))}
              />
              <span>{option.display_text}</span>
              <small>target {option.target_value}</small>
            </label>
          );
        })}
      </div>
      <Button loading={mutation.isPending} disabled={!canSubmit || mutation.isPending} onClick={() => mutation.mutate()}>Подтвердить 2 цели</Button>
      {mutation.isError ? <p className={styles.error} role="alert">Не удалось сохранить цели. Выбор сохранён на экране; повторите отправку.</p> : null}
    </div>
  );
}
