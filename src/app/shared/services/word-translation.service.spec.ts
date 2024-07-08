import { TestBed } from '@angular/core/testing';

import { WordTranslationService } from './word-translation.service';

describe('WordTranslationService', () => {
  let service: WordTranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordTranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
