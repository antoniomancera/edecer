import { ConjugationVerbForm } from './conjugation-verb-form.interface';
import { Tense } from './tense.interface';
import { WordSense } from './word.interface';

export interface ConjugationVerbCompoundStructure {
  tense: Tense;
}

export interface ConjugationVerbCompoundStructureItem {
  conjugationVerbCompoundStructure: ConjugationVerbCompoundStructure;
  wordSense: WordSense;
  conjugationVerbForm: ConjugationVerbForm;
  tense: Tense;
  auxiliarPrincipalVerb: string;
  position: number;
}
