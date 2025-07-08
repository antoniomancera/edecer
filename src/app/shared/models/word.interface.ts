import { Type } from './type.interface';

export interface Word {
  id: number;
  name: string;
  type: Type;
}

export interface WordSense {
  id: number;
  word: Word;
  type: Type;
  definition: string;
}
