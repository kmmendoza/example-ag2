import { TestBed, inject } from '@angular/core/testing';

import { BackendWSServiceService } from './backend-wsservice.service';

describe('BackendWSServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendWSServiceService]
    });
  });

  it('should be created', inject([BackendWSServiceService], (service: BackendWSServiceService) => {
    expect(service).toBeTruthy();
  }));
});
