import { Injectable } from '@angular/core';

import { DeckEditInitInfo } from '../models/deck-edit-init-info.model';

@Injectable({
  providedIn: 'root',
})
export class DeckEditInitInfoHelperService {
  getAllWordSenseIds(deckEditInitInfo: DeckEditInitInfo): number[] {
    return Object.values(deckEditInitInfo.wordToWordSensesIdMap).flat();
  }

  hasWord(deckEditInitInfo: DeckEditInitInfo, wordId: number): boolean {
    return wordId in deckEditInitInfo.wordToWordSensesIdMap;
  }

  removeWordFromMap(
    deckInfo: DeckEditInitInfo,
    wordId: number,
  ): DeckEditInitInfo {
    const { [wordId]: removed, ...newWordToWordSensesIdMap } =
      deckInfo.wordToWordSensesIdMap;

    return {
      ...deckInfo,
      wordToWordSensesIdMap: newWordToWordSensesIdMap as {
        [key: number]: number[];
      },
    };
  }
}
