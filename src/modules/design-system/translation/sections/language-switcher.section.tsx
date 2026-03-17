import Button from "components/button";
import Typography from "components/typography";
import { useAppTranslation } from "locale/useAppTranslation";
import { useLanguageSwitcher } from "locale/useLanguageSwitcher";

const LanguageSwitcherSection = () => {
  const { t } = useAppTranslation("translation");
  const { currentLanguage, languages, setLanguage } = useLanguageSwitcher();

  return (
    <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <Typography variant="heading3">
          {t("language-switcher-title")}
        </Typography>
        <Typography variant="bodySmall" tone="muted">
          {t("language-switcher-description")}
        </Typography>
      </div>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="rounded-xl border border-border bg-whiteScale-100 px-4 py-3">
          <Typography variant="bodyExtraSmall" tone="muted" className="uppercase tracking-[0.24em]">
            {t("current-language-label")}
          </Typography>
          <Typography variant="bodyMedium" className="mt-2">
            {languages.find((language) => language.value === currentLanguage)?.label}
          </Typography>
        </div>

        <div className="flex flex-wrap gap-3">
          {languages.map((language) => (
            <Button
              key={language.value}
              type="button"
              variant={language.active ? "fill" : "outline"}
              color="secondary"
              size="medium"
              onClick={() => setLanguage(language.value)}
            >
              {language.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguageSwitcherSection;
