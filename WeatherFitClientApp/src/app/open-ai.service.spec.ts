import { TestBed } from '@angular/core/testing';

import { OpenAiService } from './weather-page/services/open-ai.service';

describe('OpenAiService', () => {
  let service: OpenAiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenAiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
