import { WordWithAttemptsAndSuccess } from 'src/app/shared/models/word.interface';

export interface DeckEditInitInfo {
  wordToWordSensesIdMap: { [key: number]: number[] };
  wordWithAttemptsAndSuccesses: WordWithAttemptsAndSuccess[];
}
