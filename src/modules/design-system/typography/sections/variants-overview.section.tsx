import Typography from "components/typography"
import { useAppTranslation } from "locale/useAppTranslation";
import { variantDetails } from "../constants"

const VariantOverviewSection = () => {
  const { t } = useAppTranslation("typography");
  return (
    <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
      <Typography variant="heading3">{t("variants-title")}</Typography>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {variantDetails.map((variant) => (
          <div
            key={variant.variant}
            className="border border-border rounded-lg p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
          >
            <Typography
              variant={variant.variant}
              tone="primary"
              weight="semibold"
            >
              {t(variant.labelKey as never)}
            </Typography>
            <Typography variant="bodySmall" tone="muted">
              {t(variant.descriptionKey as never)}
            </Typography>
          </div>
        ))}
      </div>
    </section>
  )
}

export default VariantOverviewSection;
