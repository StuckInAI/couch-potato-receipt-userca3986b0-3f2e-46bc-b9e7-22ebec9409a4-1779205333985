import { Question, Answer, PersonalityResult, ReceiptItem } from '@/types/index';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "How many hours of screen time do you average per day?",
    emoji: "📱",
    options: [
      { label: "1-2 hrs — I actually touch grass", value: 1 },
      { label: "3-4 hrs — healthy-ish, allegedly", value: 2 },
      { label: "5-7 hrs — classic millennial cope", value: 3 },
      { label: "8+ hrs — the screen IS my home", value: 4 },
    ],
  },
  {
    id: 2,
    text: "How do you handle unread texts?",
    emoji: "💬",
    options: [
      { label: "Reply immediately — I have anxiety", value: 1 },
      { label: "Within the hour like a normal person", value: 2 },
      { label: "'Seen' it 3 days ago, drafting a reply", value: 3 },
      { label: "I have 847 unread. They know I'm alive.", value: 4 },
    ],
  },
  {
    id: 3,
    text: "Describe your last impulsive purchase.",
    emoji: "🛍️",
    options: [
      { label: "A book I'll definitely read someday", value: 1 },
      { label: "Skincare I don't need but spiritually deserve", value: 2 },
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
      { label: "Brunch, iced coffee, light errands", value: 2 },
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
      { label: "Background noise while adulting", value: 2 },
      { label: "5 tabs, 2 podcasts, 1 show — multitasking king", value: 3 },
      { label: "Doom-scrolling all 4 apps simultaneously", value: 4 },
    ],
  },
  {
    id: 6,
    text: "How deep does your nostalgia binge go?",
    emoji: "👾",
    options: [
      { label: "I live in the present, king", value: 1 },
      { label: "Rewatched one comfort show this year", value: 2 },
      { label: "Currently on my 4th full re-run of The Office", value: 3 },
      { label: "My Spotify is 100% songs from middle school", value: 4 },
    ],
  },
  {
    id: 7,
    text: "How often do you doom-scroll without meaning to?",
    emoji: "🕳️",
    options: [
      { label: "Rarely — I have a phone schedule", value: 1 },
      { label: "Once or twice a week, briefly", value: 2 },
      { label: "Every evening, minimum 2 hours", value: 3 },
      { label: "I open TikTok and wake up 4 hours later", value: 4 },
    ],
  },
  {
    id: 8,
    text: "Your unread notification count right now is...",
    emoji: "🔔",
    options: [
      { label: "0 — I am one with the inbox zero", value: 1 },
      { label: "Under 20, manageable", value: 2 },
      { label: "In the hundreds, I'll deal with it eventually", value: 3 },
      { label: "The number has 4+ digits. It's a lifestyle.", value: 4 },
    ],
  },
  {
    id: 9,
    text: "Spontaneous cart add-ons: your style is...",
    emoji: "🛒",
    options: [
      { label: "I stick to the list like a responsible adult", value: 1 },
      { label: "One small treat if it's on sale", value: 2 },
      { label: "The algorithm knows me better than I know myself", value: 3 },
      { label: "My cart has 27 items. I came for shampoo.", value: 4 },
    ],
  },
  {
    id: 10,
    text: "What's your relationship with lo-fi music loops?",
    emoji: "🎵",
    options: [
      { label: "Never listened, I prefer silence", value: 1 },
      { label: "Occasionally while studying", value: 2 },
      { label: "Same playlist on loop for the past 6 months", value: 3 },
      { label: "It's the only constant in my chaotic life", value: 4 },
    ],
  },
  {
    id: 11,
    text: "Describe your sleep schedule:",
    emoji: "💤",
    options: [
      { label: "Asleep by 10PM, 8 hours, like a person", value: 1 },
      { label: "Midnight-ish, 6-7 hrs, survivable", value: 2 },
      { label: "2AM because 'one more episode'", value: 3 },
      { label: "Sleep is a suggestion I routinely ignore", value: 4 },
    ],
  },
  {
    id: 12,
    text: "How do you feel reading this quiz right now?",
    emoji: "🧾",
    options: [
      { label: "Called out but thriving", value: 1 },
      { label: "Mildly attacked but in good fun", value: 2 },
      { label: "This is a personal attack and I accept it", value: 3 },
      { label: "My therapist will be hearing about this", value: 4 },
    ],
  },
];

function calcScore(answers: Answer[]): number {
  return answers.reduce((sum, a) => sum + a.value, 0);
}

export function computeResult(answers: Answer[]): PersonalityResult {
  const score = calcScore(answers);

  const get = (id: number): number => {
    const a = answers.find(x => x.questionId === id);
    return a ? a.value : 2;
  };

  const screen    = get(1);
  const text      = get(2);
  const buy       = get(3);
  const sat       = get(4);
  const content   = get(5);
  const nostalgia = get(6);
  const doom      = get(7);
  const notifs    = get(8);
  const cart      = get(9);
  const lofi      = get(10);
  const sleep     = get(11);
  const meta      = get(12);

  // Original 5
  const screenPct = Math.min(99, screen * 22 + 11);
  const ghostPct  = Math.min(99, text * 23 + 7);
  const spendAmt  = [4900, 35000, 99000, 250000][buy - 1] ?? 50000;
  const couchPct  = Math.min(99, sat * 24 + 2);
  const rotPct    = Math.min(99, content * 23 + 5);

  // New 7
  const nostalgiaPct = Math.min(99, nostalgia * 22 + 4);
  const doomPct      = Math.min(99, doom * 23 + 8);
  const notifCount   = [0, 47, 312, 1847][notifs - 1] ?? 300;
  const cartAmt      = [0, 120, 4800, 18750][cart - 1] ?? 4800;
  const lofiPct      = Math.min(99, lofi * 22 + 14);
  const sleepHrs     = [8, 6, 4, 0][sleep - 1] ?? 5;
  const sleepPct     = Math.min(99, sleep * 24 + 2);
  const selfAwarePct = Math.min(99, meta * 22 + 16);

  const items: ReceiptItem[] = [
    {
      item: 'Brain-rot Scrolling',
      qty: `${screen * 2 + 1}x`,
      price: `${screenPct}%`,
      emoji: '📱',
    },
    {
      item: 'Unnecessary Spending',
      qty: `${buy}x`,
      price: `$${spendAmt.toLocaleString()}`,
      emoji: '💸',
    },
    {
      item: 'Ghosting Friends',
      qty: `${text}x`,
      price: `${ghostPct}%`,
      emoji: '👻',
    },
    {
      item: 'Couch Residency',
      qty: `${sat}x`,
      price: `${couchPct}%`,
      emoji: '🛋️',
    },
    {
      item: 'Multi-Tab Chaos',
      qty: `${content}x`,
      price: `${rotPct}%`,
      emoji: '🌀',
    },
    {
      item: 'Nostalgia Binge',
      qty: `${nostalgia + 1}x`,
      price: `${nostalgiaPct}%`,
      emoji: '👾',
    },
    {
      item: 'Impulsive Doom-Scroll',
      qty: `${doom * 2}x`,
      price: `${doomPct}%`,
      emoji: '🕳️',
    },
    {
      item: 'Unread Msg Hoarding',
      qty: `${notifCount}`,
      price: `${notifs * 23}%`,
      emoji: '🔔',
    },
    {
      item: 'Spontaneous Cart Add-ons',
      qty: `${cart * 3 - 1}x`,
      price: `$${cartAmt.toLocaleString()}`,
      emoji: '🛒',
    },
    {
      item: 'Lo-Fi Loop Consumption',
      qty: `∞`,
      price: `${lofiPct}%`,
      emoji: '🎵',
    },
    {
      item: 'Depraved Sleep-Sched.',
      qty: `${sleepHrs} hrs`,
      price: `${sleepPct}% CRIT`,
      emoji: '💤',
    },
    {
      item: 'Self-Awareness Score',
      qty: `${meta}x`,
      price: `${selfAwarePct}%`,
      emoji: '🧾',
    },
  ];

  let type = '';
  let tagline = '';
  let total = '';

  if (score <= 18) {
    type = 'THE BALANCED BEAN';
    tagline = 'Somehow thriving. Suspicious but we respect it.';
    total = 'NET POSITIVE';
  } else if (score <= 28) {
    type = 'THE SOFT GREMLIN';
    tagline = 'Functioning adult by day, chaos goblin by night.';
    total = 'CHAOTIC NEUTRAL';
  } else if (score <= 36) {
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
