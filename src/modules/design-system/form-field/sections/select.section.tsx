import Typography from "components/typography";
import Select from "components/select";

const selectOptions = [
  { value: "data-1", label: "Data 1" },
  { value: "data-2", label: "Data 2" },
  { value: "data-3", label: "Data 3" },
  { value: "data-4", label: "Data 4" },
  { value: "data-5", label: "Data 5" },
];

const SelectSection = () => (
  <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
    <Typography variant="heading3">Selects & menus</Typography>
    <Typography variant="bodySmall" tone="muted">
      Use the same rounded border, focus ring, and helper alignment for dropdowns.
    </Typography>
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Typography variant="heading6">Default select</Typography>
        <Select
          label="Label"
          helperText="Helper text"
          options={selectOptions}
          defaultValue="data-1"
        />
      </div>
      <div className="space-y-2">
        <Typography variant="heading6">Disabled select</Typography>
        <Select
          label="Label"
          options={[{ value: "disabled", label: "Disabled" }]}
          disabled
        />
      </div>
      <div className="space-y-2">
        <Typography variant="heading6">Error select</Typography>
        <Select
          label="Label"
          options={[{ value: "error", label: "Error" }]}
          error={{ type: "required", message: "Phone number is required" }}
        />
      </div>
      <div className="space-y-2">
        <Typography variant="heading6">Multiple select</Typography>
        <Select
          label="Label"
          options={selectOptions}
          multiple
        />
      </div>
    </div>
  </section>
);

export default SelectSection;
