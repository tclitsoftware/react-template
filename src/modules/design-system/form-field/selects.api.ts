import { Api } from "_services/api";
import { SelectOption } from "components/select";

const dataset: SelectOption[] = [
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
    option.label.toLowerCase().includes(normalized),
  );
};

export const SelectSearchApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    searchOptions: builder.query<SelectOption[], string>({
      queryFn: async (term: string) => ({
        data: filterOptions(term),
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazySearchOptionsQuery } = SelectSearchApi;
