import { Injectable } from '@angular/core';

import { ConjugationTenseInfo } from '../../models/conjugation-tense-info.interface';
import { Tense } from '../../models/tense.interface';
import { LANGUAGES_SUPPORTED } from '../../constants/app.constants';
import { ConjugationRegularIrregular } from '../../models/conjugation-regular-irregular.interface';
import { ConjugationWordPosition } from '../../models/conjugation-word-position.interface';
import { ConjugationTense } from '../../models/conjugation-tense.model';
import { ConjugationVerbWithTensesInfo } from '../../models/conjugation-verb-with-tenses-info.interface';
import { AuxiliaryVerbConjugationService } from './auxiliary-verb-conjugation.service';
import { RegularVerbConjugationService } from './regular-verb-conjugation.service';

@Injectable({
  providedIn: 'root',
})
export class ConjugationOrchestratorService {
  constructor(
    private auxiliaryVerbConjugationService: AuxiliaryVerbConjugationService,
    private regularVerbConjugationService: RegularVerbConjugationService,
  ) {}
  
  getConjugationWordPositionsByConjugationVerbWithTensesInfo(
    conjugationVerbWithTensesInfo: ConjugationVerbWithTensesInfo,
  ): ConjugationTense[] {
    const verbAuxiliaryName =
      conjugationVerbWithTensesInfo.conjugationVerb.verbAuxiliaryName;
    const verbGroupEnum =
      conjugationVerbWithTensesInfo.conjugationVerb.verbGroupEnum;
    let conjugationTenses: ConjugationTense[] = [];

    conjugationVerbWithTensesInfo.conjugationStructureAndIrregularsList.map(
      (conj) => {
        // let personGenderNumberConjugation: {
        //   [key: string]: ConjugationWordPosition[];
        // };
        let conjugationTense: ConjugationTense = {
          tense: conj.tense,
          personGenderNumberConjugation: {},
        };

        if (
          !conj.conjugationVerbCompoundStructureItems ||
          conj.conjugationVerbCompoundStructureItems.length === 0
        ) {
          conj.personGenderNumberEnums.map((personGenderNumber) => {
            // if(conj.personGenderNumberEnumConjugationNonExists.includes(personGenderNumber)){ continue;}
            const conjugationRegular =
              this.regularVerbConjugationService.getRegularConjugationByLanguageCodeTensePersonGenderNumberEnumVerbGroupEnumAndRegularTenseBase(
                LANGUAGES_SUPPORTED[1].code,
                conj.tense,
                personGenderNumber,
                verbGroupEnum,
                conj.regularTenseBase,
              );

            const conjugationIrregular =
              conj.personGenderNumberConjugationPositionIrregular?.[
                personGenderNumber
              ]?.conjugationIrregular || '';

            conjugationTense.personGenderNumberConjugation[personGenderNumber] =
              [
                {
                  conjugationRegularIrregular: {
                    conjugationRegular: conjugationRegular,
                    conjugationIrregular: conjugationIrregular,
                  },
                  wordSense: null,
                  position: 0,
                },
              ];
          });
        } else {
          conj.personGenderNumberEnums.forEach((personGenderNumber) => {
            let conjugationWordPosition: ConjugationWordPosition[] = [];

            conj.conjugationVerbCompoundStructureItems.forEach((item) => {
              if (item.wordSense) {
                conjugationWordPosition.push({
                  conjugationRegularIrregular: null,
                  wordSense: item.wordSense,
                  position: item.position,
                });
              } else if (
                item.tense &&
                item.auxiliarPrincipalVerb === 'AUXILIAR'
              ) {
                let conjugationRegularIrregular: ConjugationRegularIrregular = {
                  conjugationRegular: '',
                  conjugationIrregular: '',
                };
                conjugationRegularIrregular.conjugationIrregular =
                  this.auxiliaryVerbConjugationService.getIrregularConjugationVerbAuxiliaryByTenseAndPersonGenderNumber(
                    LANGUAGES_SUPPORTED[1].code,
                    item.tense,
                    personGenderNumber,
                    verbAuxiliaryName,
                  );

                conjugationRegularIrregular.conjugationRegular =
                  this.regularVerbConjugationService.getRegularConjugationByLanguageCodeTensePersonGenderNumberEnumVerbGroupEnumAndRegularTenseBase(
                    LANGUAGES_SUPPORTED[1].code,
                    item.tense,
                    personGenderNumber,
                    verbGroupEnum,
                    this.auxiliaryVerbConjugationService.getRegularTenseBaseVerbAuxiliary(
                      LANGUAGES_SUPPORTED[1].code,
                      verbAuxiliaryName,
                    ),
                  );

                conjugationWordPosition.push({
                  conjugationRegularIrregular: conjugationRegularIrregular,
                  wordSense: null,
                  position: item.position,
                });
              } else if (
                item.conjugationVerbForm &&
                item.auxiliarPrincipalVerb === 'PRINCIPAL'
              ) {
                let conjugationRegularIrregular: ConjugationRegularIrregular = {
                  conjugationRegular: '',
                  conjugationIrregular: '',
                };

                conjugationRegularIrregular.conjugationRegular =
                  this.regularVerbConjugationService.getRegularConjugationByLanguageCodeTensePersonGenderNumberEnumVerbGroupEnumAndRegularTenseBase(
                    LANGUAGES_SUPPORTED[1].code,
                    item.conjugationVerbForm.tense,
                    personGenderNumber,
                    verbGroupEnum,
                    conj.regularTenseBase,
                  );
                conjugationRegularIrregular.conjugationIrregular =
                  this.getIrregularConjugationFormByTenseAndPersonGenderNumber(
                    conjugationVerbWithTensesInfo.conjugationStructureAndIrregularsList,
                    item.conjugationVerbForm.tense,
                    item.conjugationVerbForm.personGenderNumber
                      .personGenderNumberEnum,
                  );

                conjugationWordPosition.push({
                  conjugationRegularIrregular: conjugationRegularIrregular,
                  wordSense: null,
                  position: item.position,
                });
              }
            });

            conjugationTense.personGenderNumberConjugation[personGenderNumber] =
              conjugationWordPosition;
          });
        }
        conjugationTenses.push(conjugationTense);
      },
    );

    return conjugationTenses;
  }

  private getIrregularConjugationFormByTenseAndPersonGenderNumber(
    conjugationTenseInfo: ConjugationTenseInfo[],
    tense: Tense,
    personGenderNumber: string,
  ): string {
    const conjugationTense: ConjugationTenseInfo = conjugationTenseInfo.find(
      (conjugationTenseInfo) => conjugationTenseInfo.tense.code === tense.code,
    );

    if (!conjugationTense) return '';

    const conjugationPositionIrregular =
      conjugationTense.personGenderNumberConjugationPositionIrregular?.[
        personGenderNumber
      ];

    if (!conjugationPositionIrregular) return '';

    return conjugationPositionIrregular.conjugationIrregular;
  }
}
