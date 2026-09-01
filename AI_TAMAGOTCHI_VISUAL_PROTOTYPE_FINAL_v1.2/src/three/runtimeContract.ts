type ThreeMode = 'on' | 'off' | 'error';

export const sceneLifecycleStates = ['preview', 'loading_core', 'live', 'unsupported', 'degraded', 'context_lost', 'fallback'] as const;
export type SceneLifecycleState = (typeof sceneLifecycleStates)[number];
export type RuntimeTier = 'A' | 'B' | 'C' | 'F';
export type FallbackReason = 'FINAL_ASSETS_EXTERNAL' | 'WEBGL_DISABLED' | 'WEBGL_ERROR' | 'CORE_LOADING' | null;

export type SceneRuntimeSnapshot = {
  readonly lifecycle: SceneLifecycleState;
  readonly tier: RuntimeTier;
  readonly isLiveSceneReady: boolean;
  readonly fallbackReason: FallbackReason;
};

// Frozen Stage-13 dependency flag: final production GLB/KTX2 are not physically available.
export const FINAL_PRODUCTION_3D_AVAILABLE = false as const;

export function resolveSceneRuntime(threeMode: ThreeMode, appLoading = false): SceneRuntimeSnapshot {
  if (appLoading) {
    return { lifecycle: 'preview', tier: 'F', isLiveSceneReady: false, fallbackReason: 'CORE_LOADING' };
  }
  if (threeMode === 'off') {
    return { lifecycle: 'unsupported', tier: 'F', isLiveSceneReady: false, fallbackReason: 'WEBGL_DISABLED' };
  }
  if (threeMode === 'error') {
    return { lifecycle: 'fallback', tier: 'F', isLiveSceneReady: false, fallbackReason: 'WEBGL_ERROR' };
  }
  if (!FINAL_PRODUCTION_3D_AVAILABLE) {
    return { lifecycle: 'fallback', tier: 'F', isLiveSceneReady: false, fallbackReason: 'FINAL_ASSETS_EXTERNAL' };
  }
  return { lifecycle: 'live', tier: 'A', isLiveSceneReady: true, fallbackReason: null };
}
