import { TestBed } from '@angular/core/testing';

import { PenalizationService } from './penalization.service';

describe('PenalizationService', () => {
  let service: PenalizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PenalizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
