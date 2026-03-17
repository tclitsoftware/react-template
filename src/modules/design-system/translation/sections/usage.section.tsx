import Typography from "components/typography";
import { translate } from "locale/translate";
import { useAppTranslation } from "locale/useAppTranslation";

const reactUsageSnippet = `import { useAppTranslation } from "locale/useAppTranslation";

const Example = () => {
  const { t } = useAppTranslation("menu");

  return <span>{t("browser-title")}</span>;
};`;

const helperUsageSnippet = `import { translate } from "locale/translate";

const browserTitle = translate("menu", "browser-title");`;

const TranslationUsageSection = () => {
  const { t } = useAppTranslation("translation");

  return (
    <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <Typography variant="heading3">
          {t("translation-example-title")}
        </Typography>
        <Typography variant="bodySmall" tone="muted">
          {t("translation-example-body")}
        </Typography>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-whiteScale-100 p-4">
          <Typography variant="bodyExtraSmall" tone="muted" className="uppercase tracking-[0.24em]">
            {t("react-example-label")}
          </Typography>
          <Typography variant="code" className="mt-3 block whitespace-pre-wrap">
            {reactUsageSnippet}
          </Typography>
        </div>

        <div className="rounded-xl border border-border bg-whiteScale-100 p-4">
          <Typography variant="bodyExtraSmall" tone="muted" className="uppercase tracking-[0.24em]">
            {t("helper-example-label")}
          </Typography>
          <Typography variant="code" className="mt-3 block whitespace-pre-wrap">
            {helperUsageSnippet}
          </Typography>
          <div className="mt-4 rounded-lg border border-border bg-white p-3">
            <Typography variant="bodySmall" tone="muted">
              {t("helper-output-label")}
            </Typography>
            <Typography variant="bodyMedium" className="mt-1">
              {translate("menu", "browser-title")}
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TranslationUsageSection;
