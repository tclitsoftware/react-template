export type ColorShade = {
  label: string;
  value: string;
};

export type ColorPalette = {
  name: string;
  description?: string;
  shades: ColorShade[];
};