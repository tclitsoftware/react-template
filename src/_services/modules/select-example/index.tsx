import { Api } from "_services/api";
import { SelectOption } from "components/select";

let dataset: SelectOption[] = [
  { value: "cust-123", label: "Ananda Putra Wijaya", subtitle: "CUST-123" },
  { value: "cust-124", label: "Ananda Putra Wijaya", subtitle: "CUST-124" },
  { value: "cust-125", label: "Ananda Putra Wijaya", subtitle: "CUST-125" },
  { value: "cust-126", label: "Ananda Putra Wijaya", subtitle: "CUST-126" },
  { value: "cust-127", label: "Ananda Putra Wijaya", subtitle: "CUST-127" },
  { value: "cust-128", label: "Ananda Putra Wijaya", subtitle: "CUST-128" },
  { value: "cust-129", label: "Ananda Putra Wijaya", subtitle: "CUST-129" },
  { value: "cust-130", label: "Ananda Putra Wijaya", subtitle: "CUST-130" },
  { value: "cust-131", label: "Ananda Putra Wijaya", subtitle: "CUST-131" },
  { value: "cust-132", label: "Ananda Putra Wijaya", subtitle: "CUST-132" },
];

const filterOptions = (term: string) => {
  const normalized = term.trim().toLowerCase();
  if (!normalized) return dataset;
  return dataset.filter((option) =>
    option.label.toLowerCase().includes(normalized) ||
    option.subtitle?.toLowerCase().includes(normalized),
  );
};

const slugifyValue = (term: string) =>
  term
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const SelectSearchApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    searchOptions: builder.query<SelectOption[], string>({
      queryFn: async (term: string) => ({
        data: filterOptions(term),
      }),
    }),
    createOption: builder.mutation<SelectOption, string>({
      queryFn: async (term: string) => {
        const normalizedTerm = term.trim();
        const existingOption = dataset.find(
          (option) =>
            option.label.toLowerCase() === normalizedTerm.toLowerCase() ||
            option.subtitle?.toLowerCase() === normalizedTerm.toLowerCase(),
        );

        if (existingOption) {
          return { data: existingOption };
        }

        const suffix = String(dataset.length + 123).padStart(3, "0");
        const nextOption: SelectOption = {
          value: slugifyValue(normalizedTerm) || `custom-${suffix}`,
          label: normalizedTerm,
          subtitle: `CUST-${suffix}`,
        };

        dataset = [nextOption, ...dataset];

        return { data: nextOption };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useCreateOptionMutation, useLazySearchOptionsQuery } = SelectSearchApi;
