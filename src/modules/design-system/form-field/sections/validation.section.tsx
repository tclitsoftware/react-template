import Typography from "components/typography";
import Input, { Textarea } from "components/input";
import { useAppTranslation } from "locale/useAppTranslation";

const ValidationSection = () => {
  const { t } = useAppTranslation("formField");

  return (
    <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
      <Typography variant="heading3">{t("validation-title")}</Typography>
      <Typography variant="bodySmall" tone="muted">
        {t("validation-description")}
      </Typography>
      <div className="flex flex-col gap-4">
        <Input
          label={t("label")}
          placeholder={t("placeholder")}
          error={{ type: "required", message: t("this-field-required") }}
        />
        <Input
          label={t("label")}
          placeholder={t("placeholder")}
          helperText={t("helper-with-error")}
          error={{ type: "required", message: t("cannot-be-blank") }}
        />
        <Textarea label={t("label")} error={{ type: "required", message: t("cannot-be-blank")}} />
      </div>
    </section>
  );
};

export default ValidationSection;
