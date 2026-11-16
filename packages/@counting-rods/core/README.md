# @counting-rods/core

Render any number as [Chinese counting rod numerals](https://en.wikipedia.org/wiki/Counting_rods) in SVG. No dependencies; works in Node and the browser.

<img src="https://raw.githubusercontent.com/karlnorling/counting-rods/main/examples/1993.svg" alt="1993" height="80"> <img src="https://raw.githubusercontent.com/karlnorling/counting-rods/main/examples/305.svg" alt="305" height="80"> <img src="https://raw.githubusercontent.com/karlnorling/counting-rods/main/examples/rainbow.svg" alt="1234567 in rainbow colours" height="80">

```sh
npm install @counting-rods/core
```

```js
import { toSvg } from '@counting-rods/core';

document.body.innerHTML = toSvg(1993, { size: 200 });

// Colours and backgrounds take CSS gradients too.
toSvg('1234567', {
  color: 'linear-gradient(to right, #e03131, #f76707, #fab005, #40c057, #228be6, #7048e8, #be4bdb)',
});
```

Places alternate between upright and flat rods. Zero is a circle or a gap, and negatives get a diagonal rod or black rods. For PNG, JPEG or WebP, use [`@counting-rods/raster`](https://www.npmjs.com/package/@counting-rods/raster).

See the [docs and playground](https://karlnorling.github.io/counting-rods/) for every option and how numbers are drawn.

## License

MIT
