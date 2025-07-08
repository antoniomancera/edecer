import { Language } from './language.interface';
import { Mood } from './mood.interface';

export interface Tense {
  mood: Mood;
  language: Language;
  tenseEnum: string;
  name: string;
}
