import Typography from "components/typography";
import { useAppTranslation } from "locale/useAppTranslation";

const TranslationOverviewSection = () => {
  const { t: tTranslation } = useAppTranslation("translation");
  const { t: tGeneral } = useAppTranslation("general");
  const { t: tMenu } = useAppTranslation("menu");

  return (
    <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <Typography variant="heading3">
          {tTranslation("translation-section-title")}
        </Typography>
        <Typography variant="bodySmall" tone="muted">
          {tTranslation("translation-section-description")}
        </Typography>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-whiteScale-100 p-4">
          <Typography variant="bodyExtraSmall" tone="muted" className="uppercase tracking-[0.24em]">
            {tTranslation("general-namespace-label")}
          </Typography>
          <div className="mt-3 space-y-2">
            <Typography variant="bodyMedium">`general.save`</Typography>
            <Typography variant="bodySmall" tone="muted">
              {tGeneral("save")}
            </Typography>
            <Typography variant="bodyMedium">`translation.translation-example-body`</Typography>
            <Typography variant="bodySmall" tone="muted">
              {tTranslation("translation-example-body")}
            </Typography>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-whiteScale-100 p-4">
          <Typography variant="bodyExtraSmall" tone="muted" className="uppercase tracking-[0.24em]">
            {tTranslation("menu-namespace-label")}
          </Typography>
          <div className="mt-3 space-y-2">
            <Typography variant="bodyMedium">`menu.browser-title`</Typography>
            <Typography variant="bodySmall" tone="muted">
              {tMenu("browser-title")}
            </Typography>
            <Typography variant="bodyMedium">`translation.page-title`</Typography>
            <Typography variant="bodySmall" tone="muted">
              {tTranslation("page-title")}
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TranslationOverviewSection;
