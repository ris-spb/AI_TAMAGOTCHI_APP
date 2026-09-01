import { productionAssets } from '../../assets/productionAssets';
import type { MascotState } from '../../mock-api/contracts';
import type { ThreeMode } from '../../demo-controls/store';
import { resolveSceneRuntime } from '../../three/runtimeContract';
import { AmbientLayer } from './AmbientLayer';
import { ApprovedAssetImage } from './ApprovedAssetImage';
import styles from './SceneHostBoundary.module.css';

const stateLabels: Record<MascotState, string> = {
  happy: 'Бодрый',
  normal: 'Нормальный',
  bored: 'Скучает',
  tired: 'Уставший',
  very_weak: 'Очень слабый',
  coma: 'Кома',
};

const stateMascots: Record<MascotState, string> = productionAssets.approvedHome.mascot;

type SceneHostBoundaryProps = {
  readonly healthState: MascotState;
  readonly threeMode: ThreeMode;
  readonly loading?: boolean;
};

/**
 * Approved layered static Home v2.2.
 * Background is constant for all health states; only mascot asset changes.
 * No proxy/fake GLB is introduced. If realtime 3D is unavailable, this layered
 * composition is the finished static fallback and core UI remains interactive.
 */
export function SceneHostBoundary({ healthState, threeMode, loading = false }: SceneHostBoundaryProps) {
  const runtime = resolveSceneRuntime(threeMode, loading);

  return (
    <div
      className={styles.scene}
      data-three-mode={threeMode}
      data-health-state={healthState}
      data-scene-lifecycle={runtime.lifecycle}
      data-runtime-tier={runtime.tier}
      aria-label={`Сцена Home. Состояние Любознайки: ${stateLabels[healthState]}`}
    >
      <div className={styles.base}>
        <ApprovedAssetImage
          src={loading ? productionAssets.fallback.loadingPreview : productionAssets.approvedHome.background}
          alt={loading ? 'Approved loading preview сцены Пулково' : 'Утверждённый фон Home — терминал Пулково'}
        />
      </div>

      {!loading ? <AmbientLayer active={threeMode === 'on'} /> : null}
      <div className={styles.scrim} aria-hidden="true" />

      {!loading ? (
        <div className={styles.mascot} data-mascot-state={healthState}>
          <ApprovedAssetImage
            src={stateMascots[healthState]}
            alt={`Любознайка — ${stateLabels[healthState]}`}
            fit="contain"
            missingLabel={`Mascot asset ${healthState} недоступен.`}
          />
        </div>
      ) : null}

      {import.meta.env.DEV ? (
        <span className={styles.devStatus}>
          {`LAYERED_STATIC_APPROVED · ${runtime.lifecycle} · Tier ${runtime.tier}${runtime.fallbackReason ? ` · ${runtime.fallbackReason}` : ''}`}
        </span>
      ) : null}
    </div>
  );
}
