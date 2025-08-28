import { Injectable } from '@angular/core';

import { WordToWordSensesIdMap } from '../models/deck-edit-init-info.model';

@Injectable({
  providedIn: 'root',
})
export class WordToWordSensesIdMapService {
  getAllWordSenseIds(wordToWordSensesIdMap: WordToWordSensesIdMap): number[] {
    return Object.values(wordToWordSensesIdMap.wordToWordSensesIdMap).flat();
  }

  hasWord(
    wordToWordSensesIdMap: WordToWordSensesIdMap,
    wordId: number,
  ): boolean {
    if (!wordToWordSensesIdMap.wordToWordSensesIdMap) {
      return false;
    }

    return wordId in wordToWordSensesIdMap.wordToWordSensesIdMap;
  }

  hasSpecificWordSenseInWord(
    wordToWordSensesIdMap: WordToWordSensesIdMap,
    wordId: number,
    wordSenseId: number,
  ): boolean {
    if (!this.hasWord(wordToWordSensesIdMap, wordId)) {
      return false;
    }
    return wordToWordSensesIdMap.wordToWordSensesIdMap[wordId].includes(
      wordSenseId,
    );
  }

  removeWord(
    wordToWordSensesIdMap: WordToWordSensesIdMap,
    wordId: number,
  ): WordToWordSensesIdMap {
    const { [wordId]: removed, ...newMap } =
      wordToWordSensesIdMap.wordToWordSensesIdMap;

    return {
      wordToWordSensesIdMap: newMap as { [key: number]: number[] },
    };
  }

  removeWordSenseToWord(
    wordToWordSensesIdMap: WordToWordSensesIdMap,
    wordId: number,
    wordSenseId: number,
  ): WordToWordSensesIdMap {
    if (
      !this.hasSpecificWordSenseInWord(
        wordToWordSensesIdMap,
        wordId,
        wordSenseId,
      )
    ) {
      return wordToWordSensesIdMap;
    }

    const currentWordSenseIds =
      wordToWordSensesIdMap.wordToWordSensesIdMap[wordId];
    if (currentWordSenseIds.length === 1) {
      return this.removeWord(wordToWordSensesIdMap, wordId);
    }

    const filteredWordSenseIds = currentWordSenseIds.filter(
      (id) => id !== wordSenseId,
    );
    return {
      wordToWordSensesIdMap: {
        ...wordToWordSensesIdMap.wordToWordSensesIdMap,
        [wordId]: filteredWordSenseIds,
      },
    };
  }

  addWord(
    wordToWordSensesIdMap: WordToWordSensesIdMap,
    wordId: number,
    wordSenseIds: number[] = [],
  ): WordToWordSensesIdMap {
    return {
      wordToWordSensesIdMap: {
        ...wordToWordSensesIdMap.wordToWordSensesIdMap,
        [wordId]: wordSenseIds,
      },
    };
  }

  addWordToWordSense(
    wordToWordSensesIdMap: WordToWordSensesIdMap,
    wordId: number,
    wordSenseId: number,
  ): WordToWordSensesIdMap {
    if (!this.hasWord(wordToWordSensesIdMap, wordId)) {
      return this.addWord(wordToWordSensesIdMap, wordId, [wordSenseId]);
    } else if (
      !this.hasSpecificWordSenseInWord(
        wordToWordSensesIdMap,
        wordId,
        wordSenseId,
      )
    ) {
      const existingWordSenseIds =
        wordToWordSensesIdMap.wordToWordSensesIdMap[wordId];
      const combinedWordSenseIds = [
        ...new Set([...existingWordSenseIds, wordSenseId]),
      ];

      return {
        wordToWordSensesIdMap: {
          ...wordToWordSensesIdMap.wordToWordSensesIdMap,
          [wordId]: combinedWordSenseIds,
        },
      };
    }

    return wordToWordSensesIdMap;
  }
}
