from pathlib import Path

base = Path('/mnt/data/ai_tamagotchi_pkg/AI_TAMAGOTCHI_FINAL_DEVELOPMENT_PACKAGE_v1.0')
visual = Path('/mnt/data/visual_ref_stage8/AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0')

checks = {
    '3D runtime': (base / '11_3D_RUNTIME/3D_RUNTIME_FINAL.md', ['Hybrid realtime + static fallback', 'Tier F', 'Reduced Motion']),
    'animation mapping': (base / '11_3D_RUNTIME/ANIMATION_STATE_MAPPING.md', ['MSC_IDLE_BASE', 'ambient_reaction', 'event IDs must be deduplicated']),
    'performance tiers': (base / '11_3D_RUNTIME/PERFORMANCE_TIERS.md', ['Tier A', 'Tier B', 'Tier C', 'Tier F']),
    'fallback mapping': (base / '11_3D_RUNTIME/FALLBACK_MAPPING.md', ['Coma fallback has priority', '3D Unavailable + DOM state cue', 'no false emotional overlay']),
    'loading order': (base / '11_3D_RUNTIME/ASSET_LOADING_ORDER.md', ['Functional UI', 'Loading preview', 'Tier F']),
    'PWA/3D QA': (base / '15_QA/PWA_AND_3D_TESTS.md', ['static preview', 'functional UI', 'fallback works']),
    'visual integration': (base / '10_FRONTEND_CONTRACT/VISUAL_INTEGRATION.md', ['SceneHostBoundary', '08_PRODUCTION_EXPORTS', 'reduced motion']),
    'current motion handoff': (visual / '09_DEVELOPER_HANDOFF/Motion_Specification.md', ['Navigation | 200 ms', 'Button press | 140 ms', 'AI-case completion | 360 ms', 'Modal enter | 240 ms', 'Modal exit | 200 ms']),
}

for label, (p, needles) in checks.items():
    assert p.is_file(), f'{label}: missing {p}'
    text = p.read_text(errors='replace')
    for needle in needles:
        assert needle.lower() in text.lower(), f'{label}: missing contract marker {needle}'

print(f'STAGE8_PACKAGE_CROSSCHECK=PASS contracts={len(checks)}')
