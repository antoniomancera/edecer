import { ConjugationTenseInfo } from './conjugation-tense-info.interface';
import { conjugationVerb } from './conjugation-verb.interface';

export interface ConjugationVerbWithTensesInfo {
  conjugationVerb: conjugationVerb;
  conjugationStructureAndIrregularsList: ConjugationTenseInfo[];
}
