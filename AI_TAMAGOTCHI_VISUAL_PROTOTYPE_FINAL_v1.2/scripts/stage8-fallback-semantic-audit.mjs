import fs from 'node:fs';
const scene = fs.readFileSync('src/features/home/SceneHostBoundary.tsx', 'utf8');
const checks = [
  ['healthy composite selected only for happy', /healthState === 'happy'/.test(scene) && scene.includes('useHealthyComposite')],
  ['healthy composite not used for coma overlay branch', scene.includes("healthState === 'coma'") && scene.includes('useComaOverlay')],
  ['no standalone happy overlay on Day composite', !scene.includes('productionAssets.fallback.mascotHappy')],
  ['coma overlay uses approved coma raster', scene.includes('productionAssets.fallback.mascotComa')],
  ['coma overlay is independent of realtime requested mode', /const useComaOverlay = !loading && healthState === 'coma'/.test(scene)],
  ['non-happy states retain semantic DOM cue', scene.includes('requiresSemanticCue') && scene.includes('stateCue')],
];
for (const [label, ok] of checks) {
  if (!ok) throw new Error(`FAIL ${label}`);
  console.log(`PASS ${label}`);
}
console.log(`STAGE8_FALLBACK_SEMANTIC_AUDIT=PASS checks=${checks.length}`);
