import { TestBed } from '@angular/core/testing';

import { TransportCapacityService } from './transport-capacity.service';

describe('TransportCapacityService', () => {
  let service: TransportCapacityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportCapacityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
