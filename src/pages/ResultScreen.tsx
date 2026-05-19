import { useRef, useState, useEffect, useMemo } from 'react';
import { computeResult } from '@/lib/quiz';
import { Answer } from '@/types/index';
import { Download, Link, RotateCcw, Check } from 'lucide-react';
import html2canvas from 'html2canvas';
import PixelHeaderArt from '@/components/PixelHeaderArt';
import AuditDashboard from '@/components/AuditDashboard';

type ResultScreenProps = {
  answers: Answer[];
  onRestart: () => void;
};

const WARNING_MESSAGES: Record<string, string[]> = {
  low: [
    '※ STATUS: SUSPICIOUSLY FUNCTIONAL.',
    '※ RECOMMEND: CONTINUE COPING STRATEGIES.',
    '※ NEXT AUDIT: 365 DAYS.',
  ],
  mid: [
    '※ CAUTION: GREMLIN ENERGY DETECTED.',
    '※ RECOMMEND: HYDRATE & CLOSE 4 TABS.',
    '※ NEXT AUDIT: 90 DAYS.',
  ],
  high: [
    '※ ALERT: CHRONICALLY ONLINE ENTITY.',
    '※ RECOMMEND: TOUCH GRASS IMMEDIATELY.',
    '※ NEXT AUDIT: 30 DAYS.',
  ],
  critical: [
    '※ WARNING: DO NOT DROP THIS USER IN REAL LIFE.',
    '※ HAZARD: PURE CORTISOL & SCREEN GLARE.',
    '※ THERAPY: NON-NEGOTIABLE. CALL NOW.',
  ],
};

export default function ResultScreen({ answers, onRestart }: ResultScreenProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  const compositionRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const result = useMemo(() => computeResult(answers), [answers]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const now = useMemo(() => new Date(), []);
  const dateStr = now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const receiptNo = useMemo(() => `#${Math.floor(Math.random() * 90000 + 10000)}`, []);

  const barcodeBars = useMemo<number[]>(() => {
    const arr: number[] = [];
    for (let i = 0; i < 72; i++) arr.push(Math.random() > 0.5 ? 1 : 0);
    return arr;
  }, []);

  const warningLines = WARNING_MESSAGES[result.warningTier] ?? WARNING_MESSAGES.critical;
  const isCritical = result.warningTier === 'critical' || result.warningTier === 'high';

  async function handleSaveImage(): Promise<void> {
    const target = compositionRef.current ?? receiptRef.current;
    if (!target) return;
    setSaving(true);
    try {
      const canvas = await html2canvas(target, {
        backgroundColor: '#e8dfc8',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = 'brain-rot-survivors-log.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'unknown';
      console.error('Save failed', msg);
    }
    setSaving(false);
  }

  function handleCopyLink(): void {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="parchment-bg min-h-screen flex flex-col items-center justify-start py-10 px-4 relative">
      <div className="noise-overlay" />

      {/* Header label */}
      <div
        className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div style={{ height: 1, width: 40, backgroundColor: '#1a1a1a' }} />
        <span className="font-pixel-soft text-[10px] tracking-widest" style={{ color: '#1a1a1a' }}>
          SURVIVOR'S LOG // READY
        </span>
        <div style={{ height: 1, width: 40, backgroundColor: '#1a1a1a' }} />
      </div>

      {/* ============ FULL COMPOSITION (captured for image) ============ */}
      <div
        ref={compositionRef}
        className={`w-full max-w-6xl transition-all duration-700 delay-100 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 px-2 py-4">

          {/* === LEFT: Receipt === */}
          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <div ref={receiptRef}>
              {/* Zigzag top */}
              <div className="receipt-zigzag-top" />

              {/* Receipt paper */}
              <div className="receipt-paper px-6 pt-6 pb-5">

                {/* === Pixel-art header === */}
                <div className="flex justify-center mb-3">
                  <div style={{ width: '85%' }}>
                    <PixelHeaderArt />
                  </div>
                </div>

                {/* Stylized title */}
                <div className="text-center mb-4">
                  <h1
                    className="font-pixel"
                    style={{
                      fontSize: '14px',
                      color: '#1a1a1a',
                      lineHeight: 1.35,
                      textShadow: '1px 1px 0 rgba(120,90,50,0.25)',
                    }}
                  >
                    BRAIN-ROT<br />APOCALYPSE
                  </h1>
                  <div
                    className="font-pixel-soft mt-2"
                    style={{ fontSize: '11px', color: '#1a1a1a', letterSpacing: '0.08em' }}
                  >
                    :: SURVIVOR'S LOG ::
                  </div>
                  <p className="font-receipt text-[11px] mt-2" style={{ color: '#6b6b6b' }}>
                    Filed under: Chronic Online Behavior
                  </p>
                </div>

                {/* Meta info */}
                <div
                  className="font-receipt text-xs mb-4 py-3"
                  style={{ borderTop: '1px dashed #8a7a5c', borderBottom: '1px dashed #8a7a5c', color: '#6b6b6b' }}
                >
                  <div className="flex justify-between">
                    <span>DATE: {dateStr}</span>
                    <span>TIME: {timeStr}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>LOG {receiptNo}</span>
                    <span>CASHIER: ALGORITHM</span>
                  </div>
                </div>

                {/* ===== PERSONALITY TYPE — TOP IDENTITY CARD ===== */}
                <div
                  className="mb-5"
                  style={{
                    border: '3px double #1a1a1a',
                    boxShadow: '4px 4px 0 rgba(120,90,50,0.5), inset 0 0 0 2px rgba(26,26,26,0.08)',
                    backgroundColor: '#1a1a1a',
                  }}
                >
                  {/* inner label bar */}
                  <div
                    className="font-pixel-soft text-center py-1 px-2"
                    style={{
                      fontSize: '9px',
                      color: '#c9a96e',
                      letterSpacing: '0.22em',
                      borderBottom: '1px solid rgba(201,169,110,0.35)',
                      background: 'rgba(255,255,255,0.04)',
                    }}
                  >
                    ▸ PERSONALITY TYPE IDENTIFIED ◂
                  </div>

                  <div className="px-4 pt-4 pb-5 text-center">
                    {/* Big bold type name */}
                    <div
                      className="font-pixel"
                      style={{
                        fontSize: '20px',
                        color: '#f4ecd8',
                        letterSpacing: '0.06em',
                        lineHeight: 1.35,
                        textShadow: '3px 3px 0 rgba(201,169,110,0.4)',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {result.type}
                    </div>

                    {/* Divider */}
                    <div
                      className="font-receipt mx-auto my-3"
                      style={{
                        color: '#c9a96e',
                        fontSize: '10px',
                        letterSpacing: '0.15em',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        opacity: 0.6,
                      }}
                    >
                      {'─ '.repeat(18)}
                    </div>

                    {/* Tagline */}
                    <div
                      className="font-receipt"
                      style={{
                        fontSize: '12px',
                        color: '#d9c9a6',
                        letterSpacing: '0.04em',
                        lineHeight: 1.55,
                        fontStyle: 'italic',
                      }}
                    >
                      {result.tagline}
                    </div>

                    {/* Status pill */}
                    <div className="flex justify-center mt-4">
                      <span
                        className="font-pixel-soft px-3 py-1"
                        style={{
                          fontSize: '9px',
                          color: '#1a1a1a',
                          background: '#c9a96e',
                          letterSpacing: '0.15em',
                          border: '1px solid rgba(201,169,110,0.6)',
                        }}
                      >
                        STATUS: {result.total}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Inventory section title */}
                <div className="text-center mb-3">
                  <h2
                    className="font-pixel"
                    style={{
                      fontSize: '10px',
                      color: '#1a1a1a',
                      letterSpacing: '0.05em',
                      textShadow: '1px 1px 0 rgba(120,90,50,0.2)',
                    }}
                  >
                    PERSONALITY INVENTORY
                  </h2>
                </div>

                {/* Column headers */}
                <div
                  className="font-receipt text-xs flex mb-2"
                  style={{ color: '#1a1a1a', fontWeight: 'bold', letterSpacing: '0.05em' }}
                >
                  <span style={{ flex: 1 }}>ITEM</span>
                  <span style={{ width: 36, textAlign: 'center' }}>QTY</span>
                  <span style={{ width: 80, textAlign: 'right' }}>SCORE</span>
                </div>

                {/* Divider */}
                <div
                  className="font-receipt text-xs mb-3"
                  style={{ color: '#8a7a5c', letterSpacing: '0.1em', overflow: 'hidden', whiteSpace: 'nowrap' }}
                >
                  {'- '.repeat(30)}
                </div>

                {/* Line items */}
                <div className="flex flex-col gap-1.5 mb-3">
                  {result.items.map((item, i) => (
                    <div key={i} className="font-receipt text-xs flex items-start">
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ marginRight: 3 }}>{item.emoji}</span>
                        <span style={{ color: '#1a1a1a' }}>{item.item}</span>
                      </div>
                      <span style={{ width: 36, textAlign: 'center', color: '#6b6b6b', flexShrink: 0 }}>{item.qty}</span>
                      <span
                        style={{ width: 80, textAlign: 'right', color: '#1a1a1a', fontWeight: 'bold', flexShrink: 0 }}
                      >
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Double divider */}
                <div
                  className="font-receipt text-xs mb-3"
                  style={{ color: '#8a7a5c', letterSpacing: '0.1em', overflow: 'hidden', whiteSpace: 'nowrap' }}
                >
                  {'= '.repeat(30)}
                </div>

                {/* ===== THERAPY GAUGE SUBTOTALS ===== */}
                <div className="font-receipt text-xs mb-1" style={{ color: '#6b6b6b' }}>
                  <div className="flex justify-between mb-1">
                    <span>SUBTOTAL:</span>
                    <span style={{ color: '#1a1a1a' }}>YOUR WHOLE LIFE</span>
                  </div>

                  {/* Therapy bar */}
                  <div className="mb-1">
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#6b6b6b', fontSize: '10px' }}>THERAPY NEEDED:</span>
                      <span
                        className="font-receipt"
                        style={{
                          color: isCritical ? '#1a1a1a' : '#6b6b6b',
                          fontSize: '10px',
                          fontWeight: isCritical ? 'bold' : 'normal',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {result.therapyBar} {result.therapyPct}%
                      </span>
                    </div>
                  </div>

                  {/* Audit score */}
                  <div className="flex justify-between mb-1">
                    <span style={{ color: '#6b6b6b' }}>AUDIT SCORE:</span>
                    <span
                      style={{
                        color: '#1a1a1a',
                        fontWeight: 'bold',
                        fontSize: '11px',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {result.auditScore.toLocaleString()} pts
                    </span>
                  </div>

                  {/* Therapy discount */}
                  <div className="flex justify-between mb-1">
                    <span>THERAPY DISCOUNT:</span>
                    <span
                      style={{
                        color: '#1a1a1a',
                        fontWeight: isCritical ? 'bold' : 'normal',
                        fontSize: isCritical ? '10px' : '11px',
                      }}
                    >
                      {result.therapyDiscount}
                    </span>
                  </div>

                  <div className="flex justify-between mt-1">
                    <span>SEROTONIN TAX:</span>
                    <span style={{ color: '#1a1a1a' }}>+∞</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>SLEEP PENALTY:</span>
                    <span style={{ color: '#1a1a1a' }}>NON-NEGOTIABLE</span>
                  </div>
                </div>

                {/* Footer divider */}
                <div
                  className="font-receipt text-xs my-4"
                  style={{ color: '#8a7a5c', letterSpacing: '0.1em', overflow: 'hidden', whiteSpace: 'nowrap' }}
                >
                  {'* '.repeat(30)}
                </div>

                {/* THANK YOU / Share CTA */}
                <div className="text-center mb-3">
                  <div
                    className="font-pixel"
                    style={{
                      fontSize: '20px',
                      color: '#1a1a1a',
                      letterSpacing: '0.08em',
                      textShadow: '2px 2px 0 rgba(120,90,50,0.3)',
                    }}
                  >
                    THANK YOU
                  </div>
                  <div
                    className="font-pixel-soft mt-2"
                    style={{ fontSize: '11px', color: '#1a1a1a', letterSpacing: '0.1em' }}
                  >
                    FOR YOUR DYSFUNCTION
                  </div>
                </div>

                <div className="text-center mb-5 py-3 px-2" style={{ border: '1.5px dashed #1a1a1a' }}>
                  <p
                    className="font-pixel-soft"
                    style={{ fontSize: '11px', color: '#1a1a1a', letterSpacing: '0.08em', lineHeight: 1.5 }}
                  >
                    ★ SHARE FOR 10% OFF<br />YOUR NEXT SPIRAL ★
                  </p>
                  <p
                    className="font-receipt text-[10px] mt-2"
                    style={{ color: '#6b6b6b', letterSpacing: '0.05em' }}
                  >
                    (ADDITIONAL 5% FOR TIKTOK SHARE)
                  </p>
                </div>

                {/* ===== WARNING FOOTER ===== */}
                <div
                  className="mb-5 px-3 py-3"
                  style={{
                    border: isCritical ? '2px solid #1a1a1a' : '1px dashed #8a7a5c',
                    background: isCritical ? 'rgba(26,26,26,0.06)' : 'transparent',
                  }}
                >
                  {isCritical && (
                    <div
                      className="font-receipt text-center mb-2"
                      style={{
                        fontSize: '9px',
                        color: '#1a1a1a',
                        letterSpacing: '0.18em',
                        fontWeight: 'bold',
                      }}
                    >
                      ▓▓▓ SYSTEM ALERT ▓▓▓
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    {warningLines.map((line, i) => (
                      <div
                        key={i}
                        className="font-receipt"
                        style={{
                          fontSize: '10px',
                          color: '#1a1a1a',
                          letterSpacing: '0.04em',
                          lineHeight: 1.5,
                          fontWeight: i === 0 && isCritical ? 'bold' : 'normal',
                        }}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Barcode */}
                <div className="flex flex-col items-center mb-1 mt-2">
                  <div className="flex items-end gap-px mb-2">
                    {barcodeBars.map((thick, i) => (
                      <div
                        key={i}
                        style={{
                          width: thick ? 4 : 2,
                          height: i % 7 === 0 ? 72 : i % 3 === 0 ? 60 : 48,
                          backgroundColor: '#1a1a1a',
                        }}
                      />
                    ))}
                  </div>
                  <p
                    className="font-receipt tracking-widest"
                    style={{ color: '#1a1a1a', fontSize: '11px', letterSpacing: '0.15em' }}
                  >
                    {receiptNo} :: BRAIN-ROT-MART :: 2025
                  </p>
                  <p
                    className="font-pixel-soft mt-1"
                    style={{ color: '#1a1a1a', fontSize: '9px', letterSpacing: '0.2em' }}
                  >
                    — END OF LOG —
                  </p>
                </div>
              </div>

              {/* Zigzag bottom */}
              <div className="receipt-zigzag-bottom" />
            </div>
          </div>

          {/* === RIGHT: Audit dashboard === */}
          <div className="w-full max-w-sm mx-auto lg:mx-0 lg:w-[400px]">
            <AuditDashboard answers={answers} result={result} />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div
        className={`w-full max-w-sm mt-8 flex flex-col gap-3 transition-all duration-700 delay-300 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <button
          className="btn-primary flex items-center justify-center gap-3"
          onClick={handleSaveImage}
          disabled={saving}
        >
          <Download size={15} />
          {saving ? 'SAVING...' : 'SAVE AS IMAGE'}
        </button>

        <button
          className="btn-secondary flex items-center justify-center gap-3"
          onClick={handleCopyLink}
        >
          {copied ? <Check size={15} /> : <Link size={15} />}
          {copied ? 'LINK COPIED!' : 'COPY LINK TO SHARE'}
        </button>

        <button
          className="flex items-center justify-center gap-2 w-full py-3"
          onClick={onRestart}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#6b6b6b',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '13px',
            letterSpacing: '0.05em',
          }}
        >
          <RotateCcw size={13} />
          Retake Quiz
        </button>
      </div>

      {/* Bottom note */}
      <p
        className={`font-receipt text-xs text-center mt-8 transition-all duration-700 delay-500 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ color: '#8a7a5c', maxWidth: 280 }}
      >
        results are 100% accurate. no refunds. no therapy. just vibes.
      </p>
    </div>
  );
}
