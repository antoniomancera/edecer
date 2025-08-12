import { Language } from './language.interface';
import { Mood } from './mood.interface';

export interface Tense {
  mood: Mood;
  language: Language;
  code: string;
  name: string;
}

export interface TenseWithoutMood {
  language: Language;
  code: string;
  name: string;
  globalIndex?: number;
  isChecked?: boolean;
}
