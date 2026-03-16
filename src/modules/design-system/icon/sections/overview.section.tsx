import Icon from "components/icon";
import Typography from "components/typography";

const IconOverviewSection = () =>
  <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <Icon name="information" size={36} />
        <Typography variant="heading3">Icon usage</Typography>
      </div>
      <Typography variant="bodySmall" tone="muted">
        Reference any SVG under <code className="font-mono">src/assets/icons</code> by its file name (without the extension). The
        exported <code className="font-mono">Icon</code> component accepts size and color overrides so you can adapt to different
        contexts without editing the SVG source.
      </Typography>
    </div>

    <div className="flex flex-wrap items-center gap-3 pt-2">
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-whiteScale-100">
        <Icon name="add" size={26} />
        <Typography variant="bodyMedium">Add item</Typography>
      </div>
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-whiteScale-100">
        <Icon name="calendar-add" size={26} className="text-greyScale-80" />
        <Typography variant="bodyMedium">Schedule</Typography>
      </div>
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-whiteScale-100">
        <Icon name="message-text" size={26} />
        <Typography variant="bodyMedium">Comments</Typography>
      </div>
    </div>

    <Typography variant="bodySmall" tone="muted">
      Example shortcut
    </Typography>
    <code className="">
      <Typography variant="code" className="block">
        &lt;Icon name=&#34;add&#34; size=&#123;26&#125; className=&#34;text-greyScale-80&#34; /&gt;
      </Typography>
    </code>
    <Typography variant="bodySmall" tone="muted">
      {`Or (but not recommended)`}
    </Typography>
    <code className="">
      <Typography variant="code" className="block">
        &lt;Icon name=&#34;add&#34; size=&#123;26&#125; strokeColor=&#34;#224A8A&#34; /&gt;
      </Typography>
    </code>
  </section>
  ;

export default IconOverviewSection;
