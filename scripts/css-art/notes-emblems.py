"""Generate exact geometry for the Notes math emblems (viewBox -100..100)."""
import math, cmath, json
import numpy as np

def f(v): return f"{v:.1f}".rstrip('0').rstrip('.') if abs(v) >= 0.05 else "0"

def poly_path(pts, close=False):
    if not pts: return ""
    s = "M" + " L".join(f"{f(x)} {f(y)}" for x, y in pts)
    return s + ("Z" if close else "")

def rdp(pts, eps):
    if len(pts) < 3: return pts
    a, b = np.array(pts[0]), np.array(pts[-1])
    ab = b - a; n = np.hypot(*ab)
    P = np.array(pts)
    if n == 0: d = np.hypot(*(P - a).T)
    else: d = np.abs(np.cross(ab, P - a)) / n
    i = int(np.argmax(d))
    if d[i] > eps:
        return rdp(pts[:i+1], eps)[:-1] + rdp(pts[i:], eps)
    return [pts[0], pts[-1]]

def contours(field, level, xs, ys):
    """Marching squares on a grid -> chained polylines."""
    segs = []
    ny, nx = field.shape
    def interp(p1, p2, v1, v2):
        t = (level - v1) / (v2 - v1) if v2 != v1 else 0.5
        return (p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1]))
    for j in range(ny - 1):
        for i in range(nx - 1):
            v = [field[j, i], field[j, i+1], field[j+1, i+1], field[j+1, i]]
            p = [(xs[i], ys[j]), (xs[i+1], ys[j]), (xs[i+1], ys[j+1]), (xs[i], ys[j+1])]
            idx = sum(1 << k for k in range(4) if v[k] > level)
            if idx in (0, 15): continue
            e = []
            for k in range(4):
                a, b = k, (k + 1) % 4
                if (v[a] > level) != (v[b] > level): e.append(interp(p[a], p[b], v[a], v[b]))
            if len(e) == 2: segs.append((e[0], e[1]))
            elif len(e) == 4: segs += [(e[0], e[1]), (e[2], e[3])]
    # chain
    key = lambda q: (round(q[0], 4), round(q[1], 4))
    adj = {}
    for a, b in segs:
        adj.setdefault(key(a), []).append(b); adj.setdefault(key(b), []).append(a)
    used = set(); lines = []
    for a, b in segs:
        if (key(a), key(b)) in used: continue
        line = [a, b]; used.add((key(a), key(b))); used.add((key(b), key(a)))
        for end in (1, 0):
            while True:
                cur = line[-1] if end else line[0]
                nxt = None
                for q in adj.get(key(cur), []):
                    if (key(cur), key(q)) not in used: nxt = q; break
                if nxt is None: break
                used.add((key(cur), key(nxt))); used.add((key(nxt), key(cur)))
                if end: line.append(nxt)
                else: line.insert(0, nxt)
        lines.append(line)
    return lines

out = {}

# 1 · Mandelbrot lemniscates |z_n(c)| = 2, n = 1..7, plus filled set approximation (n = 12)
cx, cy, sc = -0.62, 0.0, 62.0   # plane point at viewBox centre, units per plane unit
N = 360
xs = np.linspace(-100, 100, N); ys = np.linspace(-100, 100, N)
X, Y = np.meshgrid(xs, ys)
C = (X / sc + cx) + 1j * (Y / sc + cy)
z = np.zeros_like(C); lem = []
mag = []
for n in range(1, 13):
    z = z * z + C
    with np.errstate(over='ignore', invalid='ignore'):
        m = np.nan_to_num(np.abs(z), nan=1e6, posinf=1e6)
    mag.append(np.minimum(m, 1e6))
for n in range(1, 8):
    ls = contours(mag[n-1], 2.0, xs, ys)
    lem.append(" ".join(poly_path(rdp(l, 0.35)) for l in ls if len(l) > 6))
out['mandelLemniscates'] = lem
setlines = contours(mag[11], 2.0, xs, ys)
out['mandelSet'] = " ".join(poly_path(rdp(l, 0.3), True) for l in setlines if len(l) > 10)

# 2 · Golden rectangle subdivision + quarter arcs + true log spiral
phi = (1 + 5 ** 0.5) / 2
W = 170.0; H = W / phi
x, y, w, h = -W / 2, -H / 2, W, H
squares, arcs = [], []
for k in range(10):
    d = k % 4
    if d == 0:   s = h; sq = (x, y, s); c = (x + s, y + s); x += s; w -= s; a0 = 180
    elif d == 1: s = w; sq = (x, y, s); c = (x, y + s); y += s; h -= s; a0 = 270
    elif d == 2: s = h; sq = (x + w - s, y, s); c = (x + w - s, y); w -= s; a0 = 0
    else:        s = w; sq = (x, y + h - s, s); c = (x + s, y + h - s); h -= s; a0 = 90
    squares.append(sq)
    p0 = (c[0] + s * math.cos(math.radians(a0)), c[1] + s * math.sin(math.radians(a0)))
    p1 = (c[0] + s * math.cos(math.radians(a0 + 90)), c[1] + s * math.sin(math.radians(a0 + 90)))
    arcs.append(f"M{f(p0[0])} {f(p0[1])} A{f(s)} {f(s)} 0 0 1 {f(p1[0])} {f(p1[1])}")
pole = (x + w / 2, y + h / 2)
out['spiralSquares'] = " ".join(f"M{f(a)} {f(b)} h{f(s)} v{f(s)} h{f(-s)}Z" for a, b, s in squares)
out['spiralArcs'] = " ".join(arcs)
b = math.log(phi) / (math.pi / 2)
start = (squares[0][0], squares[0][1] + squares[0][2])     # the arc's outer start point
r0 = math.hypot(start[0] - pole[0], start[1] - pole[1]); th0 = math.atan2(start[1] - pole[1], start[0] - pole[0])
pts = []
for i in range(0, 900):
    t = i / 899 * 5.2 * math.pi
    r = r0 * math.exp(-b * t)
    pts.append((pole[0] + r * math.cos(th0 + t), pole[1] + r * math.sin(th0 + t)))
out['spiralLog'] = poly_path(rdp(pts, 0.15))
out['spiralPole'] = [round(pole[0], 2), round(pole[1], 2)]

# 3 · Catenoid wireframe r = c·cosh(z/c), tilted view
c = 0.62; hz = 1.0; S = 58.0; tilt = 0.30
mer_front, mer_back = [], []
for k in range(24):
    a = 2 * math.pi * k / 24
    ptsm = []
    for i in range(61):
        zz = -hz + 2 * hz * i / 60
        r = c * math.cosh(zz / c)
        ptsm.append((S * r * math.cos(a), -S * zz * 1.15 + S * tilt * r * math.sin(a)))
    (mer_front if math.sin(a) >= 0 else mer_back).append(poly_path(rdp(ptsm, 0.2)))
par_front, par_back = [], []
for i in range(9):
    zz = -hz + 2 * hz * i / 8
    r = c * math.cosh(zz / c)
    cxp, cyp, rx, ry = 0, -S * zz * 1.15, S * r, S * tilt * r
    par_front.append(f"M{f(-rx)} {f(cyp)} A{f(rx)} {f(ry)} 0 0 0 {f(rx)} {f(cyp)}")
    par_back.append(f"M{f(-rx)} {f(cyp)} A{f(rx)} {f(ry)} 0 0 1 {f(rx)} {f(cyp)}")
out['catenoidFront'] = " ".join(mer_front + par_front)
out['catenoidBack'] = " ".join(mer_back + par_back)

# 4 · Catenary family y = a·cosh(x/a) − a (hanging), x ∈ [−1, 1]
fam = []
for a in [0.32, 0.4, 0.5, 0.62, 0.78, 1.0, 1.3, 1.8]:
    sag = a * math.cosh(1 / a) - a              # drop from the pegs to the lowest point
    ptsa = []
    for i in range(121):
        xx = -1 + 2 * i / 120
        yy = a * math.cosh(xx / a) - a          # 0 at the bottom, sag at the ends
        ptsa.append((xx * 82, -46 + (sag - yy) * (92 / 2.6)))
    fam.append(poly_path(rdp(ptsa, 0.12)))
out['catenaryFamily'] = fam

# 5 · Penrose P3 by Robinson-triangle deflation (Preshing's method)
gold = phi
tris = []
for i in range(10):
    B = cmath.rect(1, (2 * i - 1) * math.pi / 10)
    Cc = cmath.rect(1, (2 * i + 1) * math.pi / 10)
    if i % 2 == 0: B, Cc = Cc, B
    tris.append((0, 0j, B, Cc))
def subdivide(tris):
    res = []
    for col, A, B, Cc in tris:
        if col == 0:
            P = A + (B - A) / gold
            res += [(0, Cc, P, B), (1, P, Cc, A)]
        else:
            Q = B + (A - B) / gold
            R = B + (Cc - B) / gold
            res += [(1, R, Cc, A), (1, Q, R, B), (0, R, Q, A)]
    return res
for _ in range(4): tris = subdivide(tris)
SC = 100.0
thin, thick, edges = [], [], []
for col, A, B, Cc in tris:
    if max(abs(A), abs(B), abs(Cc)) * SC > 90: continue
    pts3 = [(A.real * SC, A.imag * SC), (B.real * SC, B.imag * SC), (Cc.real * SC, Cc.imag * SC)]
    (thin if col == 0 else thick).append(poly_path(pts3, True))
    edges.append(f"M{f(pts3[1][0])} {f(pts3[1][1])} L{f(pts3[0][0])} {f(pts3[0][1])} L{f(pts3[2][0])} {f(pts3[2][1])}")
out['penroseThin'] = " ".join(thin)
out['penroseThick'] = " ".join(thick)
pass  # edges are shown by the gaps between fills

# 6 · Phyllotaxis with parastichies (21 and 34 families)
NS = 233; cR = 84 / math.sqrt(NS)
seeds = []
for n in range(1, NS + 1):
    a = n * 137.508 * math.pi / 180; r = cR * math.sqrt(n)
    seeds.append((r * math.cos(a), r * math.sin(a)))
out['phylloSeeds'] = [[round(x, 1), round(y, 1)] for x, y in seeds]
def family(k):
    lines = []
    for s0 in range(1, k + 1):
        line = [seeds[n - 1] for n in range(s0, NS + 1, k)]
        if len(line) > 2: lines.append(poly_path(line))
    return " ".join(lines)
out['phyllo21'] = family(21)
out['phyllo34'] = family(34)

# 7 · Lissajous family x = sin(3t + δ), y = sin(2t)
famL = []
for k in range(7):
    d = math.pi / 2 + k * math.pi / 16
    pts7 = [(80 * math.sin(3 * t + d), 72 * math.sin(2 * t)) for t in np.linspace(0, 2 * math.pi, 361)]
    famL.append(poly_path(rdp(pts7, 0.15), True))
out['lissaFamily'] = famL

ts = "/* Generated by scripts/css-art/notes-emblems.py (numpy marching squares, Robinson-triangle deflation) — exact geometry for the Notes math emblems, viewBox −100…100. Do not edit by hand. */\n"
for k, v in out.items():
    ts += f"export const {k} = {json.dumps(v, ensure_ascii=False)} as const;\n"
open(__import__('os').path.join(__import__('os').path.dirname(__file__), '../../components/css-art/notes-math-geometry.ts'), 'w').write(ts)
print({k: (len(v) if isinstance(v, str) else len(json.dumps(v))) for k, v in out.items()}, 'total', len(ts))
