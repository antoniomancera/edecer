import { Category } from './category.model';
import { Level } from './level.model';
import { MoodWithTense } from './mood.interface';
import { Gender, Number, Person } from './person-gender-number.model';
import { Tense } from './tense.interface';
import { Type } from './type.interface';

export interface Word {
  id: number;
  name: string;
  type: Type;
  isChecked?: boolean;
}

export interface WordSense {
  id: number;
  word?: Word;
  sense: string;
  isChecked?: boolean;
  globalIndex?: number;
}

export interface WordWithSense {
  word: Word;
  wordSenses: WordSense[];
}

export interface WordSenseFilter extends WordSenseFilterArrays {
  minAccuracy?: number;
  maxAccuracy?: number;
}

export interface WordSenseFilterArrays {
  textFiltered?: string[];
  types: Type[];
  levels: Level[];
  categories: Category[];
  persons: Person[];
  genders: Gender[];
  numbers: Number[];
  moodWithTenses: MoodWithTense[];
  tenses: Tense[];
}
