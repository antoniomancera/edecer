import { TestBed } from '@angular/core/testing';

import { MotPalabraService } from './mot-palabra.service';

describe('MotPalabraService', () => {
  let service: MotPalabraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotPalabraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
