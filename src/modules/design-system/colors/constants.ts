import { ColorPalette } from "_interfaces/colors-component.interfaces";

export const brandPalettes: ColorPalette[] = [
  {
    name: "palette-primary-name",
    description: "palette-primary-description",
    shades: [
      { label: "50", value: "#DAEDFF" },
      { label: "100", value: "#D3E7F9" },
      { label: "200", value: "#A9CEF3" },
      { label: "300", value: "#78A6DB" },
      { label: "400", value: "#507CB8" },
      { label: "500", value: "#224A8A" },
      { label: "600 / DEFAULT", value: "#183976" },
      { label: "700", value: "#112A63" },
    ],
  },
  {
    name: "palette-secondary-name",
    description: "palette-secondary-description",
    shades: [
      { label: "100", value: "#C8F7FA" },
      { label: "200", value: "#93EAF5" },
      { label: "300", value: "#5AC9E1" },
      { label: "400", value: "#30A0C3" },
      { label: "500 / DEFAULT", value: "#00999C" },
      { label: "600", value: "#005386" },
      { label: "700", value: "#003E70" },
    ],
  },
  {
    name: "palette-tertiary-name",
    description: "palette-tertiary-description",
    shades: [
      { label: "100", value: "#F0F4F8" },
      { label: "200", value: "#E2E9F2" },
      { label: "300", value: "#C3CCD8" },
      { label: "400 / DEFAULT", value: "#9CA4B2" },
      { label: "500", value: "#6B7280" },
      { label: "600", value: "#4E576E" },
      { label: "700", value: "#35405C" },
    ],
  },
];

export const semanticPalettes: ColorPalette[] = [
  {
    name: "palette-success-name",
    description: "palette-success-description",
    shades: [
      { label: "100", value: "#CDF9D4" },
      { label: "200", value: "#0DF3B4" },
      { label: "300", value: "#68DC92" },
      { label: "400", value: "#3FBA78" },
      { label: "500 / DEFAULT", value: "#118D57" },
      { label: "600", value: "#0C7954" },
      { label: "700", value: "#08654F" },
    ],
  },
  {
    name: "palette-warning-name",
    description: "palette-warning-description",
    shades: [
      { label: "100", value: "#FFF5CC" },
      { label: "200", value: "#FFE799" },
      { label: "300", value: "#FFD666" },
      { label: "400", value: "#FFC63F" },
      { label: "500 / DEFAULT", value: "#FFAB00" },
      { label: "600", value: "#0C7954" },
      { label: "700", value: "#08654F" },
    ],
  },
  {
    name: "palette-error-name",
    description: "palette-error-description",
    shades: [
      { label: "100", value: "#FDE1D3" },
      { label: "200", value: "#FBBDA8" },
      { label: "300", value: "#F4907B" },
      { label: "400", value: "#EA6558" },
      { label: "500 / DEFAULT", value: "#DC2626" },
      { label: "600", value: "#BD1B29" },
      { label: "700", value: "#9E132B" },
    ],
  },
  {
    name: "palette-info-name",
    description: "palette-info-description",
    shades: [
      { label: "100", value: "#CAF7FC" },
      { label: "200", value: "#96EAF9" },
      { label: "300", value: "#60D0EE" },
      { label: "400", value: "#39AFDD" },
      { label: "500 / DEFAULT", value: "#0284C7" },
      { label: "600", value: "#0166AB" },
      { label: "700", value: "#014C8F" },
    ],
  },
];

export const scalePalettes: ColorPalette[] = [
  {
    name: "palette-black-scale-name",
    description: "palette-black-scale-description",
    shades: [
      { label: "0", value: "#FFFFFF" },
      { label: "20", value: "#64748B" },
      { label: "40", value: "#475569" },
      { label: "60", value: "#334155" },
      { label: "80", value: "#1E293B" },
      { label: "100", value: "#0F172A" },
    ],
  },
  {
    name: "palette-white-scale-name",
    description: "palette-white-scale-description",
    shades: [
      { label: "60", value: "#CBD5E1" },
      { label: "70", value: "#E2E8F0" },
      { label: "80", value: "#F1F5F9" },
      { label: "90", value: "#F8FAFC" },
      { label: "100", value: "#FFFFFF" },
    ],
  },
  {
    name: "palette-grey-scale-name",
    description: "palette-grey-scale-description",
    shades: [
      { label: "0", value: "#020617" },
      { label: "20", value: "#0F172A" },
      { label: "40", value: "#334155" },
      { label: "60", value: "#64748B" },
      { label: "80", value: "#CBD5E1" },
      { label: "100", value: "#F1F5F9" },
    ],
  },
];

export const utilityPalettes: ColorPalette[] = [
  {
    name: "palette-text-tokens-name",
    description: "palette-text-tokens-description",
    shades: [
      { label: "primary", value: "#0F172A" },
      { label: "secondary", value: "#64748B" },
      { label: "tertiary", value: "#9CA4B2" },
      { label: "disable", value: "#E2E9F2" },
      { label: "link", value: "#0284C7" },
    ],
  },
  {
    name: "palette-background-tokens-name",
    description: "palette-background-tokens-description",
    shades: [
      { label: "DEFAULT", value: "#F8FAFC" },
      { label: "primary", value: "#224A8A" },
      { label: "secondary", value: "#FFFFFF" },
      { label: "tertiary", value: "#F0F4F8" },
    ],
  },
  {
    name: "palette-border-tokens-name",
    description: "palette-border-tokens-description",
    shades: [
      { label: "DEFAULT", value: "#CED4DA" },
      { label: "subtle", value: "#F1F5F9" },
      { label: "strong", value: "#94A3B8" },
      { label: "focus", value: "#224A8A" },
      { label: "error", value: "#DC2626" },
    ],
  },
  {
    name: "palette-divider-name",
    description: "palette-divider-description",
    shades: [{ label: "DEFAULT", value: "#CED4DA" }],
  },
];
