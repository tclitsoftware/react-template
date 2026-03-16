import { Table } from "components/table";
import Typography from "components/typography";
import { CustomerRow } from "_services/modules/table-example";
import useTables from "./useTables";

export const tablesPageRouteName = "/components/tables";

const TablesPage = () => {
  const {
    columns,
    sortState,
    filterValues,
    queryParams,
    data,
    isFetching,
    error,
    selectedKeys,
    setSelectedKeys,
    setSortState,
    setFilterValues,
  } = useTables();

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <Typography variant="bodyExtraSmall" tone="muted" className="uppercase tracking-[0.24em]">
            Table
          </Typography>
          <Typography variant="bodySmall" tone="muted">
            Filters and sorting are controlled from the page state only. In production, this state should be passed into RTK Query request params and the endpoint should return the next rows.
          </Typography>
          <div className="mt-2 rounded-xl bg-whiteScale-90 p-4">
            <Typography variant="bodyExtraSmall" tone="muted">
              Current request params
            </Typography>
            <Typography variant="code" className="mt-1 block whitespace-pre-wrap">
              {JSON.stringify(
                queryParams,
                null,
                2,
              )}
            </Typography>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <Table<CustomerRow>
          data={data?.items ?? []}
          columns={columns}
          rowKey="id"
          selectable
          selectedRowKeys={selectedKeys}
          onSelectedRowKeysChange={(keys) => setSelectedKeys(keys)}
          enableColumnDrag
          sortState={sortState}
          onSortStateChange={setSortState}
          filterValues={filterValues}
          onFilterValuesChange={setFilterValues}
          loading={isFetching}
          error={error ? "Failed to load table data" : ""}
        />
      </section>
    </div>
  );
};

export default TablesPage;
