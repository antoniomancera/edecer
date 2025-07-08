export const LANGUAGES_SUPPORTED = [
  { code: 'es', iconRoute: 'assets/flags/es.svg', title: 'Español' },
  { code: 'fr', iconRoute: 'assets/flags/fr.svg', title: 'Français' },
  { code: 'en', iconRoute: 'assets/flags/gb.svg', title: 'English' },
];
export const LANGUAGE_DEFAULT = LANGUAGES_SUPPORTED[0];

export const SUCCESS_COLOR = '#A1F9A1';
export const DANGER_COLOR = '#F9A1A1';

export const ONE_DAY_MILLIS = 24 * 60 * 60 * 1000;

export const VERB_MODES = {
  INDICATIVE: 'INDICATIVE',
  SUBJUNCTIVE: 'SUBJUNCTIVE',
  CONDITIONAL: 'CONDITIONAL',
  IMPERATIVE: 'IMPERTATIVE',
} as const;

export const PERSONAL_PRONOUNS_FRENCH = {
  FIRST_SINGULAR_NEUTRAL: 'je',
  SECOND_SINGULAR_NEUTRAL: 'tu',
  THIRD_SINGULAR_MASCULINE: 'il/elle/on',
  FIRST_PLURAL_NEUTRAL: 'nous',
  SECOND_PLURAL_NEUTRAL: 'vous',
  THIRD_PLURAL_MASCULINE: 'ils/elles',
} as const;
