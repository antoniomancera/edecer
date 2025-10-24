import { Injectable } from '@angular/core';
import { Tense } from '../../models/tense.interface';
import { LANGUAGES_SUPPORTED } from '../../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class RegularVerbConjugationService {
  getRegularConjugationByLanguageCodeTensePersonGenderNumberEnumVerbGroupEnumAndRegularTenseBase(
    languageCode: string,
    tense: Tense,
    personGenderNumberEnum: string,
    verbGroupEnum: string,
    regularTenseBase: string,
  ) {
    switch (languageCode) {
      case LANGUAGES_SUPPORTED[1].code:
        return this.getFrenchRegularConjugationByTensePersonGenderNumberEnumAndVerbGroupEnum(
          tense,
          personGenderNumberEnum,
          verbGroupEnum,
          regularTenseBase,
        );
    }
  }

  getFrenchRegularConjugationByTensePersonGenderNumberEnumAndVerbGroupEnum(
    tense: Tense,
    personGenderNumberEnum: string,
    verbGroupEnum: string,
    regularTenseBase: string,
  ) {
    switch (tense.code) {
      case 'PART_PRE_FR':
        if (verbGroupEnum === 'SECOND_GROUP_FR')
          return regularTenseBase + 'issant';
        return regularTenseBase + 'ant';

      case 'PART_PAST_FR':
        if (verbGroupEnum === 'FIRST_GROUP_FR') return regularTenseBase + 'é';
        else if (verbGroupEnum === 'SECOND_GROUP_FR')
          return regularTenseBase + 'i';
        //TODO puede que flase el tercer grupo, pero como en teoria es simpre irregular
        return '';

      case 'PRE_INF_FR':
        return this.getPresentIndicativeFrenchRegularConjugationByPersonGenderNumberEnumAndVerbGroupEnum(
          personGenderNumberEnum,
          verbGroupEnum,
          regularTenseBase,
        );

      case 'IMP_INF_FR':
        return this.getImperfectIndicativeFrenchRegularConjugationByPersonGenderNumberEnum(
          personGenderNumberEnum,
          regularTenseBase,
        );

      case 'FUT_SIMP_INF_FR':
        return this.getFutureSimpleFrenchRegularConjugationByPersonGenderNumberEnum(
          personGenderNumberEnum,
          regularTenseBase,
        );

      case 'PRE_CON_FR':
        return this.getConditionalPresentFrenchRegularConjugationByPersonGenderNumberEnum(
          personGenderNumberEnum,
          regularTenseBase,
        );

      case 'PRE_SUB_FR':
        return this.getPresentSubjunctiveFrenchRegularConjugationByPersonGenderNumberEnumAndVerbGroupEnum(
          personGenderNumberEnum,
          verbGroupEnum,
          regularTenseBase,
        );

      case 'PRE_IMP_FR':
        return this.getImperativePresentFrenchRegularConjugationByPersonGenderNumberEnumAndVerbGroupEnum(
          personGenderNumberEnum,
          verbGroupEnum,
          regularTenseBase,
        );
    }
  }

  getPresentIndicativeFrenchRegularConjugationByPersonGenderNumberEnumAndVerbGroupEnum(
    personGenderNumberEnum: string,
    verbGroupEnum: string,
    regularTenseBase: string,
  ) {
    switch (verbGroupEnum) {
      case 'FIRST_GROUP_FR':
        return this.getPresentIndicativeFrenchRegularConjugationFirstGroupByPersonGenderNumberEnum(
          personGenderNumberEnum,
          regularTenseBase,
        );
      case 'SECOND_GROUP_FR':
        return this.getPresentIndicativeFrenchRegularConjugationSecondGroupByPersonGenderNumberEnum(
          personGenderNumberEnum,
          regularTenseBase,
        );
      case 'THIRD_GROUP_FR':
        return this.getPresentIndicativeFrenchRegularConjugationThirdGroupByPersonGenderNumberEnum(
          personGenderNumberEnum,
          regularTenseBase,
        );
    }
  }

  getPresentIndicativeFrenchRegularConjugationFirstGroupByPersonGenderNumberEnum(
    personGenderNumberEnum: string,
    regularTenseBase: string,
  ) {
    switch (personGenderNumberEnum) {
      case 'FIRST_SINGULAR_NEUTRAL':
        return regularTenseBase + 'e';
      case 'SECOND_SINGULAR_NEUTRAL':
        return regularTenseBase + 'es';
      case 'THIRD_SINGULAR_MASCULINE':
        return regularTenseBase + 'e';
      case 'FIRST_PLURAL_NEUTRAL':
        return regularTenseBase + 'ons';
      case 'SECOND_PLURAL_NEUTRAL':
        return regularTenseBase + 'ez';
      case 'THIRD_PLURAL_MASCULINE':
        return regularTenseBase + 'ent';
    }
  }

  getPresentIndicativeFrenchRegularConjugationSecondGroupByPersonGenderNumberEnum(
    personGenderNumberEnum: string,
    regularTenseBase: string,
  ) {
    switch (personGenderNumberEnum) {
      case 'FIRST_SINGULAR_NEUTRAL':
        return regularTenseBase + 'is';
      case 'SECOND_SINGULAR_NEUTRAL':
        return regularTenseBase + 'is';
      case 'THIRD_SINGULAR_MASCULINE':
        return regularTenseBase + 'it';
      case 'FIRST_PLURAL_NEUTRAL':
        return regularTenseBase + 'issons';
      case 'SECOND_PLURAL_NEUTRAL':
        return regularTenseBase + 'issez';
      case 'THIRD_PLURAL_MASCULINE':
        return regularTenseBase + 'issent';
    }
  }

  getPresentIndicativeFrenchRegularConjugationThirdGroupByPersonGenderNumberEnum(
    personGenderNumberEnum: string,
    regularTenseBase: string,
  ) {
    switch (personGenderNumberEnum) {
      case 'FIRST_SINGULAR_NEUTRAL':
        return regularTenseBase + 's';
      case 'SECOND_SINGULAR_NEUTRAL':
        return regularTenseBase + 's';
      case 'THIRD_SINGULAR_MASCULINE':
        return regularTenseBase + 't';
      case 'FIRST_PLURAL_NEUTRAL':
        return regularTenseBase + 'ons';
      case 'SECOND_PLURAL_NEUTRAL':
        return regularTenseBase + 'ez';
      case 'THIRD_PLURAL_MASCULINE':
        return regularTenseBase + 'ont';
    }
  }

  getImperfectIndicativeFrenchRegularConjugationByPersonGenderNumberEnum(
    personGenderNumberEnum: string,
    regularTenseBase: string,
  ) {
    switch (personGenderNumberEnum) {
      case 'FIRST_SINGULAR_NEUTRAL':
        return regularTenseBase + 'ais';
      case 'SECOND_SINGULAR_NEUTRAL':
        return regularTenseBase + 'ais';
      case 'THIRD_SINGULAR_MASCULINE':
        return regularTenseBase + 'ait';
      case 'FIRST_PLURAL_NEUTRAL':
        return regularTenseBase + 'ions';
      case 'SECOND_PLURAL_NEUTRAL':
        return regularTenseBase + 'iez';
      case 'THIRD_PLURAL_MASCULINE':
        return regularTenseBase + 'aient';
    }
  }

  getFutureSimpleFrenchRegularConjugationByPersonGenderNumberEnum(
    personGenderNumberEnum: string,
    regularTenseBase: string,
  ) {
    switch (personGenderNumberEnum) {
      case 'FIRST_SINGULAR_NEUTRAL':
        return regularTenseBase + 'ai';
      case 'SECOND_SINGULAR_NEUTRAL':
        return regularTenseBase + 'as';
      case 'THIRD_SINGULAR_MASCULINE':
        return regularTenseBase + 'a';
      case 'FIRST_PLURAL_NEUTRAL':
        return regularTenseBase + 'ons';
      case 'SECOND_PLURAL_NEUTRAL':
        return regularTenseBase + 'ez';
      case 'THIRD_PLURAL_MASCULINE':
        return regularTenseBase + 'ont';
    }
  }

  getConditionalPresentFrenchRegularConjugationByPersonGenderNumberEnum(
    personGenderNumberEnum: string,
    regularTenseBase: string,
  ) {
    return this.getImperfectIndicativeFrenchRegularConjugationByPersonGenderNumberEnum(
      personGenderNumberEnum,
      regularTenseBase,
    );
  }

  getPresentSubjunctiveFrenchRegularConjugationByPersonGenderNumberEnumAndVerbGroupEnum(
    personGenderNumberEnum: string,
    verbGroupEnum: string,
    regularTenseBase: string,
  ) {
    switch (verbGroupEnum) {
      case 'FIRST_GROUP_FR':
        return this.getPresentSubjunctiveFrenchRegularConjugationFirstGroupByPersonGenderNumberEnum(
          personGenderNumberEnum,
          regularTenseBase,
        );
      case 'SECOND_GROUP_FR':
        return this.getPresentSubjunctiveFrenchRegularConjugationSecondGroupByPersonGenderNumberEnum(
          personGenderNumberEnum,
          regularTenseBase,
        );
      case 'THIRD_GROUP_FR':
        return this.getPresentSubjunctiveFrenchRegularConjugationThirdGroupByPersonGenderNumberEnum(
          personGenderNumberEnum,
          regularTenseBase,
        );
    }
  }
  getPresentSubjunctiveFrenchRegularConjugationFirstGroupByPersonGenderNumberEnum(
    personGenderNumberEnum: string,
    regularTenseBase: string,
  ) {
    switch (personGenderNumberEnum) {
      case 'FIRST_SINGULAR_NEUTRAL':
        return regularTenseBase + 'e';
      case 'SECOND_SINGULAR_NEUTRAL':
        return regularTenseBase + 'es';
      case 'THIRD_SINGULAR_MASCULINE':
        return regularTenseBase + 'e';
      case 'FIRST_PLURAL_NEUTRAL':
        return regularTenseBase + 'ions';
      case 'SECOND_PLURAL_NEUTRAL':
        return regularTenseBase + 'iez';
      case 'THIRD_PLURAL_MASCULINE':
        return regularTenseBase + 'ent';
    }
  }

  getPresentSubjunctiveFrenchRegularConjugationSecondGroupByPersonGenderNumberEnum(
    personGenderNumberEnum: string,
    regularTenseBase: string,
  ) {
    switch (personGenderNumberEnum) {
      case 'FIRST_SINGULAR_NEUTRAL':
        return regularTenseBase + 'isse';
      case 'SECOND_SINGULAR_NEUTRAL':
        return regularTenseBase + 'isses';
      case 'THIRD_SINGULAR_MASCULINE':
        return regularTenseBase + 'isse';
      case 'FIRST_PLURAL_NEUTRAL':
        return regularTenseBase + 'issions';
      case 'SECOND_PLURAL_NEUTRAL':
        return regularTenseBase + 'issiez';
      case 'THIRD_PLURAL_MASCULINE':
        return regularTenseBase + 'issent';
    }
  }

  getPresentSubjunctiveFrenchRegularConjugationThirdGroupByPersonGenderNumberEnum(
    personGenderNumberEnum: string,
    regularTenseBase: string,
  ) {
    return this.getPresentSubjunctiveFrenchRegularConjugationFirstGroupByPersonGenderNumberEnum(
      personGenderNumberEnum,
      regularTenseBase,
    );
  }

  getImperativePresentFrenchRegularConjugationByPersonGenderNumberEnumAndVerbGroupEnum(
    personGenderNumberEnum,
    verbGroupEnum,
    regularTenseBase,
  ) {
    switch (verbGroupEnum) {
      case 'FIRST_GROUP_FR':
        return this.getPresentImperativeFrenchRegularConjugationFirstGroupByPersonGenderNumberEnum(
          personGenderNumberEnum,
          regularTenseBase,
        );
      case 'SECOND_GROUP_FR':
        return this.getPresentImperativeFrenchRegularConjugationSecondGroupByPersonGenderNumberEnum(
          personGenderNumberEnum,
          regularTenseBase,
        );
      case 'THIRD_GROUP_FR':
        return this.getPresentImperativeFrenchRegularConjugationThirdGroupByPersonGenderNumberEnum(
          personGenderNumberEnum,
          regularTenseBase,
        );
    }
  }

  getPresentImperativeFrenchRegularConjugationFirstGroupByPersonGenderNumberEnum(
    personGenderNumberEnum,
    regularTenseBase,
  ) {
    switch (personGenderNumberEnum) {
      case 'SECOND_SINGULAR_NEUTRAL':
        return regularTenseBase + 'e';

      case 'FIRST_PLURAL_NEUTRAL':
        return regularTenseBase + 'ons';
      case 'SECOND_PLURAL_NEUTRAL':
        return regularTenseBase + 'ez';
    }
  }

  getPresentImperativeFrenchRegularConjugationSecondGroupByPersonGenderNumberEnum(
    personGenderNumberEnum,
    regularTenseBase,
  ) {
    switch (personGenderNumberEnum) {
      case 'SECOND_SINGULAR_NEUTRAL':
        return regularTenseBase + 'is';

      case 'FIRST_PLURAL_NEUTRAL':
        return regularTenseBase + 'issons';
      case 'SECOND_PLURAL_NEUTRAL':
        return regularTenseBase + 'ez';
    }
  }

  getPresentImperativeFrenchRegularConjugationThirdGroupByPersonGenderNumberEnum(
    personGenderNumberEnum,
    regularTenseBase,
  ) {
    switch (personGenderNumberEnum) {
      case 'SECOND_SINGULAR_NEUTRAL':
        return regularTenseBase + 's';

      case 'FIRST_PLURAL_NEUTRAL':
        return regularTenseBase + 'ons';
      case 'SECOND_PLURAL_NEUTRAL':
        return regularTenseBase + 'ez';
    }
  }
}
