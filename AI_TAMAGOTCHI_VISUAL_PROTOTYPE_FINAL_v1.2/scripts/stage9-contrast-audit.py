from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
tokens = (root/'src/design-system/tokens.css').read_text()

def token(name):
    m=re.search(rf'--{re.escape(name)}:\s*(#[0-9a-fA-F]{{6}})',tokens)
    if not m: raise SystemExit(f'missing token {name}')
    return m.group(1)

def rgb(h):
    h=h.lstrip('#'); return tuple(int(h[i:i+2],16)/255 for i in (0,2,4))
def lin(c): return c/12.92 if c <= .04045 else ((c+.055)/1.055)**2.4
def lum(h):
    r,g,b=rgb(h); return .2126*lin(r)+.7152*lin(g)+.0722*lin(b)
def contrast(a,b):
    x,y=lum(a),lum(b); return (max(x,y)+.05)/(min(x,y)+.05)

surface=token('color-surface-primary'); background=token('color-background-primary')
pairs=[
 ('text-primary/surface',token('color-text-primary'),surface,4.5),
 ('text-secondary/surface',token('color-text-secondary'),surface,4.5),
 ('text-primary/action',token('color-text-on-action-primary'),token('color-action-primary'),4.5),
]
failed=[]
for name,a,b,target in pairs:
    value=contrast(a,b)
    print(f'{name}={value:.2f}:1 target>={target:.1f}')
    if value < target: failed.append(name)

success=contrast(token('color-state-success'),surface)
error=contrast(token('color-state-error'),surface)
print(f'known-semantic-success/surface={success:.2f}:1 DECORATION_ONLY')
print(f'known-semantic-error/surface={error:.2f}:1 DECORATION_ONLY')

css='\n'.join(p.read_text() for p in (root/'src').rglob('*.css'))
# semantic colors may decorate borders/backgrounds/progress, but must not be direct small-text color.
violations=[]
for line in css.splitlines():
    stripped=line.strip()
    if re.search(r'(?:^|[;{])\s*color:\s*var\(--color-state-(success|error)\)', stripped):
        # Allow only when the same declaration is clearly border-color/background via minified multi-rule lines is ambiguous.
        # Direct `color:` token is forbidden by Stage-9 remediation.
        violations.append(stripped[:220])
if violations:
    print('DIRECT_SEMANTIC_TEXT_COLOR_VIOLATIONS')
    for item in violations[:20]: print(item)
    failed.append('semantic-text-usage')

if failed:
    raise SystemExit('STAGE9_CONTRAST_AUDIT=FAIL ' + ','.join(failed))
print('STAGE9_CONTRAST_AUDIT=PASS')
