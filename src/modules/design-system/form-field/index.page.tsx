import Typography from "components/typography";
import useFormField from "./useFormField";
import CheckablesSection from "./sections/checkables.section";
import PhoneSection from "./sections/phone.section";
import SearchableSelectSection from "./sections/searchable.select.section";
import ValidationSection from "./sections/validation.section";
import VariationsSection from "./sections/variations.section";
import SelectSection from "./sections/select.section";

export const formFieldPageRouteName = "/components/form-field";

const FormFieldPage = () => {
  useFormField();

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <VariationsSection />
        <ValidationSection />
      </div>
      <PhoneSection />
      <SelectSection />
      <SearchableSelectSection />
      <CheckablesSection />
    </div>
  );
};

export default FormFieldPage;
