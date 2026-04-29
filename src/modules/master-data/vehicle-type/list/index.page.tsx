import { useAppTranslation } from "locale/useAppTranslation";
import { Table } from "components/table";
import useVehicleTypeTable from "./useVehicleTypeTable";
import { MegaWrapperWrapperVehicleTypeRes as VehicleTypeRow } from "_services/modules/vehicleTypeWrapper";
import SelectionActionBar from "./SelectionActionBar";
import { Pagination } from "components/table";
import { useNavigate } from "react-router-dom";
import { vehicleTypeCreatePageRouteName } from "../create/index.page";

export const vehicleTypePageRouteName = "/master-data/vehicle-type";

const VehicleTypePage = () => {
  const navigate = useNavigate();
  const { t } = useAppTranslation("tables");
  const {
    columns,
    data,
    isFetching,
    error,
    page,
    setPage,
    totalPage,
    sortState,
    queryParams,
    setSortState,
    filterValues,
    setFilterValues,
    selectedKeys,
    setSelectedKeys,
    onBulkActivate,
    onBulkDeactivate,
    isBulkProcessing,
  } = useVehicleTypeTable();

  const onBatchEdit = () => {
    const selectedData = data?.vehicle_types?.filter((item: VehicleTypeRow) =>
      selectedKeys.includes(item.id!),
    );
    navigate("/master-data/vehicle-type/edit", { state: { items: selectedData } });
  };

  return (
    <div className="flex flex-col gap-6">
      <SelectionActionBar
        selectedCount={selectedKeys.length}
        onActivate={onBulkActivate}
        onDeactivate={onBulkDeactivate}
        isProcessing={isBulkProcessing}
        onAdd={() => navigate(vehicleTypeCreatePageRouteName)}
        onBatchEdit={onBatchEdit}
      />

      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <Table<VehicleTypeRow>
          data={data?.vehicle_types ?? []}
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
          error={error ? t("error-load") : ""}
          selectableLabel={t("select-all")}
          skeletonRowsCount={10}
        />
        <div className="mt-6 flex justify-end">
          <Pagination currentPage={page} totalPages={totalPage} onPageChange={setPage}></Pagination>
        </div>
      </section>
    </div>
  );
};

export default VehicleTypePage;
