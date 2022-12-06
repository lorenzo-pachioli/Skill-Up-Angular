import { TestBed } from '@angular/core/testing';

import { DevelopmentOnlyService } from './development-only.service';

describe('DevelopmentOnlyService', () => {
  let service: DevelopmentOnlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevelopmentOnlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
