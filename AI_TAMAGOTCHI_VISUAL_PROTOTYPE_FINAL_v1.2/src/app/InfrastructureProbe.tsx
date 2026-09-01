import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useDemoControlStore } from '../demo-controls/store';
import { demoRoles, type DemoRole } from '../mock-api/contracts';
import { fetchMockHealth } from '../mock-api/client';
import styles from './InfrastructureProbe.module.css';

type RoleProbeForm = {
  role: DemoRole;
};

export function InfrastructureProbe() {
  const role = useDemoControlStore((state) => state.role);
  const setRole = useDemoControlStore((state) => state.setRole);
  const { register, watch } = useForm<RoleProbeForm>({ defaultValues: { role } });
  const watchedRole = watch('role');

  const healthQuery = useQuery({
    queryKey: ['prototype-mock-health'],
    queryFn: ({ signal }) => fetchMockHealth(signal),
  });

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="stage-one-title">
        <p className={styles.meta}>DEMO-ONLY · инфраструктурный экран, не final UI</p>
        <h1 id="stage-one-title">AI-Тамагочи · Prototype Stage 1</h1>
        <p>
          React/router/query/state/forms/mock foundations подключены. Визуальная система и продуктовые
          экраны начинаются только на следующих этапах.
        </p>

        <form className={styles.controls} aria-label="Проверка client-only demo state">
          <label className={styles.label}>
            Demo role
            <select
              className={styles.select}
              {...register('role', {
                onChange: (event) => setRole(event.target.value as DemoRole),
              })}
            >
              {demoRoles.map((demoRole) => (
                <option key={demoRole} value={demoRole}>
                  {demoRole}
                </option>
              ))}
            </select>
          </label>
        </form>

        <div className={styles.status} role="status" aria-live="polite">
          <strong>Mock API:</strong>{' '}
          {healthQuery.isPending
            ? 'loading'
            : healthQuery.isError
              ? 'error'
              : `${healthQuery.data.status} / deterministic=${String(healthQuery.data.deterministic)}`}
          <br />
          <strong>Zustand role:</strong> {role}
          <br />
          <strong>RHF role:</strong> {watchedRole}
        </div>
      </section>
    </main>
  );
}
