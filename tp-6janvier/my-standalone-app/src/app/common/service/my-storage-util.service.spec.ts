import { TestBed } from '@angular/core/testing';

import { MyStorageUtilService } from './my-storage-util.service';

describe('MyStorageUtilService', () => {
  let service: MyStorageUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyStorageUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
