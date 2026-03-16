
import useTypography from "./useTypography";
import VariantOverviewSection from "./sections/variants-overview.section";
import StyleSection from "./sections/style.section";
import UsageExampleSection from "./sections/usage-example.section";

export const typographyPageRouteName = '/components/typography';
const TypographyPage = () => {
  useTypography();

  return (
    <div className="flex flex-col gap-8">
      <VariantOverviewSection />
      <StyleSection />
      <UsageExampleSection />      
    </div>
  )
}

export default TypographyPage;