import Typography from "components/typography";
import Button from "components/button";
import { useAppTranslation } from "locale/useAppTranslation";
import { outlineColors } from "../constants";

const OutlineSection = () => {
  const { t } = useAppTranslation("button");

  return (
    <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
      <Typography variant="heading3">{t("outline-title")}</Typography>
      <Typography variant="bodySmall" tone="muted">
        {t("outline-description")}
      </Typography>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {outlineColors.map((color) => (
          <Button key={color} variant="outline" color={color}>
            {`${t(`color-${color}` as never)} ${t("outline-suffix")}`}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" color="primary">
          {t("outline-primary")}
        </Button>
        <Button variant="outline" color="primary" disabled>
          {t("outline-disabled")}
        </Button>
      </div>
    </section>
  );
};

export default OutlineSection;
