import { TestBed, async, inject } from '@angular/core/testing';

import { UsercpGuard } from './usercp.guard';

describe('UsercpGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsercpGuard]
    });
  });

  it('should ...', inject([UsercpGuard], (guard: UsercpGuard) => {
    expect(guard).toBeTruthy();
  }));
});
