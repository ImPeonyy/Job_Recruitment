import { TestBed } from '@angular/core/testing';

import { CloudsService } from './clouds.service';

describe('CloudsService', () => {
  let service: CloudsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
