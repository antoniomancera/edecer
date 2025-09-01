import { compareArrays } from '../utils/compare-arrays.util';
import { mapArrayByProperty } from '../utils/map-array-by-property.util';
import { Category } from './category.model';
import { Level } from './level.model';
import { MoodWithTense } from './mood.interface';
import { PartSpeech } from './part-speech.interface';
import { Gender, Number, Person } from './person-gender-number.model';
import { Tense } from './tense.interface';

export interface Word {
  id: number;
  name: string;
  partSpeech: PartSpeech;
  level: Level;
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
