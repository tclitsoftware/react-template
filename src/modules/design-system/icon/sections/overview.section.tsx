import Icon from "components/icon";
import Typography from "components/typography";
import { useAppTranslation } from "locale/useAppTranslation";

const IconOverviewSection = () => {
  const { t } = useAppTranslation("icon");

  return <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <Icon name="information" size={36} />
        <Typography variant="heading3">{t("overview-title")}</Typography>
      </div>
      <Typography variant="bodySmall" tone="muted">
        {t("overview-description")}
      </Typography>
    </div>

    <div className="flex flex-wrap items-center gap-3 pt-2">
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-whiteScale-100">
        <Icon name="add" size={26} />
        <Typography variant="bodyMedium">{t("example-add")}</Typography>
      </div>
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-whiteScale-100">
        <Icon name="calendar-add" size={26} className="text-greyScale-80" />
        <Typography variant="bodyMedium">{t("example-schedule")}</Typography>
      </div>
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-whiteScale-100">
        <Icon name="message-text" size={26} />
        <Typography variant="bodyMedium">{t("example-comments")}</Typography>
      </div>
    </div>

    <Typography variant="bodySmall" tone="muted">
      {t("example-shortcut-title")}
    </Typography>
    <code className="">
      <Typography variant="code" className="block">
        &lt;Icon name=&#34;add&#34; size=&#123;26&#125; className=&#34;text-greyScale-80&#34; /&gt;
      </Typography>
    </code>
    <Typography variant="bodySmall" tone="muted">
      {t("example-override-title")}
    </Typography>
    <code className="">
      <Typography variant="code" className="block">
        &lt;Icon name=&#34;add&#34; size=&#123;26&#125; strokeColor=&#34;#224A8A&#34; /&gt;
      </Typography>
    </code>
  </section>;
};

export default IconOverviewSection;
