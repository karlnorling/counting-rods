import { describe, expect, it } from 'vitest';
import { digitRods, orientation } from '../src/index.js';

const isVertical = ([x1, , x2]: readonly number[]) => x1 === x2;

describe('orientation', () => {
  it.each([
    [0, 'vertical'],
    [1, 'horizontal'],
    [2, 'vertical'],
    [3, 'horizontal'],
    [-1, 'horizontal'],
    [-2, 'vertical'],
  ] as const)('lays place %i %s', (place, expected) => {
    expect(orientation(place)).toBe(expected);
  });
});

describe('digitRods', () => {
  it('has no rods for zero', () => {
    expect(digitRods(0, 'vertical')).toEqual([]);
  });

  it.each([1, 2, 3, 4, 5])('draws %i as that many parallel rods', (digit) => {
    const vertical = digitRods(digit, 'vertical');
    const horizontal = digitRods(digit, 'horizontal');
    expect(vertical).toHaveLength(digit);
    expect(vertical.every(isVertical)).toBe(true);
    expect(horizontal.every((rod) => !isVertical(rod))).toBe(true);
  });

  it('centres parallel rods', () => {
    expect(digitRods(3, 'vertical').map(([x]) => x)).toEqual([-13, 0, 13]);
  });

  it.each([6, 7, 8, 9])('draws %i as a crossing rod worth five over the rest', (digit) => {
    const vertical = digitRods(digit, 'vertical');
    expect(vertical).toHaveLength(digit - 4);
    // Vertical form: a horizontal bar on top, like a T.
    expect(vertical.filter((rod) => !isVertical(rod))).toHaveLength(1);
    const horizontal = digitRods(digit, 'horizontal');
    // Horizontal form: one upright rod standing on the parallel ones, like an inverted T.
    expect(horizontal.filter(isVertical)).toEqual([[0, -30, 0, expect.any(Number)]]);
  });

  it('stands the upright of a horizontal six on its rod', () => {
    expect(digitRods(6, 'horizontal')).toEqual([
      [-26, 26, 26, 26],
      [0, -30, 0, 26],
    ]);
  });

  it.each([-1, 10, 2.5])('rejects %s', (digit) => {
    expect(() => digitRods(digit, 'vertical')).toThrow('0 to 9');
  });
});
