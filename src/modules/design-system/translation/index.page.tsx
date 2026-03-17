import LanguageSwitcherSection from "./sections/language-switcher.section";
import TranslationOverviewSection from "./sections/overview.section";
import TranslationUsageSection from "./sections/usage.section";
import useTranslationSystem from "./useTranslationSystem";

export const translationPageRouteName = "/components/translations";

const TranslationPage = () => {
  useTranslationSystem();

  return (
    <div className="flex flex-col gap-8">
      <LanguageSwitcherSection />
      <TranslationOverviewSection />
      <TranslationUsageSection />
    </div>
  );
};

export default TranslationPage;
