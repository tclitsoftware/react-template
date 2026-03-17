import Icon, { IconName, iconNames } from "components/icon";
import Typography from "components/typography";
import { useAppTranslation } from "locale/useAppTranslation";

const previewIcons: IconName[] = iconNames.filter(icon => !icon.includes("/")).sort();

const IconGallerySection = () => {
  const { t } = useAppTranslation("icon");
  return (
    <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
      <div className="flex flex-col gap-2">
        <Typography variant="heading3">{t("gallery-title")}</Typography>
        <Typography variant="bodySmall" tone="muted">
          {t("gallery-description")}
        </Typography>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {previewIcons.map((name) => (
          <div
            key={name}
            className="flex items-center gap-3 rounded-xl border border-border bg-whiteScale-100 px-4 py-3"
          >
            <div className="grid h-12 w-12 place-items-center rounded-lg border border-border bg-white">
              <Icon name={name} size={28} />
            </div>
            <div className="flex flex-col">
              <Typography variant="body" weight="medium">
                {name}
              </Typography>
              <Typography variant="bodyMedium" tone="muted">
                {`${name}.svg`}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default IconGallerySection;
