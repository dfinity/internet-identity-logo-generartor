// the generator handles the generation of the of the logo 
// it contains the generative rules for the creation of the logo
import seedrandom from 'seedrandom';
import { GenerateLogoOptions } from './logo';

export type PossibleColorKey = 'blue' | 'pink' | 'purple' | 'yellow' | 'orange';
export type ColorWithAlpha = [number, number, number, number];
export type NamedRGBAcolors = {[key in PossibleColorKey]: ColorWithAlpha};
export type ColorsRGBA = ColorWithAlpha[];
export type BrandColorsAsRGBAPairs = {
  colorNames:string[],
  colors:ColorsRGBA,
}[];

// Internet Identity brand colors as RGBA arrays
export const brandColorsRGBA:NamedRGBAcolors = {
  blue: [0, 178, 255, 1], // blue
  pink: [255, 0, 130, 1], // pink
  purple: [90, 0, 159, 1], // purple
  yellow: [255, 171, 0, 1], // yellow
  orange: [255, 75, 0, 1], // orange
};

// We have curated a list of color pairs that work well together
// The generator will only generate logos with these color pairs
export const possibleColorPairKeys = [
  ['blue', 'pink'],
  ['purple', 'blue'],
  ['purple', 'pink'],
  ['yellow', 'orange'],
  ['orange', 'pink'],
  ['yellow', 'purple'],
];

// We only use these colors for the center circle
export const brandColorsAsRGBAforCenter:ColorsRGBA = [
  brandColorsRGBA.blue,
  brandColorsRGBA.pink,
  brandColorsRGBA.purple,
  brandColorsRGBA.yellow,
]

export const brandColorsAsRGBAPairs:BrandColorsAsRGBAPairs = possibleColorPairKeys.map((colorPair) => {
  return {
    colorNames: colorPair,
    colors: [
      brandColorsRGBA[colorPair[0] as PossibleColorKey],
      brandColorsRGBA[colorPair[1] as PossibleColorKey],
    ],
  }
});

// function that returns a new shuffled array
export const shuffleArray = <T>(array:T[], random:() => number = Math.random) => {
  const arrayCopy = [...array];
  const newArray = [];
  while (arrayCopy.length > 0) {
    const randomIndex = Math.floor(random() * arrayCopy.length);
    newArray.push(arrayCopy[randomIndex]);
    arrayCopy.splice(randomIndex, 1);
  }
  return newArray;
}

export const randomUniqueColorPairs = (colors: BrandColorsAsRGBAPairs, random:() => number = Math.random) => {
  const shuffeledColors = shuffleArray(colors, random);
  const colorNamesInUse:string[] = [];
  return shuffeledColors.filter((colorPair) => {
    const colorName = colorPair!.colorNames[0] as PossibleColorKey;
    const colorName2 = colorPair!.colorNames[1] as PossibleColorKey;
    if (colorNamesInUse.includes(colorName) || colorNamesInUse.includes(colorName2)) {
      return false;
    } else {
      colorNamesInUse.push(colorName);
      colorNamesInUse.push(colorName2);
      return true;
    }
  }).map(pair => pair!.colors);
}

// returns logo settings for a given seed
export const generator = (seed:string):GenerateLogoOptions => {
  const rand = seedrandom(seed);
  const shuffledColorsAsRGBAPairs = randomUniqueColorPairs(brandColorsAsRGBAPairs, rand);
  const centerColorAsRGBA = brandColorsAsRGBAforCenter[Math.floor(rand()*brandColorsAsRGBAforCenter.length)] as ColorWithAlpha;

  const rotation = rand(); // center rotation
  const innerCircleLength = 0.45 + rand() * 0.30; 

  return {
    colorPairs: shuffledColorsAsRGBAPairs,
    colorCenter: centerColorAsRGBA,
    innerPointRadius: 15,
    rings: 2,
    ringStrokeWidth: 15,
    rotations: [
      ((rotation + innerCircleLength * .5) + (-0.1 + rand() * 0.2)) % 1, // rotate inner ring
      rotation, 
      rotation + (-0.25 + rand() * 0.5), // most outer ring
    ],
    rotationOffsets: [0, 0],
    strokeLengths: [
      0.5 + rand() * 0.16, // outer ring
      innerCircleLength // inner ring
    ],
    gradientStops: [0.25, 0.75],
    strokeLinecap: 'round',
    showDesignRules: false,
  }
}