import { Injectable } from '@angular/core';

import { Tense } from '../../models/tense.interface';
import { LANGUAGES_SUPPORTED } from '../../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuxiliaryVerbConjugationService {

  constructor() { }
  getRegularTenseBaseVerbAuxiliary(
    languageCode: string,
    verbAuxiliary: string,
  ) {
    switch (languageCode) {
      case LANGUAGES_SUPPORTED[1].code:
        return this.getFrenchRegularTenseBaseVerbAuxiliary(verbAuxiliary);
    }
  }

  getFrenchRegularTenseBaseVerbAuxiliary(verbAuxiliary: string) {
    if (verbAuxiliary === 'ETRE') return 'êt';
    if (verbAuxiliary === 'AVOIR') return 'av';
  }

  getIrregularConjugationVerbAuxiliaryByTenseAndPersonGenderNumber(
    languageCode: string,
    tense: Tense,
    personGenderNumberEnum: string,
    verbAuxiliary: string,
  ) {
    switch (languageCode) {
      case LANGUAGES_SUPPORTED[1].code:
        return this.getIrregularConjugationVerbAuxiliaryFrenchByTenseAndPersonGenderNumber(
          tense,
          personGenderNumberEnum,
          verbAuxiliary,
        );
    }
  }

  getIrregularConjugationVerbAuxiliaryFrenchByTenseAndPersonGenderNumber(
    tense: Tense,
    personGenderNumberEnum: string,
    verbAuxiliary: string,
  ) {
    switch (tense.code) {
      case 'PART_PRE_FR':
        if (verbAuxiliary === 'ETRE') return 'étant';
        if (verbAuxiliary === 'AVOIR') return 'ayant';

      case 'PRE_INF_FR':
        if (verbAuxiliary === 'ETRE')
          return this.getIrregularConjugationEtrePresentByPersonGenderNumber(
            personGenderNumberEnum,
          );
        if (verbAuxiliary === 'AVOIR')
          return this.getIrregularConjugationAvoirPresentByPersonGenderNumber(
            personGenderNumberEnum,
          );
      case 'IMP_INF_FR':
        if (verbAuxiliary === 'ETRE')
          return this.getIrregularConjugationEtreImparfaitByPersonGenderNumber(
            personGenderNumberEnum,
          );
        if (verbAuxiliary === 'AVOIR')
          return this.getIrregularConjugationAvoirImparfaitByPersonGenderNumber(
            personGenderNumberEnum,
          );
    }
  }

  getIrregularConjugationEtrePresentByPersonGenderNumber(
    personGenderNumberEnum: string,
  ) {
    switch (personGenderNumberEnum) {
      case 'FIRST_SINGULAR_NEUTRAL':
        return 'suis';
      case 'SECOND_SINGULAR_NEUTRAL':
        return 'est';
      case 'THIRD_SINGULAR_MASCULINE':
        return 'es';
      case 'FIRST_PLURAL_NEUTRAL':
        return 'sommes';
      case 'SECOND_PLURAL_NEUTRAL':
        return 'êtes';
      case 'THIRD_PLURAL_MASCULINE':
        return 'sont';
    }
  }

  getIrregularConjugationAvoirPresentByPersonGenderNumber(
    personGenderNumberEnum: string,
  ) {
    switch (personGenderNumberEnum) {
      case 'FIRST_SINGULAR_NEUTRAL':
        return 'ai';
      case 'SECOND_SINGULAR_NEUTRAL':
        return 'as';
      case 'THIRD_SINGULAR_MASCULINE':
        return 'a';
      case 'FIRST_PLURAL_NEUTRAL':
        return '';
      case 'SECOND_PLURAL_NEUTRAL':
        return '';
      case 'THIRD_PLURAL_MASCULINE':
        return 'ont';
    }
  }

  getIrregularConjugationEtreImparfaitByPersonGenderNumber(
    personGenderNumberEnum: string,
  ) {
    switch (personGenderNumberEnum) {
      case 'FIRST_SINGULAR_NEUTRAL':
        return 'étais';
      case 'SECOND_SINGULAR_NEUTRAL':
        return 'étais';
      case 'THIRD_SINGULAR_MASCULINE':
        return 'était';
      case 'FIRST_PLURAL_NEUTRAL':
        return 'étions';
      case 'SECOND_PLURAL_NEUTRAL':
        return 'étiez';
      case 'THIRD_PLURAL_MASCULINE':
        return 'étaient';
    }
  }

  getIrregularConjugationAvoirImparfaitByPersonGenderNumber(
    personGenderNumberEnum: string,
  ) {
    switch (personGenderNumberEnum) {
      default:
        return ''
      // case 'FIRST_SINGULAR_NEUTRAL':
      //   return '';
      // case 'SECOND_SINGULAR_NEUTRAL':
      //   return '';
      // case 'THIRD_SINGULAR_MASCULINE':
      //   return '';
      // case 'FIRST_PLURAL_NEUTRAL':
      //   return '';
      // case 'SECOND_PLURAL_NEUTRAL':
      //   return '';
      // case 'THIRD_PLURAL_MASCULINE':
      //   return '';
    }
  }
}
