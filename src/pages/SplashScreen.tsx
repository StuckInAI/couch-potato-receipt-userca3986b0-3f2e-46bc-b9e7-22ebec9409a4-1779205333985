import { useEffect, useState } from 'react';
import { Receipt, Sparkles, Zap } from 'lucide-react';

type SplashScreenProps = {
  onStart: () => void;
};

export default function SplashScreen({ onStart }: SplashScreenProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const tickerText = '✦ DOPAMINE RECEIPT ✦ PERSONALITY AUDIT ✦ BRAIN-ROT CERTIFIED ✦ COUCH POTATO ANALYSIS ✦ VIBE CHECK ✦ ';

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: '#f5f2eb' }}
    >
      <div className="noise-overlay" />

      {/* Top ticker */}
      <div
        className="fixed top-0 left-0 right-0 z-50 overflow-hidden py-2"
        style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid #333' }}
      >
        <div className="flex whitespace-nowrap animate-ticker">
          {[tickerText, tickerText].map((t, i) => (
            <span key={i} className="font-receipt text-xs tracking-widest px-2" style={{ color: '#c9a96e' }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div
        className={`flex flex-col items-center text-center px-6 max-w-lg transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ paddingTop: '60px' }}
      >
        {/* Badge */}
        <div
          className="flex items-center gap-2 px-4 py-1.5 mb-8 font-receipt text-xs tracking-widest"
          style={{
            border: '1px solid #1a1a1a',
            backgroundColor: 'transparent',
            color: '#1a1a1a',
          }}
        >
          <Sparkles size={12} />
          <span>LIMITED EDITION DROP</span>
          <Sparkles size={12} />
        </div>

        {/* Receipt icon */}
        <div className="relative mb-6">
          <div
            className="w-20 h-20 flex items-center justify-center"
            style={{ backgroundColor: '#1a1a1a' }}
          >
            <Receipt size={36} color="#f5f2eb" />
          </div>
          <div
            className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center"
            style={{ backgroundColor: '#c9a96e' }}
          >
            <Zap size={11} color="#1a1a1a" />
          </div>
        </div>

        {/* Title */}
        <h1
          className="font-sans-app mb-3 leading-tight"
          style={{
            fontSize: 'clamp(28px, 6vw, 48px)',
            fontWeight: 700,
            color: '#1a1a1a',
            letterSpacing: '-0.02em',
          }}
        >
          My Couch-Potato<br />
          <span style={{ color: '#c9a96e' }}>Dopamine Receipt</span>
        </h1>

        {/* Divider */}
        <div className="flex items-center gap-3 w-full max-w-xs mb-5">
          <div style={{ flex: 1, height: 1, backgroundColor: '#1a1a1a' }} />
          <span className="font-receipt text-xs" style={{ color: '#6b6b6b' }}>✦</span>
          <div style={{ flex: 1, height: 1, backgroundColor: '#1a1a1a' }} />
        </div>

        {/* Description */}
        <p
          className="font-sans-app mb-10 leading-relaxed"
          style={{ fontSize: '15px', color: '#6b6b6b', maxWidth: '340px' }}
        >
          Find out your dopamine spending habits and personal lifestyle itemized on a receipt!
        </p>

        {/* CTA Button */}
        <button
          className="btn-primary mb-4 w-full max-w-xs"
          onClick={onStart}
          style={{ fontSize: '13px', letterSpacing: '0.1em' }}
        >
          ✦ Generate My Receipt ✦
        </button>

        <p className="font-receipt text-xs" style={{ color: '#aaa' }}>
          takes ~2 minutes · no email required
        </p>

        {/* Decorative bottom bar */}
        <div className="flex gap-1 mt-12">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: i % 3 === 0 ? 16 : i % 2 === 0 ? 10 : 6,
                backgroundColor: i % 4 === 0 ? '#c9a96e' : '#1a1a1a',
                opacity: 0.15 + (i % 5) * 0.08,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom ticker */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 overflow-hidden py-2"
        style={{ backgroundColor: '#1a1a1a', borderTop: '1px solid #333' }}
      >
        <div className="flex whitespace-nowrap" style={{ animation: 'ticker 20s linear infinite reverse' }}>
          {[tickerText, tickerText].map((t, i) => (
            <span key={i} className="font-receipt text-xs tracking-widest px-2" style={{ color: '#f5f2eb', opacity: 0.5 }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
