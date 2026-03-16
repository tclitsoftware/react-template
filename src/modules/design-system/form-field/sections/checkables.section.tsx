import Checkbox from "components/checkbox";
import Radio from "components/radio";
import Typography from "components/typography";

const CheckablesSection = () => (
  <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
    <Typography variant="heading3">Checkboxes & radios</Typography>
    <Typography variant="bodySmall" tone="muted">
      Keep helper text aligned under the group and use the same tokens for disabled states.
    </Typography>
    <div className="space-y-4">
      <div className="space-y-2 rounded-[16px] border-2 border-dashed border-primary-500/70 bg-white p-4">
        <Typography variant="heading6" className="text-primary-600">
          Check Box
        </Typography>
        <div className="flex items-center gap-3">
          <Checkbox />
          <Checkbox defaultChecked />
          <Checkbox indeterminate />
          <Checkbox disabled />
          <Checkbox defaultChecked disabled />
        </div>
      </div>
      <div className="space-y-2 rounded-[16px] border-2 border-dashed border-primary-500/70 bg-white p-4">
        <Typography variant="heading6" className="text-primary-600">
          Radio Button
        </Typography>
        <div className="flex items-center gap-3">
          <Radio />
          <Radio defaultChecked />
          <Radio disabled />
          <Radio defaultChecked disabled />
        </div>
      </div>
    </div>
  </section>
);

export default CheckablesSection;
