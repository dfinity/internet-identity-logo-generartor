import {XORShift64} from 'random-seedable';

// luma 0.0% - 100.0%, chroma 0.0 - 1.0 (0.4 being the practical border of the gamut), hue 0 - 360

export type Color = [number, number, number];
export type ColorsOKLCH = Color[];

// these are de Dfinity brand colors adapted in the OKLCH color space
// to make use of the full gamut of colors a given display has to offer

export const brandColorsOKLCH:ColorsOKLCH = [
  [2.79, 0.009, 0],
  [68.97, 0.241, 38.21],
  [81.62, 0.194, 73.74],
  [66.03, 0.295, 2.63],
  [38.68, 0.21, 300.4],
  [71.32, 0.182, 232.37],
];


// colorOKLCHtoCSS converts a color in the OKLCH color space to a CSS color string
export const colorOKLCHtoCSS = ([l, c, h]:Color, alpha = 1) => `oklch(${l}% ${c} ${h} ${alpha < 1 ? `/ ${alpha}` : ''})`;

// svg namespace for element creation
const NS = "http://www.w3.org/2000/svg";

export type generateLogoOptions = {
  colors:ColorsOKLCH,
  innerPointRadius?:number,
  rings?:number,
  ringStrokeWidth?:number,
  seed?:number,
  idPrefix?:string,
  logoClass?:string,
}

// function that returns the generated logo SVG
export const generateLogo = ({
  colors,     // all available colors in the OKLCH color space
  innerPointRadius = 20, // radius of the inner point
  rings = 2,      // number of rings
  ringStrokeWidth = 20,   // stroke width of the rings
  seed = 0,                // seed for the random number generator
  idPrefix = `logo-0`,       // prefix for the ids of the elements so they can be styled more than once on a page 
  logoClass = `logo`,        // class name for the logo
}: generateLogoOptions) => {
  const $svg = document.createElementNS(NS, "svg");

  const viewBoxSize = ringStrokeWidth / 2 * rings + innerPointRadius * 2;

  $svg.setAttribute("viewBox", `0 0 ${viewBoxSize} ${viewBoxSize}`);
  const random = new XORShift64(seed);

  // shuffle the colors array
  const colorsShuffeled = random.shuffle(colors);

  const radii = Array({length: rings}, (_:null, i:number) => (i + 1) * ringStrokeWidth / 2);


  const $defs = document.createElementNS(NS, "defs"); // contains the gradients & masks
  const $style = document.createElementNS(NS, "style");

  $style.innerHTML = `
    .${logoClass} rect {
      transform-box: fill-box;
      transform-origin: center;
      transform: rotate(calc(var(--r) * 360deg));
    }
  `;

  return $svg;
}