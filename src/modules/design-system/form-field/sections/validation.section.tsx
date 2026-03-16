import Typography from "components/typography";
import Input, { Textarea } from "components/input";

const ValidationSection = () => (
  <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
    <Typography variant="heading3">Validation states</Typography>
    <Typography variant="bodySmall" tone="muted">
      Inputs display an error border and helper copy when a validation message exists.
    </Typography>
    <div className="flex flex-col gap-4">
      <Input
        label="Label"
        placeholder="Placeholder"
        error={{ type: "required", message: "This field is required" }}
      />
      <Input
        label="Label"
        placeholder="Placeholder"
        helperText="Helper text combined with the error state"
        error={{ type: "required", message: "Cannot be blank" }}
      />
      <Textarea label="Label" error={{ type: "required", message: "Cannot be blank"}} />
    </div>
  </section>
);

export default ValidationSection;
