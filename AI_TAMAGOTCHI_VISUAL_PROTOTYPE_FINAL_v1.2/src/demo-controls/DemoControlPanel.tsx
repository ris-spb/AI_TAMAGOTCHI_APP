import { useState } from 'react';

import { clarificationScenarioValues, complexityLevels } from '../features/ai-case/contracts';
import { dataScenarios, demoRoles, mascotStates } from '../mock-api/contracts';
import { aiCaseScenarios, threeModes, useDemoControlStore, viewportPresets } from './store';
import styles from './DemoControlPanel.module.css';

function presetLabel(value: (typeof viewportPresets)[number]) {
  switch (value) {
    case '390x844': return '390 × 844';
    case '430-mobile': return '430 mobile';
    case 'desktop': return 'Desktop';
    default: return 'Responsive';
  }
}

export function DemoControlPanel() {
  const [open, setOpen] = useState(false);
  const state = useDemoControlStore();

  if (!import.meta.env.DEV) return null;

  return (
    <>
      <button className={styles.trigger} type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="prototype-demo-controls">
        DEMO
      </button>
      {open ? (
        <aside className={styles.panel} id="prototype-demo-controls" aria-label="Demo Control Panel">
          <div className={styles.head}>
            <div>
              <h2 className={styles.title}>Demo Control Panel</h2>
              <p className={styles.note}>DEV-ONLY · не является частью final product</p>
            </div>
            <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Закрыть demo panel">×</button>
          </div>

          <label className={styles.group}>
            <span className={styles.label}>Роль</span>
            <select className={styles.select} value={state.role} onChange={(event) => state.setRole(event.target.value as typeof state.role)}>
              {demoRoles.map((role) => <option key={role}>{role}</option>)}
            </select>
          </label>

          <label className={styles.group}>
            <span className={styles.label}>Home data state</span>
            <select className={styles.select} value={state.dataScenario} onChange={(event) => state.setDataScenario(event.target.value as typeof state.dataScenario)}>
              {dataScenarios.map((scenario) => <option key={scenario}>{scenario}</option>)}
            </select>
          </label>

          <label className={styles.group}>
            <span className={styles.label}>HP / mascot state</span>
            <select className={styles.select} value={state.mascotState} onChange={(event) => state.setMascotState(event.target.value as typeof state.mascotState)}>
              {mascotStates.map((mascotState) => <option key={mascotState}>{mascotState}</option>)}
            </select>
          </label>

          <label className={styles.group}>
            <span className={styles.label}>Streak</span>
            <input className={styles.number} type="number" min="0" max="365" value={state.streak} onChange={(event) => state.setStreak(Number(event.target.value))} />
          </label>

          <div className={styles.group}>
            <span className={styles.label}>Monthly Goals progress</span>
            <div className={styles.inline}>
              {state.goalProgress.map((value, index) => (
                <input
                  key={index}
                  className={styles.number}
                  type="number"
                  min="0"
                  max={index === 0 ? 3 : index === 1 ? 2 : 1}
                  aria-label={`Прогресс цели ${index + 1}`}
                  value={value}
                  onChange={(event) => {
                    const next = [...state.goalProgress] as [number, number, number];
                    next[index] = Number(event.target.value);
                    state.setGoalProgress(next);
                  }}
                />
              ))}
            </div>
          </div>

          <label className={styles.group}>
            <span className={styles.label}>3D requested mode</span>
            <select className={styles.select} value={state.threeMode} onChange={(event) => state.setThreeMode(event.target.value as typeof state.threeMode)}>
              {threeModes.map((mode) => <option key={mode}>{mode}</option>)}
            </select>
          </label>

          <label className={styles.group}>
            <span className={styles.label}>Viewport preset</span>
            <select className={styles.select} value={state.viewportPreset} onChange={(event) => state.setViewportPreset(event.target.value as typeof state.viewportPreset)}>
              {viewportPresets.map((preset) => <option key={preset} value={preset}>{presetLabel(preset)}</option>)}
            </select>
          </label>

          <div className={styles.group}>
            <span className={styles.label}>AI-case flow · Stage 5</span>
            <p className={styles.note}>DEV-ONLY deterministic backend controls</p>
          </div>

          <label className={styles.group}>
            <span className={styles.label}>AI-case scenario</span>
            <select className={styles.select} value={state.aiCaseScenario} onChange={(event) => state.setAiCaseScenario(event.target.value as typeof state.aiCaseScenario)}>
              {aiCaseScenarios.map((scenario) => <option key={scenario}>{scenario}</option>)}
            </select>
          </label>

          <label className={styles.group}>
            <span className={styles.label}>Clarifications</span>
            <select className={styles.select} value={state.aiCaseClarifications} onChange={(event) => state.setAiCaseClarifications(Number(event.target.value) as typeof state.aiCaseClarifications)}>
              {clarificationScenarioValues.map((count) => <option key={count} value={count}>{count}</option>)}
            </select>
          </label>

          <label className={styles.group}>
            <span className={styles.label}>Result Complexity</span>
            <select className={styles.select} value={state.aiCaseResultLevel} onChange={(event) => state.setAiCaseResultLevel(event.target.value as typeof state.aiCaseResultLevel)}>
              {complexityLevels.map((level) => <option key={level}>{level}</option>)}
            </select>
          </label>

          <div className={styles.group}>
            <span className={styles.label}>Management · Stage 7</span>
            <p className={styles.note}>Роль + data state переключают Director / Executive / Admin и controlled 403/empty/error.</p>
          </div>

          <label className={`${styles.group} ${styles.toggle}`}>
            <input type="checkbox" checked={state.reducedMotion} onChange={(event) => state.setReducedMotion(event.target.checked)} />
            <span>Reduced motion simulation</span>
          </label>
        </aside>
      ) : null}
    </>
  );
}
