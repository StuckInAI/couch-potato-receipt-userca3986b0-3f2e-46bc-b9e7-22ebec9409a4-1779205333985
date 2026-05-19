// Audit Dashboard - the over-engineered "complete auditing" visualization panel
// that sits next to the receipt on wider screens (stacks below on mobile).
//
// Sections:
//  1. SEROTONIN SINK-HOLE   -> 3D bar chart with witty labels & MAXED OUT bars
//  2. APOCALYPSE READYNESS  -> big circular gauge
//  3. AUDIT GRID            -> 4x3 grid of pixel-art icons w/ PASS/FAIL tags
//
// All pure SVG / CSS. No external chart libs.

import { Answer, PersonalityResult } from '@/types/index';

type AuditDashboardProps = {
  answers: Answer[];
  result: PersonalityResult;
};

type BarDatum = {
  label: string;
  pct: number; // raw, can exceed 100
  display: string; // what to render (e.g., "127%" or "MAXED OUT")
  maxed: boolean;
};

type AuditTile = {
  label: string;
  pass: boolean;
  icon: 'phone' | 'wallet' | 'ghost' | 'couch' | 'tabs' | 'eye' | 'coffee' | 'bed' | 'cart' | 'clock' | 'pill' | 'skull';
};

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export default function AuditDashboard({ answers, result }: AuditDashboardProps) {
  // ---- derive values from answers (1..4 per Q) ----
  const get = (id: number): number => {
    const a = answers.find(x => x.questionId === id);
    return a ? a.value : 2;
  };
  const screen = get(1);
  const text = get(2);
  const buy = get(3);
  const sat = get(4);
  const content = get(5);
  const totalRaw = screen + text + buy + sat + content;

  // Readyness is intentionally inverted-ish vibe: more rot = higher "apocalypse" stat
  const apocalypseReady = clamp(Math.round((totalRaw / 20) * 95) + 5, 12, 99);

  // ---- Bar chart data (some MAXED OUT, some >100%) ----
  const bars: BarDatum[] = [
    {
      label: 'DOOM-SCROLL',
      pct: 60 + screen * 18,
      display: 60 + screen * 18 >= 100 ? 'MAXED OUT' : `${60 + screen * 18}%`,
      maxed: 60 + screen * 18 >= 100,
    },
    {
      label: 'GHOST MODE',
      pct: 35 + text * 22,
      display: `${35 + text * 22}%`,
      maxed: 35 + text * 22 >= 100,
    },
    {
      label: 'CART ABUSE',
      pct: 40 + buy * 20,
      display: 40 + buy * 20 >= 100 ? 'MAXED OUT' : `${40 + buy * 20}%`,
      maxed: 40 + buy * 20 >= 100,
    },
    {
      label: 'COUCH LOCK',
      pct: 30 + sat * 25,
      display: `${30 + sat * 25}%`,
      maxed: 30 + sat * 25 >= 100,
    },
    {
      label: 'TAB CHAOS',
      pct: 50 + content * 19,
      display: `${50 + content * 19}%`,
      maxed: 50 + content * 19 >= 100,
    },
    {
      label: 'VIBE DEBT',
      pct: 75 + Math.round(totalRaw * 1.3),
      display: 'MAXED OUT',
      maxed: true,
    },
  ];

  const maxScale = Math.max(...bars.map(b => Math.min(b.pct, 140)), 100);

  // ---- 12 audit tiles ----
  const tiles: AuditTile[] = [
    { label: 'SCROLL',  pass: screen <= 2,  icon: 'phone' },
    { label: 'REPLY',   pass: text <= 2,    icon: 'ghost' },
    { label: 'SPEND',   pass: buy <= 2,     icon: 'wallet' },
    { label: 'REST',    pass: sat <= 2,     icon: 'bed' },
    { label: 'FOCUS',   pass: content <= 2, icon: 'tabs' },
    { label: 'SLEEP',   pass: sat <= 3,     icon: 'clock' },
    { label: 'CAFFEINE',pass: false,        icon: 'coffee' },
    { label: 'COUCH',   pass: sat <= 2,     icon: 'couch' },
    { label: 'CART',    pass: buy <= 1,     icon: 'cart' },
    { label: 'EYES',    pass: screen <= 3,  icon: 'eye' },
    { label: 'MEDS',    pass: false,        icon: 'pill' },
    { label: 'SOUL',    pass: totalRaw <= 10, icon: 'skull' },
  ];

  // ---- circular gauge geometry ----
  const gaugeSize = 168;
  const gaugeStroke = 14;
  const gaugeR = (gaugeSize - gaugeStroke) / 2;
  const gaugeCirc = 2 * Math.PI * gaugeR;
  // 3/4 arc for that "meter" look
  const arcFraction = 0.78;
  const visibleLen = gaugeCirc * arcFraction;
  const filled = visibleLen * (apocalypseReady / 100);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* ============ SEROTONIN SINK-HOLE ============ */}
      <section className="audit-panel p-5">
        <div className="flex items-baseline justify-between mb-1">
          <h3 className="font-pixel" style={{ fontSize: 11, color: '#1a1a1a', letterSpacing: '0.04em', textShadow: '1px 1px 0 rgba(120,90,50,0.25)' }}>
            SEROTONIN SINK-HOLE
          </h3>
          <span className="font-receipt" style={{ fontSize: 10, color: '#6b6b6b', letterSpacing: '0.1em' }}>
            FIG.01
          </span>
        </div>
        <p className="font-receipt mb-4" style={{ fontSize: 10, color: '#8a7a5c', letterSpacing: '0.05em' }}>
          measured leakage rate, dopamine units / hr
        </p>

        {/* 3D bars */}
        <div className="flex items-end justify-between gap-2" style={{ height: 180 }}>
          {bars.map((b, i) => {
            const h = clamp((Math.min(b.pct, 140) / maxScale) * 150, 12, 160);
            const isTop = i === bars.length - 1 || b.maxed;
            return (
              <div key={i} className="flex flex-col items-center flex-1" style={{ minWidth: 0 }}>
                {/* number on top */}
                <div
                  className="font-pixel-soft mb-1"
                  style={{
                    fontSize: 9,
                    color: isTop ? '#1a1a1a' : '#1a1a1a',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {b.display}
                </div>
                {/* 3D bar */}
                <div className="relative" style={{ width: '78%', height: h }}>
                  {/* side face (depth) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: -6,
                      right: -6,
                      width: 6,
                      height: h,
                      background: isTop ? '#1a1a1a' : '#8a7a5c',
                      transform: 'skewY(-45deg)',
                      transformOrigin: 'bottom left',
                    }}
                  />
                  {/* top face (depth) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: -6,
                      left: 6,
                      width: '100%',
                      height: 6,
                      background: isTop ? '#2a2a2a' : '#a99572',
                      transform: 'skewX(-45deg)',
                      transformOrigin: 'bottom left',
                    }}
                  />
                  {/* front face */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: isTop
                        ? 'repeating-linear-gradient(90deg, #1a1a1a 0, #1a1a1a 4px, #2a2a2a 4px, #2a2a2a 8px)'
                        : 'repeating-linear-gradient(90deg, #c9a96e 0, #c9a96e 4px, #b8995a 4px, #b8995a 8px)',
                      border: '1.5px solid #1a1a1a',
                    }}
                  />
                </div>
                {/* label */}
                <div
                  className="font-receipt mt-2 text-center"
                  style={{ fontSize: 8.5, color: '#1a1a1a', letterSpacing: '0.04em', lineHeight: 1.1 }}
                >
                  {b.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* axis line */}
        <div className="mt-1" style={{ borderTop: '1.5px solid #1a1a1a' }} />
        <div className="flex justify-between mt-1">
          <span className="font-receipt" style={{ fontSize: 8, color: '#8a7a5c' }}>0%</span>
          <span className="font-receipt" style={{ fontSize: 8, color: '#8a7a5c' }}>BASELINE 100%</span>
          <span className="font-receipt" style={{ fontSize: 8, color: '#8a7a5c' }}>140%+</span>
        </div>
      </section>

      {/* ============ APOCALYPSE READYNESS GAUGE ============ */}
      <section className="audit-panel p-5 flex flex-col items-center">
        <h3
          className="font-pixel mb-1"
          style={{ fontSize: 11, color: '#1a1a1a', letterSpacing: '0.05em', textShadow: '1px 1px 0 rgba(120,90,50,0.25)' }}
        >
          APOCALYPSE READYNESS
        </h3>
        <p className="font-receipt mb-3" style={{ fontSize: 10, color: '#8a7a5c', letterSpacing: '0.06em' }}>
          cert. by dept. of vibes
        </p>

        <div className="relative" style={{ width: gaugeSize, height: gaugeSize }}>
          <svg width={gaugeSize} height={gaugeSize} viewBox={`0 0 ${gaugeSize} ${gaugeSize}`}>
            {/* rotate so gap is at bottom */}
            <g transform={`rotate(135 ${gaugeSize / 2} ${gaugeSize / 2})`}>
              {/* track */}
              <circle
                cx={gaugeSize / 2}
                cy={gaugeSize / 2}
                r={gaugeR}
                fill="none"
                stroke="#d9c9a6"
                strokeWidth={gaugeStroke}
                strokeDasharray={`${visibleLen} ${gaugeCirc}`}
              />
              {/* fill */}
              <circle
                cx={gaugeSize / 2}
                cy={gaugeSize / 2}
                r={gaugeR}
                fill="none"
                stroke="#1a1a1a"
                strokeWidth={gaugeStroke}
                strokeDasharray={`${filled} ${gaugeCirc}`}
                strokeLinecap="butt"
              />
              {/* tick marks */}
              {Array.from({ length: 9 }).map((_, i) => {
                const t = i / 8;
                const angle = t * arcFraction * 2 * Math.PI;
                const r1 = gaugeR - gaugeStroke / 2 - 2;
                const r2 = gaugeR - gaugeStroke / 2 - 8;
                const cx = gaugeSize / 2 + Math.cos(angle) * r1;
                const cy = gaugeSize / 2 + Math.sin(angle) * r1;
                const cx2 = gaugeSize / 2 + Math.cos(angle) * r2;
                const cy2 = gaugeSize / 2 + Math.sin(angle) * r2;
                return (
                  <line key={i} x1={cx} y1={cy} x2={cx2} y2={cy2} stroke="#1a1a1a" strokeWidth={1.5} />
                );
              })}
            </g>
          </svg>
          {/* center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              className="font-pixel"
              style={{
                fontSize: 28,
                color: '#1a1a1a',
                textShadow: '2px 2px 0 rgba(120,90,50,0.3)',
                lineHeight: 1,
              }}
            >
              {apocalypseReady}%
            </div>
            <div
              className="font-pixel-soft mt-2"
              style={{ fontSize: 9, color: '#1a1a1a', letterSpacing: '0.12em' }}
            >
              CERTIFIED
            </div>
          </div>
        </div>

        <div className="flex justify-between w-full mt-2 px-2">
          <span className="font-receipt" style={{ fontSize: 9, color: '#8a7a5c', letterSpacing: '0.08em' }}>FERAL</span>
          <span className="font-receipt" style={{ fontSize: 9, color: '#8a7a5c', letterSpacing: '0.08em' }}>OK</span>
          <span className="font-receipt" style={{ fontSize: 9, color: '#8a7a5c', letterSpacing: '0.08em' }}>WORLD-ENDING</span>
        </div>
      </section>

      {/* ============ ICON AUDIT GRID ============ */}
      <section className="audit-panel p-5">
        <div className="flex items-baseline justify-between mb-1">
          <h3 className="font-pixel" style={{ fontSize: 11, color: '#1a1a1a', letterSpacing: '0.04em', textShadow: '1px 1px 0 rgba(120,90,50,0.25)' }}>
            COMPLETE AUDIT GRID
          </h3>
          <span className="font-receipt" style={{ fontSize: 10, color: '#6b6b6b', letterSpacing: '0.1em' }}>
            12/12
          </span>
        </div>
        <p className="font-receipt mb-4" style={{ fontSize: 10, color: '#8a7a5c', letterSpacing: '0.05em' }}>
          itemized health-check, all subsystems
        </p>

        <div className="grid grid-cols-4 gap-3">
          {tiles.map((t, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-start py-2 px-1"
              style={{
                border: '1.5px solid #1a1a1a',
                background: t.pass ? 'rgba(201,169,110,0.18)' : 'rgba(26,26,26,0.06)',
                position: 'relative',
              }}
            >
              <AuditIcon kind={t.icon} />
              {/* status badge */}
              <div
                className="font-pixel-soft mt-1"
                style={{
                  fontSize: 8,
                  letterSpacing: '0.08em',
                  background: t.pass ? '#c9a96e' : '#1a1a1a',
                  padding: '1px 4px',
                  borderRadius: 0,
                }}
              >
                <span style={{ color: t.pass ? '#1a1a1a' : '#f4ecd8' }}>
                  {t.pass ? '✓ PASS' : '✕ FAIL'}
                </span>
              </div>
              <div
                className="font-receipt mt-1"
                style={{ fontSize: 8.5, color: '#1a1a1a', letterSpacing: '0.05em' }}
              >
                {t.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3" style={{ borderTop: '1px dashed #8a7a5c' }}>
          <div className="flex items-center justify-between">
            <span className="font-receipt" style={{ fontSize: 10, color: '#6b6b6b', letterSpacing: '0.06em' }}>
              FINAL CLASSIFICATION:
            </span>
            <span className="font-pixel" style={{ fontSize: 9, color: '#1a1a1a', letterSpacing: '0.06em' }}>
              {result.total}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

// =====================================================
// Pixel-art icon set (16x16 each), rendered via SVG <rect>s.
// =====================================================

function AuditIcon({ kind }: { kind: AuditTile['icon'] }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="40"
      height="40"
      shapeRendering="crispEdges"
      style={{ imageRendering: 'pixelated' }}
    >
      <IconPaths kind={kind} />
    </svg>
  );
}

function IconPaths({ kind }: { kind: AuditTile['icon'] }) {
  const D = '#1a1a1a';
  const A = '#c9a96e';
  const L = '#e8dfc8';
  switch (kind) {
    case 'phone':
      return (
        <g>
          <rect x="4" y="1" width="8" height="14" fill={D} />
          <rect x="5" y="3" width="6" height="9" fill={A} />
          <rect x="7" y="13" width="2" height="1" fill={L} />
          <rect x="6" y="5" width="4" height="1" fill={D} />
          <rect x="6" y="7" width="3" height="1" fill={D} />
          <rect x="6" y="9" width="4" height="1" fill={D} />
        </g>
      );
    case 'wallet':
      return (
        <g>
          <rect x="1" y="4" width="14" height="9" fill={D} />
          <rect x="2" y="5" width="12" height="7" fill={A} />
          <rect x="10" y="7" width="4" height="3" fill={D} />
          <rect x="11" y="8" width="1" height="1" fill={A} />
          <rect x="2" y="3" width="10" height="1" fill={D} />
        </g>
      );
    case 'ghost':
      return (
        <g>
          <rect x="4" y="2" width="8" height="1" fill={D} />
          <rect x="3" y="3" width="10" height="1" fill={D} />
          <rect x="2" y="4" width="12" height="9" fill={D} />
          <rect x="3" y="5" width="10" height="7" fill={L} />
          <rect x="5" y="7" width="2" height="2" fill={D} />
          <rect x="9" y="7" width="2" height="2" fill={D} />
          <rect x="2" y="13" width="2" height="2" fill={D} />
          <rect x="6" y="13" width="2" height="2" fill={D} />
          <rect x="10" y="13" width="2" height="2" fill={D} />
        </g>
      );
    case 'couch':
      return (
        <g>
          <rect x="1" y="6" width="14" height="6" fill={D} />
          <rect x="2" y="7" width="12" height="3" fill={A} />
          <rect x="1" y="5" width="3" height="4" fill={D} />
          <rect x="12" y="5" width="3" height="4" fill={D} />
          <rect x="2" y="12" width="2" height="2" fill={D} />
          <rect x="12" y="12" width="2" height="2" fill={D} />
        </g>
      );
    case 'tabs':
      return (
        <g>
          <rect x="1" y="3" width="5" height="2" fill={D} />
          <rect x="6" y="2" width="5" height="3" fill={D} />
          <rect x="11" y="3" width="4" height="2" fill={D} />
          <rect x="1" y="5" width="14" height="9" fill={D} />
          <rect x="2" y="6" width="12" height="7" fill={A} />
          <rect x="4" y="8" width="8" height="1" fill={D} />
          <rect x="4" y="10" width="6" height="1" fill={D} />
        </g>
      );
    case 'eye':
      return (
        <g>
          <rect x="2" y="7" width="12" height="2" fill={D} />
          <rect x="3" y="6" width="10" height="4" fill={D} />
          <rect x="4" y="7" width="8" height="2" fill={L} />
          <rect x="6" y="6" width="4" height="4" fill={A} />
          <rect x="7" y="7" width="2" height="2" fill={D} />
          <rect x="2" y="5" width="3" height="1" fill={D} />
          <rect x="11" y="5" width="3" height="1" fill={D} />
          <rect x="2" y="10" width="3" height="1" fill={D} />
          <rect x="11" y="10" width="3" height="1" fill={D} />
        </g>
      );
    case 'coffee':
      return (
        <g>
          <rect x="3" y="4" width="9" height="9" fill={D} />
          <rect x="4" y="5" width="7" height="7" fill={A} />
          <rect x="12" y="6" width="2" height="4" fill={D} />
          <rect x="3" y="13" width="9" height="1" fill={D} />
          <rect x="5" y="1" width="1" height="2" fill={D} />
          <rect x="7" y="1" width="1" height="2" fill={D} />
          <rect x="9" y="1" width="1" height="2" fill={D} />
        </g>
      );
    case 'bed':
      return (
        <g>
          <rect x="1" y="5" width="14" height="7" fill={D} />
          <rect x="2" y="6" width="12" height="3" fill={L} />
          <rect x="2" y="9" width="12" height="2" fill={A} />
          <rect x="1" y="4" width="4" height="3" fill={D} />
          <rect x="2" y="5" width="2" height="1" fill={L} />
          <rect x="1" y="12" width="2" height="2" fill={D} />
          <rect x="13" y="12" width="2" height="2" fill={D} />
        </g>
      );
    case 'cart':
      return (
        <g>
          <rect x="1" y="3" width="2" height="1" fill={D} />
          <rect x="3" y="4" width="2" height="1" fill={D} />
          <rect x="4" y="5" width="11" height="1" fill={D} />
          <rect x="4" y="6" width="1" height="5" fill={D} />
          <rect x="14" y="6" width="1" height="5" fill={D} />
          <rect x="5" y="6" width="9" height="5" fill={A} />
          <rect x="6" y="8" width="7" height="1" fill={D} />
          <rect x="5" y="12" width="2" height="2" fill={D} />
          <rect x="12" y="12" width="2" height="2" fill={D} />
        </g>
      );
    case 'clock':
      return (
        <g>
          <rect x="4" y="1" width="8" height="1" fill={D} />
          <rect x="4" y="14" width="8" height="1" fill={D} />
          <rect x="2" y="3" width="12" height="10" fill={D} />
          <rect x="3" y="4" width="10" height="8" fill={A} />
          <rect x="7" y="5" width="2" height="4" fill={D} />
          <rect x="7" y="7" width="4" height="2" fill={D} />
          <rect x="1" y="1" width="2" height="2" fill={D} />
          <rect x="13" y="1" width="2" height="2" fill={D} />
        </g>
      );
    case 'pill':
      return (
        <g>
          <rect x="2" y="5" width="12" height="6" fill={D} transform="rotate(0 8 8)" />
          <rect x="3" y="6" width="5" height="4" fill={L} />
          <rect x="8" y="6" width="5" height="4" fill={A} />
          <rect x="2" y="6" width="1" height="4" fill={D} />
          <rect x="13" y="6" width="1" height="4" fill={D} />
          <rect x="7" y="5" width="2" height="6" fill={D} />
        </g>
      );
    case 'skull':
      return (
        <g>
          <rect x="4" y="2" width="8" height="1" fill={D} />
          <rect x="3" y="3" width="10" height="8" fill={D} />
          <rect x="4" y="5" width="2" height="2" fill={L} />
          <rect x="10" y="5" width="2" height="2" fill={L} />
          <rect x="7" y="8" width="2" height="1" fill={L} />
          <rect x="4" y="11" width="2" height="1" fill={D} />
          <rect x="7" y="11" width="2" height="1" fill={D} />
          <rect x="10" y="11" width="2" height="1" fill={D} />
          <rect x="5" y="12" width="1" height="2" fill={D} />
          <rect x="7" y="12" width="2" height="2" fill={D} />
          <rect x="10" y="12" width="1" height="2" fill={D} />
        </g>
      );
    default:
      return null;
  }
}
