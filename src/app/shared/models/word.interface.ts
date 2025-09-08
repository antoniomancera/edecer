import { Category } from './category.model';
import { Language } from './language.interface';
import { Level } from './level.model';
import { PartSpeech } from './part-speech.interface';

export interface Word {
  id: number;
  name: string;
  partSpeech: PartSpeech;
  level: Level;
  language: Language;
  isChecked?: boolean;
  isLoading?: boolean;
  color?: string;
}

export interface WordSense {
  id: number;
  word?: Word;
  sense: string;
  isChecked?: boolean;
  globalIndex?: number;
}

export interface WordWithAttemptsAndSuccess {
  word: Word;
  attempts: number;
  success: number;
  wordSenseInfoWithoutWord?: WordSenseInfoWithoutWord[];
}

export interface WordSenseInfoWithoutWord {
  wordSense: WordSense;
  attempts: number;
  success: number;
  categories: Category[];
}
