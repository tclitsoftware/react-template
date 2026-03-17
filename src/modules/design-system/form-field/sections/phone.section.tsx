import Typography from "components/typography";
import PhoneInput from "components/input/phone-input";
import { useAppTranslation } from "locale/useAppTranslation";

const PhoneSection = () => {
  const { t } = useAppTranslation("formField");

  return (
    <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
      <Typography variant="heading3">{t("phone-title")}</Typography>
      <Typography variant="bodySmall" tone="muted">
        {t("phone-description")}
      </Typography>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Typography variant="heading6">{t("phone-default-title")}</Typography>
          <PhoneInput
            label={t("phone-label")}
            placeholder={t("phone-placeholder")}
            helperText={t("phone-helper")}
          />
        </div>
        <div className="space-y-2">
          <Typography variant="heading6">{t("phone-error-title")}</Typography>
          <PhoneInput
            label={t("phone-label")}
            placeholder={t("phone-placeholder")}
            error={{ type: "required", message: t("phone-required") }}
          />
        </div>
      </div>
    </section>
  );
};

export default PhoneSection;
