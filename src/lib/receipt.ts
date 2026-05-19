import { Answer, PersonalityResult } from '@/types/index';
import { computeResult } from '@/lib/quiz';

export function computeReceipt(answers: Answer[]): PersonalityResult {
  return computeResult(answers);
}

export function nowReceiptDate(): { dateStr: string; timeStr: string } {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  return { dateStr, timeStr };
}
