import { plus } from "features/samples/components";

describe('plus test', () => {
  test('positive + positive', () => {
    expect(plus(1, 1)).toBe(2);
  })
  test('positive + negative', () => {
    expect(plus(1, -1)).toBe(0);
  })
  test('negative + positive', () => {
    expect(plus(-1, 1)).toBe(0);
  })
  test('negative + negative', () => {
    expect(plus(-1, -1)).toBe(-2);
  })
});
