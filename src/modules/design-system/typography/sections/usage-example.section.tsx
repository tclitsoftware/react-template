import Typography from "components/typography";

const UsageExampleSection = () => {
  const usageSnippet = `<Typography variant=\"heading3\" tone=\"primary\" weight=\"semibold\">Heading text</Typography>`;

  return (
    <section className="border border-border rounded-xl bg-white p-6 space-y-3 shadow-sm">
      <Typography variant="heading3">Usage example</Typography>
      <Typography variant="body" tone="muted">
        Use the shared <span className="font-semibold">Typography</span> component wherever you would
        rely on standard HTML elements and adjust the variant, tone, weight, and align props.
      </Typography>
      <pre className="rounded-lg bg-slate-900 p-4 text-sm text-white">
        <code>{usageSnippet}</code>
      </pre>
    </section>
  )
}

export default UsageExampleSection;
