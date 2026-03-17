import { TypographyVariant, TypographyWeight, TypographyTone, TypographyAlign } from "components/typography";

export const variantDetails: Array<{
  variant: TypographyVariant;
  labelKey: string;
  descriptionKey: string;
}> = [
    { variant: "heading1", labelKey: "variant-heading1-label", descriptionKey: "variant-heading1-description" },
    { variant: "heading2", labelKey: "variant-heading2-label", descriptionKey: "variant-heading2-description" },
    { variant: "heading3", labelKey: "variant-heading3-label", descriptionKey: "variant-heading3-description" },
    { variant: "heading4", labelKey: "variant-heading4-label", descriptionKey: "variant-heading4-description" },
    { variant: "heading5", labelKey: "variant-heading5-label", descriptionKey: "variant-heading5-description" },
    { variant: "heading6", labelKey: "variant-heading6-label", descriptionKey: "variant-heading6-description" },
    { variant: "body", labelKey: "variant-body-label", descriptionKey: "variant-body-description" },
    { variant: "bodyLarge", labelKey: "variant-bodyLarge-label", descriptionKey: "variant-bodyLarge-description" },
    { variant: "bodyMedium", labelKey: "variant-bodyMedium-label", descriptionKey: "variant-bodyMedium-description" },
    { variant: "bodySmall", labelKey: "variant-bodySmall-label", descriptionKey: "variant-bodySmall-description" },
    { variant: "bodyExtraSmall", labelKey: "variant-bodyExtraSmall-label", descriptionKey: "variant-bodyExtraSmall-description" },
    { variant: "bodyExtraSmallBold", labelKey: "variant-bodyExtraSmallBold-label", descriptionKey: "variant-bodyExtraSmallBold-description" },
    { variant: "code", labelKey: "variant-code-label", descriptionKey: "variant-code-description" },
  ];

export const weightOptions: Array<{ weight: TypographyWeight; labelKey: string }> = [
  { weight: "thin", labelKey: "weight-thin" },
  { weight: "light", labelKey: "weight-light" },
  { weight: "normal", labelKey: "weight-normal" },
  { weight: "medium", labelKey: "weight-medium" },
  { weight: "semibold", labelKey: "weight-semibold" },
  { weight: "bold", labelKey: "weight-bold" },
  { weight: "extrabold", labelKey: "weight-extrabold" },
  { weight: "black", labelKey: "weight-black" },
];

export const toneOptions: Array<{ tone: TypographyTone; labelKey: string }> = [
  { tone: "black", labelKey: "tone-black" },
  { tone: "primary", labelKey: "tone-primary" },
  { tone: "secondary", labelKey: "tone-secondary" },
  { tone: "muted", labelKey: "tone-muted" },
  { tone: "inverse", labelKey: "tone-inverse" },
  { tone: "info", labelKey: "tone-info" },
  { tone: "warning", labelKey: "tone-warning" },
  { tone: "error", labelKey: "tone-error" },
];

export const alignOptions: Array<{ align: TypographyAlign; labelKey: string }> = [
  { align: "left", labelKey: "align-left" },
  { align: "center", labelKey: "align-center" },
  { align: "right", labelKey: "align-right" },
  { align: "justify", labelKey: "align-justify" },
];
