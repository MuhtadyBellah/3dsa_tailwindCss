import { TestBed } from '@angular/core/testing';

import { SiteInfo } from './site-info';

describe('SiteInfo', () => {
  let service: SiteInfo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteInfo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
