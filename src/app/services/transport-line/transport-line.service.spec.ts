import { TestBed } from '@angular/core/testing';

import { TransportLineService } from './transport-line.service';

describe('TransportLineService', () => {
  let service: TransportLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
