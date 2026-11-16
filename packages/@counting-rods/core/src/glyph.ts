/** Counting rods are decimal: each place holds a digit from 0 to 9. */
export const BASE = 10;

/** One digit fills a square cell this many viewBox units across, centred on the origin. */
export const CELL = 60;

/** A rod from one point to another, in a cell centred on (0, 0). */
export type Rod = readonly [x1: number, y1: number, x2: number, y2: number];

/**
 * How a zero place is drawn: `circle` is the 〇 that Chinese mathematicians used from
 * the 13th century, and `blank` leaves the place empty as the earliest rod numerals did.
 */
export type ZeroStyle = 'circle' | 'blank';

/** Rods lie in one of two orientations, alternating from place to place. */
export type Orientation = 'vertical' | 'horizontal';

const HALF = CELL / 2;
const SPACING = 13;
/** The crossbar of six to nine is a little shorter than a full rod. */
const BAR = 26;

/**
 * Which way a place's rods lie. Units, hundreds and every even power of ten use vertical
 * rods (zong); tens, thousands and every odd power use horizontal ones (heng). The
 * alternation tells neighbouring digits apart, so 11 is never mistaken for 2.
 */
export function orientation(place: number): Orientation {
  return Math.abs(place) % 2 === 0 ? 'vertical' : 'horizontal';
}

/**
 * The rods for one digit from 1 to 9. Zero has no rods; see {@link ZeroStyle}.
 *
 * One to five are that many parallel rods. Six to nine put a crossing rod worth five
 * above one to four parallel rods: a T in the vertical form and an inverted T in the
 * horizontal form.
 */
export function digitRods(digit: number, form: Orientation): Rod[] {
  if (!Number.isInteger(digit) || digit < 0 || digit > 9) {
    throw new RangeError(`A counting-rod digit runs from 0 to 9, got ${digit}`);
  }
  const rods: Rod[] = [];
  if (digit === 0) return rods;
  const count = digit > 5 ? digit - 5 : digit;
  const offsets = Array.from({ length: count }, (_, i) => (i - (count - 1) / 2) * SPACING);

  if (form === 'vertical') {
    if (digit <= 5) {
      for (const x of offsets) rods.push([x, -HALF, x, HALF]);
    } else {
      const top = -HALF + 4;
      rods.push([-BAR, top, BAR, top]);
      for (const x of offsets) rods.push([x, top, x, HALF]);
    }
  } else if (digit <= 5) {
    for (const y of offsets) rods.push([-HALF, y, HALF, y]);
  } else {
    // Parallel rods sit at the bottom and a single upright rod stands on the top one.
    const ys = offsets.map((y) => y + HALF - offsets.at(-1)! - 4);
    for (const y of ys) rods.push([-BAR, y, BAR, y]);
    rods.push([0, -HALF, 0, ys[0]!]);
  }
  return rods;
}
