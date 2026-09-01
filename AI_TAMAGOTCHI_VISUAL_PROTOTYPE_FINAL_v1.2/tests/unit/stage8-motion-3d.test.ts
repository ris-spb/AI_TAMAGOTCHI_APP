import { describe, expect, it } from 'vitest';
import { FINAL_PRODUCTION_3D_AVAILABLE, resolveSceneRuntime } from '../../src/three/runtimeContract';

describe('Stage 8 motion / 3D contract', () => {
  it('does not claim final production 3D exists', () => expect(FINAL_PRODUCTION_3D_AVAILABLE).toBe(false));
  it('uses Tier F when realtime is requested but final binaries are external', () => {
    expect(resolveSceneRuntime('on')).toMatchObject({ lifecycle: 'fallback', tier: 'F', isLiveSceneReady: false, fallbackReason: 'FINAL_ASSETS_EXTERNAL' });
  });
  it('keeps explicit unsupported/error fallbacks', () => {
    expect(resolveSceneRuntime('off')).toMatchObject({ lifecycle: 'unsupported', tier: 'F' });
    expect(resolveSceneRuntime('error')).toMatchObject({ lifecycle: 'fallback', tier: 'F', fallbackReason: 'WEBGL_ERROR' });
  });
});
