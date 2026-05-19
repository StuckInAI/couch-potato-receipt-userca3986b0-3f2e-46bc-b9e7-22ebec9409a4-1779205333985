import { Answer, PersonalityResult, ReceiptItem } from '@/types/index';

export function computeReceipt(answers: Answer[]): PersonalityResult {
  const screenAns = answers.find(a => a.questionId === 1);
  const textAns = answers.find(a => a.questionId === 2);
  const buyAns = answers.find(a => a.questionId === 3);
  const satAns = answers.find(a => a.questionId === 4);
  const contentAns = answers.find(a => a.questionId === 5);

  const score = answers.reduce((sum, a) => sum + a.value, 0);

  const screenPct = screenAns ? Math.min(99, screenAns.value * 22 + 11) : 55;
  const ghostPct = textAns ? Math.min(99, textAns.value * 23 + 7) : 60;
  const spendAmt = buyAns ? [4900, 35000, 99000, 250000][buyAns.value - 1] : 50000;
  const couchPct = satAns ? Math.min(99, satAns.value * 24 + 2) : 72;
  const rotPct = contentAns ? Math.min(99, contentAns.value * 23 + 5) : 78;

  const items: ReceiptItem[] = [
    {
      item: 'Brain-rot Scrolling',
      qty: `${screenAns ? screenAns.value * 2 + 1 : 5}x`,
      price: `${screenPct}%`,
      emoji: '📱',
    },
    {
      item: 'Unnecessary Spending',
      qty: `${buyAns ? buyAns.value : 3}x`,
      price: `$${spendAmt.toLocaleString()}`,
      emoji: '💸',
    },
    {
      item: 'Ghosting Friends',
      qty: `${textAns ? textAns.value : 2}x`,
      price: `${ghostPct}%`,
      emoji: '👻',
    },
    {
      item: 'Couch Residency',
      qty: `${satAns ? satAns.value : 3}x`,
      price: `${couchPct}%`,
      emoji: '🛋️',
    },
    {
      item: 'Multi-Tab Chaos',
      qty: `${contentAns ? contentAns.value : 2}x`,
      price: `${rotPct}%`,
      emoji: '🌀',
    },
  ];

  let type = '';
  let tagline = '';
  let total = '';

  if (score <= 8) {
    type = 'THE BALANCED BEAN';
    tagline = 'Somehow thriving. Suspicious but we respect it.';
    total = 'NET POSITIVE';
  } else if (score <= 12) {
    type = 'THE SOFT GREMLIN';
    tagline = 'Functioning adult by day, chaos goblin by night.';
    total = 'CHAOTIC NEUTRAL';
  } else if (score <= 16) {
    type = 'THE COUCH CRYPTID';
    tagline = 'Sighted occasionally. Leaves only for snacks.';
    total = 'CHRONICALLY ONLINE';
  } else {
    type = 'THE DOPAMINE GOBLIN';
    tagline = 'Running purely on cortisol and TikTok. No notes.';
    total = 'MAXIMUM ROTTING';
  }

  return { type, tagline, items, total };
}

export function nowReceiptDate(): { dateStr: string; timeStr: string } {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  return { dateStr, timeStr };
}
