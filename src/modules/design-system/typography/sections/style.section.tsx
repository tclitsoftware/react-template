import Typography from "components/typography";
import { useAppTranslation } from "locale/useAppTranslation";
import { weightOptions, toneOptions, alignOptions } from "../constants";

const StyleSection = () => {
  const { t } = useAppTranslation("typography");
  return (
    <section className="border border-border rounded-xl bg-white p-6 space-y-5 shadow-sm">
      <Typography variant="heading3">{t("styles-title")}</Typography>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-3">
          <Typography variant="heading5" tone="primary" weight="semibold">
            {t("styles-weights-title")}
          </Typography>
          <div className="grid grid-cols-2 gap-3">
            {weightOptions.map(({ weight, labelKey }) => (
              <div
                key={weight}
                className="border border-border rounded-lg p-3 bg-slate-50"
              >
                <Typography variant="body" weight={weight} tone="black">
                  {t(labelKey as never)}
                </Typography>
                <Typography variant="bodyExtraSmall" tone="muted">
                  {weight}
                </Typography>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <Typography variant="heading5" tone="primary" weight="semibold">
            {t("styles-tones-title")}
          </Typography>
          <div className="grid grid-cols-2 gap-3">
            {toneOptions.map(({ tone, labelKey }) => (
              <div
                key={tone}
                className="border border-border rounded-lg p-3"
              >
                <Typography variant="body" tone={tone} weight="bold">
                  {t(labelKey as never)}
                </Typography>
                <Typography variant="bodyExtraSmall" tone="muted">
                  {`tone="${tone}"`}
                </Typography>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <Typography variant="heading5" tone="primary" weight="semibold">
            {t("styles-alignments-title")}
          </Typography>
          <div className="space-y-3">
            {alignOptions.map(({ align, labelKey }) => (
              <div
                key={align}
                className="border border-border rounded-lg p-3 bg-white"
              >
                <Typography
                  variant="body"
                  align={align}
                  tone="black"
                  weight="medium"
                  className="w-full"
                >
                  {`${t(labelKey as never)} ${t("aligned-text")}`}
                </Typography>
                <Typography variant="bodyExtraSmall" tone="muted">
                  {`align="${align}"`}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StyleSection;
