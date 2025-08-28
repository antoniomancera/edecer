import { WordWithAttemptsAndSuccess } from 'src/app/shared/models/word.interface';

export interface DeckEditInitInfo extends WordToWordSensesIdMap {
  wordWithAttemptsAndSuccesses: WordWithAttemptsAndSuccess[];
}

export interface WordToWordSensesIdMap {
  wordToWordSensesIdMap: { [key: number]: number[] };
}
