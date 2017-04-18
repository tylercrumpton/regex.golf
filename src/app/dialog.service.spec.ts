import { TestBed, inject } from '@angular/core/testing';

import { DialogService } from './dialog.service';

describe('DialogServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogService]
    });
  });

  it('should ...', inject([DialogService], (service: DialogService) => {
    expect(service).toBeTruthy();
  }));
});
