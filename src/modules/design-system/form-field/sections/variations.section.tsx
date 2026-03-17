import React from "react";
import Typography from "components/typography";
import Input, { Textarea } from "components/input";
import Icon from "components/icon";
import { useAppTranslation } from "locale/useAppTranslation";

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

const VariationsSection = () => {
  const { t } = useAppTranslation("formField");

  return (
  <section className="border border-border rounded-xl bg-white p-6 space-y-6 shadow-sm">
    <Typography variant="heading3">{t("variations-title")}</Typography>
    <Typography variant="bodySmall" tone="muted">
      {t("variations-description")}
    </Typography>
    <div className="grid gap-5 md:grid-cols-2">
      <FieldExampleCard title={t("card-default-title")} helper={t("card-default-helper")}>
        <Input
          label={t("label")}
          placeholder={t("placeholder")}
          helperText={t("helper-text")}
          leftIcon={<Icon name="routing-2" size={16} />}
          rightIcon={<Icon name="close-circle" size={16} />}
        />
      </FieldExampleCard>
      <FieldExampleCard title={t("card-required-title")} helper={t("card-required-helper")}>
        <Input
          label={t("label")}
          placeholder={t("placeholder")}
          helperText={t("outlined-placeholder")}
          required
        />
      </FieldExampleCard>
      <FieldExampleCard title={t("card-disabled-title")} helper={t("card-disabled-helper")}>
        <Input
          label={t("label")}
          placeholder={t("placeholder")}
          helperText={t("disabled-helper")}
          disabled
          leftIcon={<Icon name="routing-2" size={16} />}
        />
      </FieldExampleCard>
      <FieldExampleCard title={t("card-textarea-title")} helper={t("card-textarea-helper")}>
        <Textarea
          label={t("notes-label")}
          placeholder={t("notes-placeholder")}
          helperText={t("notes-helper")}
        />
      </FieldExampleCard>
      <FieldExampleCard title={t("card-number-title")} helper={t("card-number-helper")}>
        <Input
          type="number"
          label={t("quantity-label")}
          placeholder="0"
          helperText={t("quantity-helper")}
          defaultValue="2500000"
          enableNumberFormat
        />
      </FieldExampleCard>
      <FieldExampleCard title={t("card-currency-title")} helper={t("card-currency-helper")}>
        <Input
          type="number"
          label={t("budget-label")}
          placeholder="0"
          helperText={t("budget-helper")}
          defaultValue="1500000"
          enableCurrencyFormat
          currency="IDR"
          locale="id-ID"
        />
      </FieldExampleCard>
    </div>
  </section>
  );
};

export default VariationsSection;
