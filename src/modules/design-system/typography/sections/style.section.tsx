import Typography from "components/typography";
import { weightOptions, toneOptions, alignOptions } from "../constants";

const StyleSection = () => {
  return (
    <section className="border border-border rounded-xl bg-white p-6 space-y-5 shadow-sm">
      <Typography variant="heading3">Weights, tones, and alignments</Typography>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-3">
          <Typography variant="heading5" tone="primary" weight="semibold">
            Weights
          </Typography>
          <div className="grid grid-cols-2 gap-3">
            {weightOptions.map(({ weight, label }) => (
              <div
                key={weight}
                className="border border-border rounded-lg p-3 bg-slate-50"
              >
                <Typography variant="body" weight={weight} tone="black">
                  {label}
                </Typography>
                <Typography variant="bodyExtraSmall" tone="muted">
                  {weight}
                </Typography>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <Typography variant="heading5" tone="primary" weight="semibold">
            Tones
          </Typography>
          <div className="grid grid-cols-2 gap-3">
            {toneOptions.map(({ tone, label }) => (
              <div
                key={tone}
                className="border border-border rounded-lg p-3"
              >
                <Typography variant="body" tone={tone} weight="bold">
                  {label}
                </Typography>
                <Typography variant="bodyExtraSmall" tone="muted">
                  {`tone="${tone}"`}
                </Typography>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <Typography variant="heading5" tone="primary" weight="semibold">
            Alignments
          </Typography>
          <div className="space-y-3">
            {alignOptions.map(({ align, label }) => (
              <div
                key={align}
                className="border border-border rounded-lg p-3 bg-white"
              >
                <Typography
                  variant="body"
                  align={align}
                  tone="black"
                  weight="medium"
                  className="w-full"
                >
                  {label} aligned text
                </Typography>
                <Typography variant="bodyExtraSmall" tone="muted">
                  {`align="${align}"`}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StyleSection;