import { useState, useEffect } from 'react';
import { QUESTIONS } from '@/lib/quiz';
import { Answer } from '@/types/index';
import clsx from 'clsx';

type QuizScreenProps = {
  onComplete: (answers: Answer[]) => void;
};

export default function QuizScreen({ onComplete }: QuizScreenProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const [visible, setVisible] = useState(false);

  const question = QUESTIONS[currentIdx];
  const progress = (currentIdx / QUESTIONS.length) * 100;

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, [currentIdx]);

  function handleSelect(optionIndex: number, value: number) {
    setSelected(optionIndex);
    const newAnswer: Answer = { questionId: question.id, optionIndex, value };

    setTimeout(() => {
      const updated = [...answers, newAnswer];
      setFading(true);

      setTimeout(() => {
        if (currentIdx + 1 >= QUESTIONS.length) {
          onComplete(updated);
        } else {
          setAnswers(updated);
          setCurrentIdx(i => i + 1);
          setSelected(null);
          setFading(false);
        }
      }, 350);
    }, 300);
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ backgroundColor: '#f5f2eb' }}
    >
      <div className="noise-overlay" />

      {/* Header */}
      <div className="w-full max-w-md mb-10">
        <div className="flex items-center justify-between mb-3">
          <span className="font-receipt text-xs tracking-widest" style={{ color: '#6b6b6b' }}>
            RECEIPT IN PROGRESS
          </span>
          <span className="font-receipt text-xs" style={{ color: '#1a1a1a' }}>
            {currentIdx + 1} / {QUESTIONS.length}
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="w-full rounded-none overflow-hidden"
          style={{ height: 3, backgroundColor: '#d4d0c8' }}
        >
          <div
            className="h-full progress-bar-fill"
            style={{ width: `${progress}%`, backgroundColor: '#1a1a1a' }}
          />
        </div>

        {/* Step dots — scrollable row so all 12 fit */}
        <div className="flex gap-1.5 mt-3 justify-center overflow-x-auto pb-1">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: i === currentIdx ? 18 : 6,
                height: 6,
                backgroundColor: i < currentIdx ? '#c9a96e' : i === currentIdx ? '#1a1a1a' : '#d4d0c8',
                transition: 'all 0.3s ease',
                borderRadius: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Question card */}
      <div
        className="w-full max-w-md"
        style={{
          opacity: fading ? 0 : visible ? 1 : 0,
          transform: fading ? 'translateY(-12px)' : visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}
      >
        {/* Question number badge */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="font-receipt text-xs px-2 py-1"
            style={{ backgroundColor: '#1a1a1a', color: '#c9a96e' }}
          >
            Q{question.id.toString().padStart(2, '0')}
          </div>
          <div style={{ flex: 1, height: 1, backgroundColor: '#d4d0c8' }} />
        </div>

        {/* Question text */}
        <div className="mb-7">
          <span className="text-3xl mb-3 block">{question.emoji}</span>
          <h2
            className="font-sans-app leading-snug"
            style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 600, color: '#1a1a1a' }}
          >
            {question.text}
          </h2>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {question.options.map((opt, i) => (
            <button
              key={i}
              className={clsx('option-btn', selected === i && 'selected')}
              onClick={() => handleSelect(i, opt.value)}
              disabled={selected !== null}
            >
              <span
                className="font-receipt text-xs mr-3"
                style={{ color: selected === i ? '#c9a96e' : '#aaa' }}
              >
                {String.fromCharCode(65 + i)}
              </span>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Decorative receipt tear at bottom */}
      <div className="w-full max-w-md mt-12">
        <div
          className="font-receipt text-xs text-center py-2"
          style={{ color: '#aaa', letterSpacing: '0.15em' }}
        >
          - - - - - - - - - - - - - - - - - - - - - - - - - -
        </div>
      </div>
    </div>
  );
}
