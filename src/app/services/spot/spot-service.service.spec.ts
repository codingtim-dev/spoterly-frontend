import { TestBed } from '@angular/core/testing';

import { SpotServiceService } from './spot-service.service';

describe('SpotServiceService', () => {
  let service: SpotServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
