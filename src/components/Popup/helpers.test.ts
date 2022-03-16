import { getNextIndex } from './helpers';

describe('Helpers', () => {
  it('should get next tab index correct', () => {
    expect(getNextIndex(false, 0, 5)).toBe(1);
    expect(getNextIndex(false, 5, 5)).toBe(0);
    expect(getNextIndex(true, 0, 5)).toBe(5);
  });
});
