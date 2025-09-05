import { Language } from './language.interface';

export interface Course {
  baseLanguage: Language;
  targetLanguage: Language;
  code: string;
}
