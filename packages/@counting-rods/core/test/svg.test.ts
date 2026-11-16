import { describe, expect, it } from 'vitest';
import { digitSvg, toSvg } from '../src/index.js';

const attr = (svg: string, name: string) => new RegExp(` ${name}="([^"]*)"`).exec(svg)?.[1];
const rods = (svg: string) => (attr(svg, 'd') ?? '').split('M').length - 1;

describe('toSvg', () => {
  it('renders one place 100px tall by default', () => {
    const svg = toSvg(3);
    expect(attr(svg, 'viewBox')).toBe('-20 -20 100 100');
    expect(attr(svg, 'width')).toBe('100');
    expect(attr(svg, 'height')).toBe('100');
    expect(svg).toContain('<title>3</title>');
    expect(rods(svg)).toBe(3);
    expect(attr(svg, 'stroke')).toBe('currentColor');
  });

  it('alternates vertical and horizontal places', () => {
    // 11: a horizontal ten, then a vertical one.
    expect(attr(toSvg(11), 'd')).toBe('M0 30L60 30M108 0L108 60');
  });

  it('draws zero as a circle, or leaves its place blank', () => {
    expect(toSvg(305)).toContain('<circle cx="108" cy="30" r="17"/>');
    const blank = toSvg(305, { zero: 'blank' });
    expect(blank).not.toContain('<circle');
    expect(attr(blank, 'viewBox')).toBe(attr(toSvg(305), 'viewBox'));
  });

  it('puts a dot on the baseline before the fraction', () => {
    const svg = toSvg(1.5);
    expect(svg).toMatch(/<circle cx="[\d.]+" cy="60" r="6.3" fill="currentColor"\/>/);
    expect(svg).toContain('<title>1.5</title>');
  });

  it('strikes the last digit of a negative number with a diagonal rod', () => {
    expect(attr(toSvg(-42), 'd')).toMatch(/M74 64L142 -4$/);
  });

  it('uses red and black rods with traditional colours', () => {
    expect(attr(toSvg(7, { traditionalColors: true }), 'stroke')).toBe('#c92a2a');
    expect(attr(toSvg(-7, { traditionalColors: true }), 'stroke')).toBe('#1a1a1a');
    expect(attr(toSvg(7, { traditionalColors: true, color: 'blue' }), 'stroke')).toBe('blue');
    expect(attr(toSvg(7, { traditionalColors: true, color: 'currentColor' }), 'stroke')).toBe(
      '#c92a2a',
    );
  });

  it('takes backgrounds and gradients', () => {
    const svg = toSvg(5, { color: 'linear-gradient(red, blue)', background: '#fff' });
    expect(attr(svg, 'stroke')).toMatch(/^url\(#rods-color-\w+\)$/);
    expect(svg).toContain('fill="#fff"');
  });

  it.each([
    [{ size: 0 }, 'size must be positive'],
    [{ strokeWidth: -1 }, 'strokeWidth must be positive'],
    [{ zero: 'dot' as 'circle' }, 'zero must be circle or blank'],
  ])('rejects %j', (options, message) => {
    expect(() => toSvg(1, options)).toThrow(message);
  });
});

describe('digitSvg', () => {
  it('lays a digit by its place', () => {
    expect(attr(digitSvg(1, 0), 'd')).toBe('M30 0L30 60');
    expect(attr(digitSvg(1, 1), 'd')).toBe('M0 30L60 30');
  });
});
