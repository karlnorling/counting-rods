# @counting-rods/cli

Draw any number as [Chinese counting rod numerals](https://en.wikipedia.org/wiki/Counting_rods) from the command line: SVG, PNG, JPEG or WebP.

```sh
npx @counting-rods/cli 1993 > 1993.svg
npx @counting-rods/cli 3.14159 -o pi.webp --size 200
npx @counting-rods/cli -42 -o minus.png --traditional-colors
```

Installed globally with `npm install -g @counting-rods/cli`, the command is `counting-rods`.

```
Usage: counting-rods <number> [options]

Draws a number as Chinese counting rod numerals. Prints SVG to stdout unless --output is given.

Options:
  -o, --output <file>      Write to a .svg, .png, .jpg, .jpeg or .webp file
  -s, --size <px>          Image height in pixels (default 100)
  -c, --color <color>      Colour or CSS gradient (default currentColor for SVG,
                           black for images)
  -b, --background <color> Background colour or CSS gradient (default transparent,
                           white for JPEG)
  -g, --gap <n>            Space between places in viewBox units (default 18)
      --zero <circle|blank>Draw zero as a circle or leave it blank (default circle)
      --traditional-colors Red rods for positive numbers, black for negative
  -q, --quality <1-100>    JPEG and WebP quality
  -h, --help               Show this help
  -v, --version            Show the version

Examples:
  counting-rods 1993 > 1993.svg
  counting-rods 3.14159 -o pi.webp --size 200
  counting-rods -42 -o minus.png --traditional-colors
  counting-rods 1993 -o 1993.png -c 'linear-gradient(to right, red, blue)'
```

## License

MIT
