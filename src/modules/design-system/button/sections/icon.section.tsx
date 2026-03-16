import Typography from "components/typography";
import Button from "components/button";
import Icon from "components/icon";

const IconSection = () => (
  <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
    <Typography variant="heading3">Icon support</Typography>
    <Typography variant="bodySmall" tone="muted">
      Buttons can render an icon on either side while maintaining the 5px gap defined in the component.
    </Typography>
    <div className="flex flex-wrap gap-3 items-center">
      <Button iconLeft={<Icon name="arrow-left" size={16} />} color="primary">
        Back
      </Button>
      <Button iconRight={<Icon name="arrow-right" size={16} />} color="secondary">
        Continue
      </Button>
      <Button
        iconLeft={<Icon name="arrow-left" size={16} />}
        iconRight={<Icon name="arrow-right" size={16} />}
        variant="outline"
        color="info"
      >
        Both sides
      </Button>
    </div>
  </section>
);

export default IconSection;
