import { useCallback, useEffect, useState } from "react";
import Typography from "components/typography";
import Select from "components/select";
import { useLazySearchOptionsQuery } from "../selects.api";

const SearchableSelectSection = () => {
  const [trigger, { data, isFetching }] = useLazySearchOptionsQuery();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    trigger("");
  }, [trigger]);

  const handleSearch = useCallback(
    async (term: string) => {
      const response = await trigger(term).unwrap();
      return response;
    },
    [trigger],
  );

  return (
    <section className="border border-border rounded-xl bg-white p-6 space-y-4 shadow-sm">
      <Typography variant="heading3">Searchable select</Typography>
      <Typography variant="bodySmall" tone="muted">
        Multiselect dropdown can fetch filtered options via RTK Query (mocks from the Api slice).
      </Typography>
      <Select
        label="Team"
        helperText="Type to search, multi-select enabled"
        options={data ?? []}
        multiple
        searchable
        loading={isFetching}
        onSearch={handleSearch}
        value={selected}
        onValueChange={(next) =>
          setSelected(Array.isArray(next) ? next : next ? [next] : [])
        }
        noOptionsText="Try another keyword"
      />
      <Typography variant="body" tone="muted">
        Selected: {selected.length ? selected.join(", ") : "none"}
      </Typography>
    </section>
  );
};

export default SearchableSelectSection;
