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

  it('add(5,6)==11', () => {
    expect(service.add(5,6)).toBe(11);
  });
});

//à lancer via 
// ng test  --include=**/service/preferences.service.spec.ts
