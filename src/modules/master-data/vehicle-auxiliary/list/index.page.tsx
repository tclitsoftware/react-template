import Button from "components/button";
import { Pagination, Table } from "components/table";
import Typography from "components/typography";

import { useAppTranslation } from "locale/useAppTranslation";
import useVehicleAuxiliaryList from "./useVehicleAuxiliaryList";
import CreateVehicleAuxiliarySection from "./sections/create.section";

export const vehicleAuxiliaryPageRouteName =
  "/master-data/vehicle-auxiliary";

const VehicleAuxiliaryListPage = () => {
  const { t } = useAppTranslation("vehicleAuxiliary");

  const {
    columns,
    data,
    categoryOptions,
    isFetching,
    error,
    refetch,
    queryParams,
    metadata,
    page,
    size,
    setPage,
    selectedKeys,
    setSelectedKeys,
    sortState,
    setSortState,
    filterValues,
    setFilterValues,
    handleBulkStatusUpdate,
    isActivating,
    isDeactivating,
  } = useVehicleAuxiliaryList();

  const currentPage = metadata?.current_page ?? page;
  const totalPage = metadata?.total_page ?? 1;
  const totalItem = metadata?.total_item ?? data.length;

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <Typography
            variant="bodyExtraSmall"
            tone="muted"
            className="uppercase tracking-[0.24em]"
          >
            {t("masterData")}
          </Typography>

          <h1 className="text-2xl font-semibold text-text-primary">
            {t("title")}
          </h1>

          <Typography variant="bodySmall" tone="muted">
            {t("listDescription")}
          </Typography>

          <div className="mt-4 rounded-xl bg-whiteScale-90 p-4">
            <Typography variant="bodyExtraSmall" tone="muted">
              {t("queryParams")}
            </Typography>

            <Typography
              variant="code"
              className="mt-1 block whitespace-pre-wrap"
            >
              {JSON.stringify(queryParams, null, 2)}
            </Typography>
          </div>
        </div>
      </section>

      <CreateVehicleAuxiliarySection
        onSuccess={refetch}
        categoryOptions={categoryOptions}
      />

      <section className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          color="primary"
          onClick={() => handleBulkStatusUpdate("activate")}
          disabled={isActivating}
        >
          {isActivating ? t("activating") : t("activateSelected")}
        </Button>

        <Button
          type="button"
          variant="outline"
          color="error"
          onClick={() => handleBulkStatusUpdate("deactivate")}
          disabled={isDeactivating}
        >
          {isDeactivating
            ? t("deactivating")
            : t("deactivateSelected")}
        </Button>
      </section>

      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <Table
          data={data}
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
          error={error ? t("failedLoadData") : ""}
          selectableLabel={t("selectAll")}
          currentPage={page}
          limit={size}
        />

        <div className="mt-6 flex items-center justify-between">
          <Typography variant="bodySmall" tone="muted">
            {t("showingPage", {
              currentPage,
              totalPage,
              totalItem,
            })}
          </Typography>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={setPage}
          />
        </div>
      </section>
    </div>
  );
};

export default VehicleAuxiliaryListPage;