import { TestBed, inject } from '@angular/core/testing';

import { CustomI18nService } from './custom-i18n.service';

describe('CustomI18nService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomI18nService]
    });
  });

  it('should ...', inject([CustomI18nService], (service: CustomI18nService) => {
    expect(service).toBeTruthy();
  }));
});
