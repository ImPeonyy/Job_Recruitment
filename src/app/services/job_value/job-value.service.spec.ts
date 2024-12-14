import { TestBed } from '@angular/core/testing';

import { JobValueService } from './job-value.service';

describe('JobValueService', () => {
  let service: JobValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
