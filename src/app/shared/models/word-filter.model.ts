import { compareArrays } from '../utils/compare-arrays.util';
import { mapArrayByProperty } from '../utils/map-array-by-property.util';
import { Category } from './category.model';
import { Level } from './level.model';
import { MoodWithTense } from './mood.interface';
import { PartSpeech } from './part-speech.interface';
import { Gender, Person, Number } from './person-gender-number.model';
import { Tense } from './tense.interface';

export interface WordFilterOptions {
  partSpeeches: PartSpeech[];
  levels: Level[];
  categories: Category[];
  persons: Person[];
  genders: Gender[];
  numbers: Number[];
  moodWithTenses: MoodWithTense[];
}

export interface WordFilterRequest extends WordSenseFilterRequest {
  name?: string;
  isChecked?: boolean;
  textFiltered?: string[];
  partSpeeches?: PartSpeech[];
}

export interface WordSenseFilterRequest {
  minAccuracy?: number;
  maxAccuracy?: number;
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

export function transformWordFilterRequestToWordSenseFilterRequest(
  wordFilterRequest: WordFilterRequest,
): WordSenseFilterRequest {
  const wordSenseFilterRequest: WordSenseFilterRequest = {};
  if (wordFilterRequest.minAccuracy !== undefined) {
    wordSenseFilterRequest.minAccuracy = wordFilterRequest.minAccuracy;
  }

  if (wordFilterRequest.maxAccuracy !== undefined) {
    wordSenseFilterRequest.maxAccuracy = wordFilterRequest.maxAccuracy;
  }

  if (wordFilterRequest.levels !== undefined) {
    wordSenseFilterRequest.levels = wordFilterRequest.levels;
  }

  if (wordFilterRequest.categories !== undefined) {
    wordSenseFilterRequest.categories = wordFilterRequest.categories;
  }

  if (wordFilterRequest.persons !== undefined) {
    wordSenseFilterRequest.persons = wordFilterRequest.persons;
  }

  if (wordFilterRequest.genders !== undefined) {
    wordSenseFilterRequest.genders = wordFilterRequest.genders;
  }

  if (wordFilterRequest.numbers !== undefined) {
    wordSenseFilterRequest.numbers = wordFilterRequest.numbers;
  }

  if (wordFilterRequest.moodWithTenses !== undefined) {
    wordSenseFilterRequest.moodWithTenses = wordFilterRequest.moodWithTenses;
  }

  if (wordFilterRequest.tenses !== undefined) {
    wordSenseFilterRequest.tenses = wordFilterRequest.tenses;
  }

  return wordSenseFilterRequest;
}
