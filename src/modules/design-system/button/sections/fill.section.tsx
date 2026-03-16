import Typography from "components/typography";
import Button from "components/button";
import { fillColors } from "../constants";

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const FillSection = () => (
  <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
    <Typography variant="heading3">Fill variant</Typography>
    <Typography variant="bodySmall" tone="muted">
      Base, hover, and focus states use the 500 / 700 / 400 stops from the brand and semantic scales. Disabled buttons switch to whiteScale/blackScale tokens for consistent contrast.
    </Typography>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {fillColors.map((color) => (
        <Button key={color} color={color}>
          {capitalize(color)} fill
        </Button>
      ))}
    </div>
    <div className="flex flex-wrap gap-3">
      <Button color="primary">Primary fill</Button>
      <Button color="primary" disabled>
        Primary disabled
      </Button>
    </div>
  </section>
);

export default FillSection;
