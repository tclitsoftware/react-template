import Typography from "components/typography";
import Button from "components/button";
import { useAppTranslation } from "locale/useAppTranslation";
import { buttonSizes } from "../constants";

const SizeSection = () => {
  const { t } = useAppTranslation("button");

  return (
    <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
      <Typography variant="heading3">{t("sizes-title")}</Typography>
      <Typography variant="bodySmall" tone="muted">
        {t("sizes-description")}
      </Typography>
      <div className="flex flex-col gap-3">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {buttonSizes.map(({ labelKey, size, detail }) => (
            <div key={size} className="space-y-1">
              <Button size={size} variant="fill" color="primary">
                {t(labelKey as never)}
              </Button>
              <Typography variant="bodyExtraSmall" tone="muted">
                {detail}
              </Typography>
            </div>
          ))}
        </div>
        <div>
          <Typography variant="bodySmall" tone="muted">
            {t("sizes-full-width-title")}
          </Typography>
          <Button isFullSize color="secondary">
            {t("sizes-full-width-example")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SizeSection;
