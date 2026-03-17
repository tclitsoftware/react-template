import Typography from "components/typography";
import Button from "components/button";
import Icon from "components/icon";
import { useAppTranslation } from "locale/useAppTranslation";

const IconSection = () => {
  const { t } = useAppTranslation("button");

  return (
    <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
      <Typography variant="heading3">{t("icon-title")}</Typography>
      <Typography variant="bodySmall" tone="muted">
        {t("icon-description")}
      </Typography>
      <div className="flex flex-wrap gap-3 items-center">
        <Button iconLeft={<Icon name="arrow-left" size={16} />} color="primary">
          {t("icon-back")}
        </Button>
        <Button iconRight={<Icon name="arrow-right" size={16} />} color="secondary">
          {t("icon-continue")}
        </Button>
        <Button
          iconLeft={<Icon name="arrow-left" size={16} />}
          iconRight={<Icon name="arrow-right" size={16} />}
          variant="outline"
          color="info"
        >
          {t("icon-both-sides")}
        </Button>
      </div>
    </section>
  );
};

export default IconSection;
