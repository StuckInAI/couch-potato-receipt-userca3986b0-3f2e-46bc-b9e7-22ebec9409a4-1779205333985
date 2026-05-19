import { Question, Answer, PersonalityResult, ReceiptItem } from '@/types/index';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "How many hours of screen time do you average per day?",
    emoji: "📱",
    options: [
      { label: "1-2 hrs — I actually touch grass", value: 1 },
      { label: "3-4 hrs — healthy-ish", value: 2 },
      { label: "5-7 hrs — classic millennial", value: 3 },
      { label: "8+ hrs — the screen is my home", value: 4 },
    ],
  },
  {
    id: 2,
    text: "How do you handle unread texts?",
    emoji: "💬",
    options: [
      { label: "Reply immediately, I have anxiety", value: 1 },
      { label: "Reply within the hour like a normal person", value: 2 },
      { label: "'Seen' it 3 days ago, drafting a reply", value: 3 },
      { label: "What texts? I don't check my phone", value: 4 },
    ],
  },
  {
    id: 3,
    text: "Describe your last impulsive purchase.",
    emoji: "🛍️",
    options: [
      { label: "A book I'll definitely read someday", value: 1 },
      { label: "Skin care I don't need but deserve", value: 2 },
      { label: "A gadget from a 3AM TikTok ad", value: 3 },
      { label: "A flight I haven't told anyone about yet", value: 4 },
    ],
  },
  {
    id: 4,
    text: "Pick your typical Saturday vibe:",
    emoji: "🛋️",
    options: [
      { label: "Up at 7AM, gym, meal prep, adulting", value: 1 },
      { label: "Brunch with friends, iced coffee, errands", value: 2 },
      { label: "Woke up at noon, TikTok spiral until 5PM", value: 3 },
      { label: "Left bed once. For snacks. Regret nothing.", value: 4 },
    ],
  },
  {
    id: 5,
    text: "How do you consume content?",
    emoji: "🎬",
    options: [
      { label: "One thing at a time, mindfully", value: 1 },
      { label: "Background noise while doing other stuff", value: 2 },
      { label: "5 tabs, 2 podcasts, 1 show — multitasking", value: 3 },
      { label: "Doom-scrolling through 4 apps simultaneously", value: 4 },
    ],
  },
];

function calcScore(answers: Answer[]): number {
  return answers.reduce((sum, a) => sum + a.value, 0);
}

export function computeResult(answers: Answer[]): PersonalityResult {
  const score = calcScore(answers);
  const screenAns = answers.find(a => a.questionId === 1);
  const textAns = answers.find(a => a.questionId === 2);
  const buyAns = answers.find(a => a.questionId === 3);
  const satAns = answers.find(a => a.questionId === 4);
  const contentAns = answers.find(a => a.questionId === 5);

  const screenPct = screenAns ? Math.min(99, screenAns.value * 22 + 11) : 55;
  const ghostPct = textAns ? Math.min(99, textAns.value * 23 + 7) : 60;
  const spendAmt = buyAns ? [4900, 35000, 99000, 250000][buyAns.value - 1] : 50000;
  const couchPct = satAns ? Math.min(99, satAns.value * 24 + 2) : 72;
  const rotPct = contentAns ? Math.min(99, contentAns.value * 23 + 5) : 78;

  const items: ReceiptItem[] = [
    {
      item: "Brain-rot Scrolling",
      qty: `${screenAns ? screenAns.value * 2 + 1 : 5}x`,
      price: `${screenPct}%`,
      emoji: "📱",
    },
    {
      item: "Unnecessary Spending",
      qty: `${buyAns ? buyAns.value : 3}x`,
      price: `$${spendAmt.toLocaleString()}`,
      emoji: "💸",
    },
    {
      item: "Ghosting Friends",
      qty: `${textAns ? textAns.value : 2}x`,
      price: `${ghostPct}%`,
      emoji: "👻",
    },
    {
      item: "Couch Residency",
      qty: `${satAns ? satAns.value : 3}x`,
      price: `${couchPct}%`,
      emoji: "🛋️",
    },
    {
      item: "Multi-Tab Chaos",
      qty: `${contentAns ? contentAns.value : 2}x`,
      price: `${rotPct}%`,
      emoji: "🌀",
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
