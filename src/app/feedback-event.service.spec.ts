import { TestBed } from '@angular/core/testing';

import { FeedbackEventService } from './feedback-event.service';

describe('FeedbackEventService', () => {
  let service: FeedbackEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
