import { Type } from './type.interface';

export interface Word {
  id: number;
  name: string;
  type: Type;
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
