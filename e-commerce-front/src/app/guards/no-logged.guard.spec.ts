import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { noLoggedGuard } from './no-logged.guard';

describe('noLoggedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => noLoggedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
