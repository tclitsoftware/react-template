import Typography from "components/typography"
import ColorSwatch from "../components/color-swatch.component"
import { scalePalettes } from "../constants"

const GrayScaleSection = () => {
  return (
    <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
      <Typography variant="heading3">Grey scales</Typography>
      <Typography variant="bodySmall" tone="muted">
        Neutral scales for typography-heavy areas and surfaces.
      </Typography>
      <div className="grid gap-6">
        {scalePalettes.map((palette) => (
          <div key={palette.name} className="space-y-3">
            <Typography variant="heading5" weight="semibold">
              {palette.name}
            </Typography>
            <Typography variant="bodySmall" tone="muted">
              {palette.description}
            </Typography>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {palette.shades.map((shade) => (
                <ColorSwatch
                  key={`${palette.name}-${shade.label}`}
                  label={shade.label}
                  value={shade.value}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default GrayScaleSection