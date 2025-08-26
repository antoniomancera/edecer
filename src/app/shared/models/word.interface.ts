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

export interface WordWithSense {
  word: Word;
  wordSenses: WordSense[];
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

export interface WordFilterOptions {
  partSpeeches: PartSpeech[];
  levels: Level[];
  categories: Category[];
  persons: Person[];
  genders: Gender[];
  numbers: Number[];
  moodWithTenses: MoodWithTense[];
}

export interface WordFilterRequest {
  textFiltered?: string[];
  minAccuracy?: number;
  maxAccuracy?: number;
  partSpeeches?: PartSpeech[];
  levels?: Level[];
  categories?: Category[];
  persons?: Person[];
  genders?: Gender[];
  numbers?: Number[];
  moodWithTenses?: MoodWithTense[];
  tenses?: Tense[];
}

export function compareWordFilterRequest(
  wwordFilterRequest1: WordFilterRequest,
  wwordFilterRequest2: WordFilterRequest,
) {
  return (
    wwordFilterRequest1.minAccuracy === wwordFilterRequest2.minAccuracy &&
    wwordFilterRequest1.maxAccuracy === wwordFilterRequest2.maxAccuracy &&
    compareArrays(
      wwordFilterRequest1.textFiltered,
      wwordFilterRequest2.textFiltered,
    ) &&
    compareArrays(
      mapArrayByProperty(wwordFilterRequest1.partSpeeches, 'code'),
      mapArrayByProperty(wwordFilterRequest2.partSpeeches, 'code'),
    ) &&
    compareArrays(
      mapArrayByProperty(wwordFilterRequest1.levels, 'code'),
      mapArrayByProperty(wwordFilterRequest2.levels, 'code'),
    ) &&
    compareArrays(
      mapArrayByProperty(wwordFilterRequest1.categories, 'code'),
      mapArrayByProperty(wwordFilterRequest2.categories, 'code'),
    ) &&
    compareArrays(
      mapArrayByProperty(wwordFilterRequest1.persons, 'code'),
      mapArrayByProperty(wwordFilterRequest2.persons, 'code'),
    ) &&
    compareArrays(
      mapArrayByProperty(wwordFilterRequest1.genders, 'code'),
      mapArrayByProperty(wwordFilterRequest2.genders, 'code'),
    ) &&
    compareArrays(
      mapArrayByProperty(wwordFilterRequest1.numbers, 'code'),
      mapArrayByProperty(wwordFilterRequest2.numbers, 'code'),
    ) &&
    compareArrays(
      mapArrayByProperty(wwordFilterRequest1.tenses, 'code'),
      mapArrayByProperty(wwordFilterRequest2.tenses, 'code'),
    )
  );
}
