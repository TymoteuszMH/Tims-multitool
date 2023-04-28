import { TestBed } from '@angular/core/testing';

import { LoginDataService } from './logindata.service';

describe('LogindataService', () => {
  let service: LoginDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
