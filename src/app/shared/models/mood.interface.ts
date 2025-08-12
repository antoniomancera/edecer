import { BasicEntity } from './basic-entity.interface';
import { TenseWithoutMood } from './tense.interface';

export interface Mood extends BasicEntity {
  globalIndex?: number;
  isChecked?: boolean;
}

export interface MoodWithTense {
  mood: Mood;
  tenses: TenseWithoutMood[];
}
