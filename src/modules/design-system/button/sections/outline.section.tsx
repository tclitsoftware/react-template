import Typography from "components/typography";
import Button from "components/button";
import { outlineColors } from "../constants";

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const OutlineSection = () => (
  <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
    <Typography variant="heading3">Outline variant</Typography>
    <Typography variant="bodySmall" tone="muted">
      Outline buttons layer whiteScale surfaces with the same brand/semantic color for their strokes and text. Hover and focus stay grounded on whiteScale tokens while the border stays on the 500 value.
    </Typography>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {outlineColors.map((color) => (
        <Button key={color} variant="outline" color={color}>
          {capitalize(color)} outline
        </Button>
      ))}
    </div>
    <div className="flex flex-wrap gap-3">
      <Button variant="outline" color="primary">
        Primary outline
      </Button>
      <Button variant="outline" color="primary" disabled>
        Outline disabled
      </Button>
    </div>
  </section>
);

export default OutlineSection;
