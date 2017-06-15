import { TestBed, inject } from '@angular/core/testing';

import { BackendHttpserviceService } from './backend-httpservice.service';

describe('BackendHttpserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendHttpserviceService]
    });
  });

  it('should be created', inject([BackendHttpserviceService], (service: BackendHttpserviceService) => {
    expect(service).toBeTruthy();
  }));
});
