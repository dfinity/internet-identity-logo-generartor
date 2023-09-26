import { GenerateLogoOptions } from './logo';
export type PossibleColorKey = 'blue' | 'pink' | 'purple' | 'yellow' | 'orange';
export type ColorWithAlpha = [number, number, number, number];
export type NamedRGBAcolors = {
    [key in PossibleColorKey]: ColorWithAlpha;
};
export type ColorsRGBA = ColorWithAlpha[];
export type BrandColorsAsRGBAPairs = {
    colorNames: string[];
    colors: ColorsRGBA;
}[];
export declare const brandColorsRGBA: NamedRGBAcolors;
export declare const possibleColorPairKeys: string[][];
export declare const brandColorsAsRGBAforCenter: ColorsRGBA;
export declare const brandColorsAsRGBAPairs: BrandColorsAsRGBAPairs;
export declare const shuffleArray: <T>(array: T[], random?: () => number) => (T | undefined)[];
export declare const randomUniqueColorPairs: (colors: BrandColorsAsRGBAPairs, random?: () => number) => ColorsRGBA[];
export declare const generator: (seed: string) => GenerateLogoOptions;
