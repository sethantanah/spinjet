import { TestBed } from '@angular/core/testing';

import { GrammerService } from './grammer.service';

describe('GrammerService', () => {
  let service: GrammerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrammerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
