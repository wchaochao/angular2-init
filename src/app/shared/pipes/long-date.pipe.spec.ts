import { LongDatePipe } from './long-date.pipe';

describe('LongDatePipe', () => {
  it('create an instance', () => {
    const pipe = new LongDatePipe();
    expect(pipe).toBeTruthy();
  });
});
