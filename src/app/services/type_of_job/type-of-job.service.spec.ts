import { TestBed } from '@angular/core/testing';

import { TypeOfJobService } from './type-of-job.service';

describe('TypeOfJobService', () => {
  let service: TypeOfJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeOfJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
