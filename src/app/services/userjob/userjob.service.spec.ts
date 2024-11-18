import { TestBed } from '@angular/core/testing';

import { UserjobService } from './userjob.service';

describe('UserjobService', () => {
  let service: UserjobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserjobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
