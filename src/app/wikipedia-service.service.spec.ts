import { TestBed } from '@angular/core/testing';

import { WikipediaService } from './wikipedia-service.service';

describe('WikipediaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WikipediaService = TestBed.get(WikipediaService);
    expect(service).toBeTruthy();
  });
});
