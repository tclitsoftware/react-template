import React from "react";
import Typography from "components/typography";
import Input, { Textarea } from "components/input";
import Icon from "components/icon";

const FieldExampleCard = ({
  title,
  helper,
  children,
}: {
  title: string;
  helper: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2 rounded-xl border border-border bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
    <div className="flex items-center justify-between">
      <Typography variant="heading6">{title}</Typography>
      <Typography variant="bodyExtraSmall" tone="muted">
        {helper}
      </Typography>
    </div>
    {children}
  </div>
);

const VariationsSection = () => (
  <section className="border border-border rounded-xl bg-white p-6 space-y-6 shadow-sm">
    <Typography variant="heading3">Field variations</Typography>
    <Typography variant="bodySmall" tone="muted">
      Inputs share the same rounded container, focus ring, and helper text placement shown in the design reference.
    </Typography>
    <div className="grid gap-5 md:grid-cols-2">
      <FieldExampleCard title="Default" helper="With icons">
        <Input
          label="Label"
          placeholder="Placeholder"
          helperText="Helper text"
          leftIcon={<Icon name="routing-2" size={16} />}
          rightIcon={<Icon name="close-circle" size={16} />}
        />
      </FieldExampleCard>
      <FieldExampleCard title="Required" helper="Helper text + star">
        <Input
          label="Label"
          placeholder="Placeholder"
          helperText="Outlined placeholder"
          required
        />
      </FieldExampleCard>
      <FieldExampleCard title="Disabled" helper="WhiteScale fallback">
        <Input
          label="Label"
          placeholder="Placeholder"
          helperText="Disabled fields use whiteScale tokens"
          disabled
          leftIcon={<Icon name="routing-2" size={16} />}
        />
      </FieldExampleCard>
      <FieldExampleCard title="Textarea" helper="3 rows default">
        <Textarea
          label="Notes"
          placeholder="Enter detailed information"
          helperText="Defaults to 3 rows"
        />
      </FieldExampleCard>
      <FieldExampleCard title="Number format" helper="Raw value, formatted display">
        <Input
          type="number"
          label="Quantity"
          placeholder="0"
          helperText="Shows thousand separators while keeping the raw numeric value in onChange"
          defaultValue="2500000"
          enableNumberFormat
        />
      </FieldExampleCard>
      <FieldExampleCard title="Currency format" helper="Locale-aware currency">
        <Input
          type="number"
          label="Budget"
          placeholder="0"
          helperText="Uses IDR formatting by default when currency mode is enabled"
          defaultValue="1500000"
          enableCurrencyFormat
          currency="IDR"
          locale="id-ID"
        />
      </FieldExampleCard>
    </div>
  </section>
);

export default VariationsSection;
