import { TypographyVariant, TypographyWeight, TypographyTone, TypographyAlign } from "components/typography";

export const variantDetails: Array<{
  variant: TypographyVariant;
  label: string;
  description: string;
}> = [
    { variant: "heading1", label: "Heading 1", description: "Use for hero or top-level page titles." },
    { variant: "heading2", label: "Heading 2", description: "Section titles or cards that need emphasis." },
    { variant: "heading3", label: "Heading 3", description: "Subsection headings." },
    { variant: "heading4", label: "Heading 4", description: "Panel headers or wide-form context." },
    { variant: "heading5", label: "Heading 5", description: "Mini titles and callouts." },
    { variant: "heading6", label: "Heading 6", description: "Inline labels and tertiary captions." },
    { variant: "body", label: "Body", description: "Default paragraph text for forms, lists, and cards." },
    { variant: "bodyLarge", label: "Body Large", description: "Readable body copy with extra breathing room." },
    { variant: "bodyMedium", label: "Body Medium", description: "Compact paragraphs or helper copy." },
    { variant: "bodySmall", label: "Body Small", description: "Microcopy, chips, and inline instructions." },
    { variant: "bodyExtraSmall", label: "Body Extra Small", description: "Ultra-fine labels or metadata." },
    { variant: "bodyExtraSmallBold", label: "Body Extra Small Bold", description: "Caps or badges that need emphasis." },
    { variant: "code", label: "Code", description: "Inline code snippets or terminal blocks." },
  ];

export const weightOptions: Array<{ weight: TypographyWeight; label: string }> = [
  { weight: "thin", label: "Thin" },
  { weight: "light", label: "Light" },
  { weight: "normal", label: "Normal" },
  { weight: "medium", label: "Medium" },
  { weight: "semibold", label: "Semi bold" },
  { weight: "bold", label: "Bold" },
  { weight: "extrabold", label: "Extra bold" },
  { weight: "black", label: "Black" },
];

export const toneOptions: Array<{ tone: TypographyTone; label: string }> = [
  { tone: "black", label: "Black" },
  { tone: "primary", label: "Primary" },
  { tone: "secondary", label: "Secondary" },
  { tone: "muted", label: "Muted" },
  { tone: "inverse", label: "Inverse" },
  { tone: "info", label: "Info" },
  { tone: "warning", label: "Warning" },
  { tone: "error", label: "Error" },
];

export const alignOptions: Array<{ align: TypographyAlign; label: string }> = [
  { align: "left", label: "Left" },
  { align: "center", label: "Center" },
  { align: "right", label: "Right" },
  { align: "justify", label: "Justify" },
];