import { TestBed, inject } from '@angular/core/testing';

import { MonthGoalService } from './month-goal.service';

describe('MonthGoalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonthGoalService]
    });
  });

  it('should be created', inject([MonthGoalService], (service: MonthGoalService) => {
    expect(service).toBeTruthy();
  }));
});
