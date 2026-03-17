import Typography from "components/typography";
import Button from "components/button";
import { useAppTranslation } from "locale/useAppTranslation";
import { fillColors } from "../constants";

const FillSection = () => {
  const { t } = useAppTranslation("button");

  return (
    <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
      <Typography variant="heading3">{t("fill-title")}</Typography>
      <Typography variant="bodySmall" tone="muted">
        {t("fill-description")}
      </Typography>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {fillColors.map((color) => (
          <Button key={color} color={color}>
            {`${t(`color-${color}` as never)} ${t("fill-suffix")}`}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <Button color="primary">{t("fill-primary")}</Button>
        <Button color="primary" disabled>
          {t("fill-disabled")}
        </Button>
      </div>
    </section>
  );
};

export default FillSection;
