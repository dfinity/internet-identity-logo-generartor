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

// function that returns a new shuffled array
export const shuffle = <T>(array:T[], random:() => number = Math.random) => {
  const arrayCopy = [...array];
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }
  return arrayCopy;
}

// colorOKLCHtoCSS converts a color in the OKLCH color space to a CSS color string
export const colorOKLCHtoCSS = ([l, c, h]:Color, alpha = 1) => `oklch(${l}% ${c} ${h} ${alpha < 1 ? `/ ${alpha}` : ''})`;

// svg namespace for element creation
const NS = "http://www.w3.org/2000/svg";

export type generateLogoOptions = {
  colors?:ColorsOKLCH,
  innerPointRadius?:number,
  rings?:number,
  rotations?:number[],
  strokeLengths?:number[],
  ringStrokeWidth?:number,
  seed?:number,
  idPrefix?:string,
  logoClass?:string,
}

function rect (x:number, y:number, width:number, height:number, fill:string) {
  const $rect = document.createElementNS(NS, "rect");
  $rect.setAttribute("x", `${x}`);
  $rect.setAttribute("y", `${y}`);
  $rect.setAttribute("width", `${width}`);
  $rect.setAttribute("height", `${height}`);
  $rect.setAttribute("fill", fill);
  $rect.classList.add('shape');
  return $rect;
}

function circle (cx:number, cy:number, r:number, fill:string) {
  const $circle = document.createElementNS(NS, "circle");
  $circle.setAttribute("cx", `${cx}`);
  $circle.setAttribute("cy", `${cy}`);
  $circle.setAttribute("r", `${r}`);
  $circle.setAttribute("fill", fill);
  $circle.classList.add('shape');
  return $circle;
}

function maskCircle (
  cx:number, 
  cy:number, 
  r:number, 
  strokeWidth:number, 
  strokeOffsetPercentage:number,
  strokeLengthPercentage:number,
) {
  const circumference = 2 * Math.PI * r;
  // since the linecap is set to round we need to shorten the stroke dash half the stroke width
  // otherwise the stroke will be cut off
  const lineCapRadius = strokeWidth / 2;
  const offset = circumference * strokeOffsetPercentage + lineCapRadius;
  const strokeDash = Math.max(
    (circumference * strokeLengthPercentage) - (lineCapRadius * 2),
    0.1
  );
  const $circle = circle(cx, cy, r, 'none');

  $circle.setAttribute("stroke-linecap", 'round');
  $circle.setAttribute("stroke", '#fff');
  $circle.setAttribute("stroke-width", `${strokeWidth}`);

  // dasharray works like this: [dash, gap] [dash, gap] [dash, gap] ...
  // so we need to substract the offset from the circumference to get the correct gap
  $circle.setAttribute(
    "stroke-dasharray",
    `${strokeDash} ${circumference - strokeDash}`,
  );

  $circle.setAttribute("stroke-dashoffset", `${-offset}`);

  return $circle;
}

// function that returns the generated logo SVG
export const generateLogo = ({
  colors = brandColorsOKLCH,     // all available colors in the OKLCH color space
  innerPointRadius = 20, // radius of the inner point
  rings = 2,      // number of rings,
  rotations = new Array(2 + 1).fill(0).map((_) => Math.random()),
  strokeLengths = new Array(2 + 1).fill(0).map((_) => Math.random() * 0.5 + 0.25),
  ringStrokeWidth = 20,   // stroke width of the rings
  idPrefix = `logo-0`,       // prefix for the ids of the elements so they can be styled more than once on a page 
  logoClass = `logo`,        // class name for the logo
}: generateLogoOptions) => {
  const $svg = document.createElementNS(NS, "svg");

  const innerPointDiameter = innerPointRadius * 2;
  const viewBoxSize = rings * ringStrokeWidth + innerPointDiameter;

  $svg.setAttribute("viewBox", `0 0 ${viewBoxSize} ${viewBoxSize}`);
  $svg.classList.add(logoClass);

  const $defs = document.createElementNS(NS, "defs"); // contains the gradients & masks
  const $style = document.createElementNS(NS, "style");

  $defs.appendChild($style);
  $svg.appendChild($defs);

  $style.innerHTML = `
    .${logoClass} .shape {
      transform-box: fill-box;
      transform-origin: center;
      transform: rotate(calc(var(--rotation) * 360deg));
    }
  `;

  // create gradients for the rings and the inner point
  const gradients = new Array(rings + 1).fill(0).map(() => document.createElementNS(NS, "linearGradient"));

  gradients.forEach(($gradient, i) => {
    $gradient.setAttribute("id", `${idPrefix}-gradient-${i}`);
    $gradient.setAttribute("gradientTransform", `rotate(0)`);
    // set two random colors stops for each gradient
    $gradient.innerHTML = `
      <stop offset="5%" stop-color="${colorOKLCHtoCSS(colors[i + 2 % colors.length])}"/>
      <stop offset="95%" stop-color="${colorOKLCHtoCSS(colors[i + 2 % colors.length], 0)}"/>
    `;
    $defs.appendChild($gradient);
  });
  
  const diameters = new Array(rings).fill(0).map((_, i) => viewBoxSize - i * ringStrokeWidth);

  // appends a rect for each ring to the svg
  // and creates a mask for each ring
  diameters.forEach((d, i) => {
    const r = d / 2;
    const left = (viewBoxSize - d) / 2;
    const top = left;
    const $rect = rect(
      left, top, 
      d, d, 
      `${colorOKLCHtoCSS(colors[i + 1 % colors.length])}`
    );

    $rect.style.setProperty("--rotation", `${rotations[i + 1]}`);
    $svg.appendChild($rect);

    const $maskCicle = maskCircle(
      viewBoxSize / 2,
      viewBoxSize / 2,
      r - ringStrokeWidth / 2,
      ringStrokeWidth,
      0,
      strokeLengths[i],
    );

    const $mask = document.createElementNS(NS, "mask");
    $mask.appendChild($maskCicle);
    $mask.setAttribute("id", `${idPrefix}-mask-${i}`);
    $defs.appendChild($mask);

    $rect.setAttribute("mask", `url(#${idPrefix}-mask-${i})`);
  });

  const $innerCircle = circle(
    viewBoxSize / 2,
    viewBoxSize / 2,
    innerPointRadius,
    `url(#${idPrefix}-gradient-${rings})`
  );

  $innerCircle.style.setProperty("--rotation", `${rotations[0]}`)

  $svg.appendChild($innerCircle);

  diameters.forEach((d, i) => {
    const r = d / 2;
    const left = (viewBoxSize - d) / 2;
    const top = left;
    const $rect = rect(
      left, top,
      d, d,
      `url(#${idPrefix}-gradient-${i})`
    );
    $rect.style.setProperty("--rotation", `${rotations[i + 1]}`);
    $rect.setAttribute("mask", `url(#${idPrefix}-mask-${i})`);
    $svg.appendChild($rect);
  });

  return $svg;
}