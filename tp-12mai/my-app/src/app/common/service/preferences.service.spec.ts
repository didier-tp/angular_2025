import { TestBed } from '@angular/core/testing';

import { PreferencesService } from './preferences.service';

describe('PreferencesService', () => {
  let service: PreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('carre(3)==9', () => {
    expect(service.carre(3)).toBe(9);
  });
});

//ng test --include=**/preferences.service.spec.ts
