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
  labelKey: string;
  size: ButtonSize;
  detail: string;
}> = [
  { labelKey: "size-small", size: "small", detail: "text-xs · px-12 · py-7" },
  { labelKey: "size-medium", size: "medium", detail: "text-sm · px-14 · py-8" },
  { labelKey: "size-large", size: "large", detail: "text-sm · px-16 · py-12" },
  { labelKey: "size-xl", size: "xl", detail: "text-base bold · px-20 · py-13" },
  { labelKey: "size-2xl", size: "2xl", detail: "text-lg bold · px-24 · py-17.5" },
  { labelKey: "size-3xl", size: "3xl", detail: "text-xl bold · px-32 · py-20" },
];
