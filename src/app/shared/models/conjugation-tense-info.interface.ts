import { ConjugationPositionIrregular } from './conjugation-position-irregular.interface';
import { ConjugationVerbCompoundStructureItem } from './conjugation-verb-compound-structure.interface';
import { Tense } from './tense.interface';

export interface ConjugationTenseInfo {
  tense: Tense;
  regularTenseBase: string;
  personGenderNumberEnums: string[];
  conjugationVerbCompoundStructureItems: ConjugationVerbCompoundStructureItem[];
  personGenderNumberEnumConjugationNonExists: string[];
  personGenderNumberConjugationPositionIrregular: {
    [key: string]: ConjugationPositionIrregular;
  };
}
