import { TestBed } from '@angular/core/testing';

import { CalculService } from './calcul.service';

describe('CalculService', () => {
  let service: CalculService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addition(5,6) should be 11', () => {
    expect(service.addition(5,6)).toBe(11);
  });

  it('calculTva(200,20) should be 40', () => {
    expect(service.calculTva(200,20)).toBe(40);
  });
});


// a lancer via 
//ng test --include=**/calcul.service.spec.ts   