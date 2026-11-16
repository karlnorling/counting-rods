import { CELL, digitRods, orientation, type ZeroStyle } from './glyph.js';
import { format, parse } from './number.js';
import { escapeAttr as escape, num, resolvePaint, type Paint } from './paint.js';
import type { NumberInput } from './parse.js';

export interface SvgOptions {
  /** Height of the image in pixels. The width follows from the number of places. Default 100. */
  size?: number;
  /**
   * Colour of the rods. Default `currentColor`, so the SVG takes the surrounding text colour,
   * or red and black with `traditionalColors`. Also takes a CSS gradient such as
   * `linear-gradient(to right, gold, crimson)`, or a gradient object.
   */
  color?: Paint;
  /** Fills the image behind the rods: a colour or a gradient. Default: transparent. */
  background?: Paint;
  /** Rod thickness in viewBox units, where a rod is 60 long. Default 7. */
  strokeWidth?: number;
  /** Space between places in viewBox units. Default 18. */
  gap?: number;
  /** Space around the rods in viewBox units. Default 20. */
  padding?: number;
  /** `circle` draws zero as 〇; `blank` leaves an empty place. Default `circle`. */
  zero?: ZeroStyle;
  /**
   * Red rods for positive numbers and black for negative, as on a Chinese counting board.
   * Replaces the default `currentColor`, but not a colour you pass. Default false.
   */
  traditionalColors?: boolean;
  /**
   * Accessible name, rendered as `<title>`. Defaults to the number written in decimal.
   * Pass `false` to leave it out and hide the image from assistive technology.
   */
  title?: string | false;
}

const RED = '#c92a2a';
const BLACK = '#1a1a1a';
const HALF = CELL / 2;

interface Cell {
  digit: number;
  place: number;
  x: number;
}

/**
 * Renders a number as an SVG string of Chinese counting rods.
 *
 * Places run left to right, most significant first, alternating vertical and horizontal
 * rods. A dot on the baseline marks the decimal point. A negative number has a diagonal
 * rod across its last digit, the sign Song-dynasty mathematicians used.
 */
export function toSvg(value: NumberInput, options: SvgOptions = {}): string {
  const number = parse(value);
  const { gap = 18, strokeWidth = 7 } = options;
  const cells: Cell[] = [];
  let x = 0;
  number.integer.forEach((digit, i) => {
    if (i > 0) x += gap;
    cells.push({ digit, place: number.integer.length - 1 - i, x });
    x += CELL;
  });
  let dot: number | undefined;
  if (number.fraction.length > 0) {
    const r = strokeWidth * 0.9;
    x += gap / 2 + r;
    dot = x;
    x += r + gap / 2;
    number.fraction.forEach((digit, i) => {
      if (i > 0) x += gap;
      cells.push({ digit, place: -(i + 1), x });
      x += CELL;
    });
  }
  return render(cells, x, number.negative, dot, options, format(number));
}

/**
 * One digit from 0 to 9 on its own. `place` is the power of ten it stands for, which sets
 * whether its rods lie vertically (units, hundreds) or horizontally (tens, thousands).
 */
export function digitSvg(digit: number, place = 0, options: SvgOptions = {}): string {
  return render([{ digit, place, x: 0 }], CELL, false, undefined, options, String(digit));
}

function render(
  cells: Cell[],
  width: number,
  negative: boolean,
  dot: number | undefined,
  options: SvgOptions,
  defaultTitle: string,
): string {
  const {
    size = 100,
    background,
    strokeWidth = 7,
    padding = 20,
    zero = 'circle',
    traditionalColors = false,
  } = options;
  if (!(size > 0)) throw new RangeError(`size must be positive, got ${size}`);
  if (!(strokeWidth > 0)) throw new RangeError(`strokeWidth must be positive, got ${strokeWidth}`);
  if (zero !== 'circle' && zero !== 'blank')
    throw new RangeError(`zero must be circle or blank, got ${zero}`);
  const plain = options.color === undefined || options.color === 'currentColor';
  const color =
    plain && traditionalColors ? (negative ? BLACK : RED) : (options.color ?? 'currentColor');
  const title = options.title ?? defaultTitle;

  const box = { x: -padding, y: -padding, width: width + 2 * padding, height: CELL + 2 * padding };
  const paint = resolvePaint(color, box, 'rods-color');
  const fill =
    background === undefined ? undefined : resolvePaint(background, box, 'rods-background');
  const defs = [...new Set([fill?.def, paint.def].filter(Boolean))].join('');
  const p = escape(paint.value);

  const d: string[] = [];
  const circles: string[] = [];
  for (const cell of cells) {
    const cx = cell.x + HALF;
    if (cell.digit === 0) {
      if (zero === 'circle') circles.push(`<circle cx="${num(cx)}" cy="${HALF}" r="17"/>`);
      continue;
    }
    for (const [x1, y1, x2, y2] of digitRods(cell.digit, orientation(cell.place))) {
      d.push(`M${num(cx + x1)} ${num(HALF + y1)}L${num(cx + x2)} ${num(HALF + y2)}`);
    }
  }
  if (negative) {
    const last = cells.at(-1)!;
    d.push(`M${num(last.x - 4)} ${CELL + 4}L${num(last.x + CELL + 4)} -4`);
  }

  const pixelWidth = (size * box.width) / box.height;
  const label = title === false ? 'aria-hidden="true"' : `role="img" aria-label="${escape(title)}"`;
  const sw = num(strokeWidth);
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${[box.x, box.y, box.width, box.height].map(num).join(' ')}" width="${num(pixelWidth)}" height="${num(size)}" ${label}>`,
    title === false ? '' : `<title>${escape(title)}</title>`,
    defs ? `<defs>${defs}</defs>` : '',
    fill === undefined
      ? ''
      : `<rect x="${num(box.x)}" y="${num(box.y)}" width="${num(box.width)}" height="${num(box.height)}" fill="${escape(fill.value)}"/>`,
    d.length
      ? `<path d="${d.join('')}" fill="none" stroke="${p}" stroke-width="${sw}" stroke-linecap="round"/>`
      : '',
    circles.length
      ? `<g fill="none" stroke="${p}" stroke-width="${num(strokeWidth * 0.7)}">${circles.join('')}</g>`
      : '',
    dot === undefined
      ? ''
      : `<circle cx="${num(dot)}" cy="${CELL}" r="${num(strokeWidth * 0.9)}" fill="${p}"/>`,
    '</svg>',
  ].join('');
}
