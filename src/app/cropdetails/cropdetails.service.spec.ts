import { TestBed } from '@angular/core/testing';

import { CropdetailsService } from './cropdetails.service';

describe('CropdetailsService', () => {
  let service: CropdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CropdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
