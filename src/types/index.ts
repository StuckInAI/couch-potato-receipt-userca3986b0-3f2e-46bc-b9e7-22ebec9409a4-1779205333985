export type Answer = {
  questionId: number;
  optionIndex: number;
  value: number;
};

export type Question = {
  id: number;
  text: string;
  emoji: string;
  options: {
    label: string;
    value: number;
  }[];
};

export type ReceiptItem = {
  item: string;
  qty: string;
  price: string;
  emoji: string;
};

export type WarningTier = 'low' | 'mid' | 'high' | 'critical';

export type PersonalityResult = {
  type: string;
  tagline: string;
  items: ReceiptItem[];
  total: string;
  auditScore: number;
  therapyPct: number;
  therapyBar: string;
  therapyDiscount: string;
  warningTier: WarningTier;
};
