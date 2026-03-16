import { ButtonColor, ButtonSize } from "components/button";

export const fillColors: ButtonColor[] = [
  "primary",
  "secondary",
  "tertiary",
  "success",
  "warning",
  "error",
  "info",
];

export const outlineColors: ButtonColor[] = [
  "primary",
  "secondary",
  "tertiary",
  "success",
  "warning",
  "error",
  "info",
];

export const buttonSizes: Array<{
  label: string;
  size: ButtonSize;
  detail: string;
}> = [
  { label: "Small", size: "small", detail: "text-xs · px-12 · py-7" },
  { label: "Medium", size: "medium", detail: "text-sm · px-14 · py-8" },
  { label: "Large", size: "large", detail: "text-sm · px-16 · py-12" },
  { label: "XL", size: "xl", detail: "text-base bold · px-20 · py-13" },
  { label: "2XL", size: "2xl", detail: "text-lg bold · px-24 · py-17.5" },
  { label: "3XL", size: "3xl", detail: "text-xl bold · px-32 · py-20" },
];
