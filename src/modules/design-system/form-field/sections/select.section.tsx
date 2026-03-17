import Typography from "components/typography";
import Select from "components/select";
import { useAppTranslation } from "locale/useAppTranslation";

const SelectSection = () => {
  const { t } = useAppTranslation("formField");
  const selectOptions = [
    { value: "data-1", label: t("data-1") },
    { value: "data-2", label: t("data-2") },
    { value: "data-3", label: t("data-3") },
    { value: "data-4", label: t("data-4") },
    { value: "data-5", label: t("data-5") },
  ];

  return (
    <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
      <Typography variant="heading3">{t("select-title")}</Typography>
      <Typography variant="bodySmall" tone="muted">
        {t("select-description")}
      </Typography>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Typography variant="heading6">{t("select-default-title")}</Typography>
          <Select
            label={t("label")}
            helperText={t("helper-text")}
            options={selectOptions}
            defaultValue="data-1"
          />
        </div>
        <div className="space-y-2">
          <Typography variant="heading6">{t("select-disabled-title")}</Typography>
          <Select
            label={t("label")}
            options={[{ value: "disabled", label: t("disabled-option") }]}
            disabled
          />
        </div>
        <div className="space-y-2">
          <Typography variant="heading6">{t("select-error-title")}</Typography>
          <Select
            label={t("label")}
            options={[{ value: "error", label: t("error-option") }]}
            error={{ type: "required", message: t("phone-required") }}
          />
        </div>
        <div className="space-y-2">
          <Typography variant="heading6">{t("select-multiple-title")}</Typography>
          <Select
            label={t("label")}
            options={selectOptions}
            multiple
          />
        </div>
      </div>
    </section>
  );
};

export default SelectSection;
