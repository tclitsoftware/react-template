import Typography from "components/typography";
import Button from "components/button";
import { buttonSizes } from "../constants";

const SizeSection = () => (
  <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
    <Typography variant="heading3">Size scale</Typography>
    <Typography variant="bodySmall" tone="muted">
      Each token pairs a font-size with the requested padding values so spacing stays consistent across variants.
    </Typography>
    <div className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {buttonSizes.map(({ label, size, detail }) => (
          <div key={size} className="space-y-1">
            <Button size={size} variant="fill" color="primary">
              {label}
            </Button>
            <Typography variant="bodyExtraSmall" tone="muted">
              {detail}
            </Typography>
          </div>
        ))}
      </div>
      <div>
        <Typography variant="bodySmall" tone="muted">
          Need block-level buttons?
        </Typography>
        <Button isFullSize color="secondary">
          Full width example
        </Button>
      </div>
    </div>
  </section>
);

export default SizeSection;
