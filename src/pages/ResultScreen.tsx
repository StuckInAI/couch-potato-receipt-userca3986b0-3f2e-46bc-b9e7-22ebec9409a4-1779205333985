import { useRef, useState, useEffect } from 'react';
import { computeResult } from '@/lib/quiz';
import { Answer } from '@/types/index';
import { Download, Link, RotateCcw, Check } from 'lucide-react';
import html2canvas from 'html2canvas';

type ResultScreenProps = {
  answers: Answer[];
  onRestart: () => void;
};

export default function ResultScreen({ answers, onRestart }: ResultScreenProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [visible, setVisible] = useState(false);
  const result = computeResult(answers);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const receiptNo = `#${Math.floor(Math.random() * 90000 + 10000)}`;

  async function handleSaveImage() {
    if (!receiptRef.current) return;
    setSaving(true);
    try {
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: '#fafaf8',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = 'my-dopamine-receipt.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e: any) {
      console.error('Save failed', e.message);
    }
    setSaving(false);
  }

  function handleCopyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const barcodeBars: number[] = [];
  for (let i = 0; i < 60; i++) {
    barcodeBars.push(Math.random() > 0.5 ? 1 : 0);
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start py-16 px-4"
      style={{ backgroundColor: '#f5f2eb' }}
    >
      <div className="noise-overlay" />

      {/* Header label */}
      <div
        className={`flex items-center gap-3 mb-8 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div style={{ height: 1, width: 40, backgroundColor: '#1a1a1a' }} />
        <span className="font-receipt text-xs tracking-widest" style={{ color: '#1a1a1a' }}>
          YOUR RECEIPT IS READY
        </span>
        <div style={{ height: 1, width: 40, backgroundColor: '#1a1a1a' }} />
      </div>

      {/* Receipt Container */}
      <div
        className={`w-full max-w-sm transition-all duration-700 delay-100 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div ref={receiptRef}>
          {/* Zigzag top */}
          <div className="receipt-zigzag-top" />

          {/* Receipt paper */}
          <div className="receipt-paper px-6 pt-6 pb-5" style={{ backgroundColor: '#fafaf8' }}>
            {/* Store name */}
            <div className="text-center mb-4">
              <p className="font-receipt text-xs tracking-widest mb-1" style={{ color: '#6b6b6b' }}>
                ★ DOPAMINE MART ★
              </p>
              <h2
                className="font-receipt tracking-widest"
                style={{ fontSize: '18px', color: '#1a1a1a', fontWeight: 'bold' }}
              >
                COUCH-POTATO RECEIPT
              </h2>
              <p className="font-receipt text-xs mt-1" style={{ color: '#6b6b6b' }}>
                Est. When Netflix Invented Autoplay
              </p>
            </div>

            {/* Meta info */}
            <div
              className="font-receipt text-xs mb-4 py-3"
              style={{ borderTop: '1px dashed #aaa', borderBottom: '1px dashed #aaa', color: '#6b6b6b' }}
            >
              <div className="flex justify-between">
                <span>DATE: {dateStr}</span>
                <span>TIME: {timeStr}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>RECEIPT {receiptNo}</span>
                <span>CASHIER: ALGORITHM</span>
              </div>
            </div>

            {/* Column headers */}
            <div
              className="font-receipt text-xs flex mb-2"
              style={{ color: '#1a1a1a', fontWeight: 'bold', letterSpacing: '0.05em' }}
            >
              <span style={{ flex: 1 }}>ITEM</span>
              <span style={{ width: 32, textAlign: 'center' }}>QTY</span>
              <span style={{ width: 72, textAlign: 'right' }}>SCORE</span>
            </div>

            {/* Divider */}
            <div
              className="font-receipt text-xs mb-3"
              style={{ color: '#aaa', letterSpacing: '0.1em', overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              {'- '.repeat(30)}
            </div>

            {/* Line items */}
            <div className="flex flex-col gap-2 mb-3">
              {result.items.map((item, i) => (
                <div key={i} className="font-receipt text-xs flex items-start">
                  <div style={{ flex: 1 }}>
                    <span style={{ marginRight: 4 }}>{item.emoji}</span>
                    <span style={{ color: '#1a1a1a' }}>{item.item}</span>
                  </div>
                  <span style={{ width: 32, textAlign: 'center', color: '#6b6b6b' }}>{item.qty}</span>
                  <span
                    style={{ width: 72, textAlign: 'right', color: '#1a1a1a', fontWeight: 'bold' }}
                  >
                    {item.price}
                  </span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div
              className="font-receipt text-xs mb-3"
              style={{ color: '#aaa', letterSpacing: '0.1em', overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              {'= '.repeat(30)}
            </div>

            {/* Subtotals */}
            <div className="font-receipt text-xs mb-3" style={{ color: '#6b6b6b' }}>
              <div className="flex justify-between">
                <span>SUBTOTAL:</span>
                <span style={{ color: '#1a1a1a' }}>YOUR WHOLE LIFE</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>THERAPY DISCOUNT:</span>
                <span style={{ color: '#1a1a1a' }}>-$0.00</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>SEROTONIN TAX:</span>
                <span style={{ color: '#1a1a1a' }}>+∞</span>
              </div>
            </div>

            {/* Total / Personality type */}
            <div
              className="py-3 px-1 mb-4"
              style={{ backgroundColor: '#1a1a1a' }}
            >
              <div className="font-receipt text-xs text-center mb-1" style={{ color: '#c9a96e' }}>
                PERSONALITY TYPE:
              </div>
              <div
                className="font-receipt text-center"
                style={{ fontSize: '16px', color: '#fafaf8', letterSpacing: '0.08em', fontWeight: 'bold' }}
              >
                {result.type}
              </div>
              <div className="font-receipt text-xs text-center mt-1" style={{ color: '#aaa' }}>
                {result.tagline}
              </div>
            </div>

            {/* Status */}
            <div
              className="font-receipt text-xs text-center mb-4 py-2"
              style={{ border: '1px solid #1a1a1a', color: '#1a1a1a', letterSpacing: '0.1em' }}
            >
              OVERALL STATUS: {result.total}
            </div>

            {/* Divider */}
            <div
              className="font-receipt text-xs mb-4"
              style={{ color: '#aaa', letterSpacing: '0.1em', overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              {'- '.repeat(30)}
            </div>

            {/* Footer messages */}
            <div className="font-receipt text-xs text-center mb-5" style={{ color: '#6b6b6b' }}>
              <p>Thank you for your dysfunction!</p>
              <p className="mt-1">Please come again (you will).</p>
              <p className="mt-1" style={{ color: '#c9a96e' }}>★ SHARE FOR 10% OFF YOUR NEXT SPIRAL ★</p>
            </div>

            {/* Barcode */}
            <div className="flex flex-col items-center mb-2">
              <div className="flex items-end gap-px mb-1">
                {barcodeBars.map((thick, i) => (
                  <div
                    key={i}
                    style={{
                      width: thick ? 3 : 1,
                      height: i % 7 === 0 ? 42 : i % 3 === 0 ? 36 : 28,
                      backgroundColor: '#1a1a1a',
                    }}
                  />
                ))}
              </div>
              <p className="font-receipt text-xs tracking-widest" style={{ color: '#1a1a1a', fontSize: '9px' }}>
                {receiptNo} DOPAMINE-MART 2025
              </p>
            </div>
          </div>

          {/* Zigzag bottom */}
          <div className="receipt-zigzag-bottom" />
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
        style={{ color: '#aaa', maxWidth: 280 }}
      >
        results are 100% accurate. no refunds. no therapy. just vibes.
      </p>
    </div>
  );
}
