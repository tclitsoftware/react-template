import Typography from "components/typography";
import { useAppTranslation } from "locale/useAppTranslation";

const UsageExampleSection = () => {
  const { t } = useAppTranslation("typography");
  const usageSnippet = `<Typography variant=\"heading3\" tone=\"primary\" weight=\"semibold\">${t("usage-example-text")}</Typography>`;

  return (
    <section className="border border-border rounded-xl bg-white p-6 space-y-3 shadow-sm">
      <Typography variant="heading3">{t("usage-title")}</Typography>
      <Typography variant="body" tone="muted">
        {t("usage-description")}
      </Typography>
      <pre className="rounded-lg bg-slate-900 p-4 text-sm text-white">
        <code>{usageSnippet}</code>
      </pre>
    </section>
  )
}

export default UsageExampleSection;
