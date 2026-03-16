import Typography from "components/typography";
import PhoneInput from "components/input/phone-input";

const PhoneSection = () => (
  <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
    <Typography variant="heading3">Phone number field</Typography>
    <Typography variant="bodySmall" tone="muted">
      Combines the text-field styling with a country selector that defaults to +62 but is easy to extend.
    </Typography>
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Typography variant="heading6">Default state</Typography>
        <PhoneInput
          label="Phone number"
          placeholder="Enter number"
          helperText="Helper text goes here"
        />
      </div>
      <div className="space-y-2">
        <Typography variant="heading6">Error state</Typography>
        <PhoneInput
          label="Phone number"
          placeholder="Enter number"
          error={{ type: "required", message: "Phone number is required" }}
        />
      </div>
    </div>
  </section>
);

export default PhoneSection;
