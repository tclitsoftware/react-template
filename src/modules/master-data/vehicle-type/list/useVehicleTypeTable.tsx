import {
  useMegaWrapperServiceV1ListVehicleTypesQuery,
  MegaWrapperWrapperVehicleTypeRes as VehicleTypeRow,
} from "_services/modules/vehicleTypeWrapper";
import Button from "components/button";
import Icon from "components/icon";
import Input from "components/input";
import { TableSortState, Columns } from "components/table";
import { useEffect, useMemo, useState } from "react";
import { useAppTranslation } from "locale/useAppTranslation";
import { useAppDispatch } from "store";
import { setGlobalComponent } from "store/global-components";
import {
  useMegaVehicleTypeServiceV1ActivateVehicleTypesMutation,
  useMegaVehicleTypeServiceV1DeactivateVehicleTypesMutation,
  useMegaVehicleTypeServiceV1ListVehicleTypeCategoriesQuery,
  useMegaVehicleTypeServiceV1ListVehicleTypeTempTypesQuery,
} from "_services/modules/vehicleTypeApi";

const statusClasses: Record<NonNullable<VehicleTypeRow["status"]>, string> = {
  active: "bg-primary-600 border-2 border-primary-100",
  inactive: "bg-greyScale-60 border-2 border-greyScale-90",
  unknown: "bg-greyScale-60 border-2 border-greyScale-90",
};

const useVehicleTypeTable = () => {
  const dispatch = useAppDispatch();
  const { t } = useAppTranslation("tables");
  const { t: tv } = useAppTranslation("vehicleType");
  const [selectedKeys, setSelectedKeys] = useState<Array<string | number>>([]);
  const [sortState, setSortState] = useState<TableSortState>(null);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: categoryData } = useMegaVehicleTypeServiceV1ListVehicleTypeCategoriesQuery();
  const { data: tempTypeData } = useMegaVehicleTypeServiceV1ListVehicleTypeTempTypesQuery();

  const categoryOptions = useMemo(() => {
    const options = (categoryData?.vehicle_type_categories ?? []).map((cat) => ({
      label: cat.category_name ?? "--",
      value: cat.category_name ?? "", // Sending name because API expects 'vehicleCategoryName' string
    }));
    return [{ label: t("select-all"), value: "" }, ...options];
  }, [categoryData, t]);

  const tempTypeOptions = useMemo(() => {
    const options = (tempTypeData?.temp_types ?? []).map((type) => ({
      // Convert "Frozen" -> "temp-type-frozen"
      label: tv(`temp-type-${(type.name ?? "").toLowerCase()}` as any),
      value: type.id ?? "",
    }));
    return [{ label: t("select-all"), value: "" }, ...options];
  }, [tempTypeData, t, tv]);

  useEffect(() => {
    setPage(1); // Reset to first page when filters change
  }, [filterValues, sortState]);

  const queryParams = useMemo(
    () => ({
      page: page,
      size: limit,
      sortBy: sortState?.columnId ?? undefined,
      sortOrder: sortState?.direction ?? undefined,
      ...filterValues,
    }),
    [filterValues, sortState, page],
  );
  const { data, isFetching, error } = useMegaWrapperServiceV1ListVehicleTypesQuery(queryParams);

  const [activate, { isLoading: isActivating }] =
    useMegaVehicleTypeServiceV1ActivateVehicleTypesMutation();
  const [deactivate, { isLoading: isDeactivating }] =
    useMegaVehicleTypeServiceV1DeactivateVehicleTypesMutation();

  // this is the activate function
  const onBulkActivate = async () => {
    if (selectedKeys.length === 0) return;
    try {
      await activate({
        megaVehicleTypeV1MegaVehicleTypeBulkStatusChangeReq: {
          ids: selectedKeys.map(String),
        },
      }).unwrap();
      setSelectedKeys([]); // clear selection
    } catch (err) {
      console.error("Bulk activation fail", err);
    }
  };

  // the deactivate function
  const onBulkDeactivate = async () => {
    if (selectedKeys.length === 0) return;
    try {
      await deactivate({
        megaVehicleTypeV1MegaVehicleTypeBulkStatusChangeReq: {
          ids: selectedKeys.map(String),
        },
      }).unwrap();
      setSelectedKeys([]); // clear selection
    } catch (err) {
      console.error("Bulk deactivation fail", err);
    }
  };

  useEffect(() => {
    dispatch(setGlobalComponent({ title: t("page-title"), hasBackButton: false }));
  }, [dispatch, t]);

  /**
   * Renders the Temperature Type cell with translations.
   */
  const renderTempType = (row: VehicleTypeRow) => {
    const name = row.temp_type_name?.toLowerCase();
    if (name === "frozen" || name === "dry") {
      return tv(`temp-type-${name}` as any);
    }
    return row.temp_type_name ?? "---";
  };

  /**
   * Renders the Status cell with a colored dot and label.
   */
  const renderStatus = (row: VehicleTypeRow) => {
    const statusKey = (row.status ?? "unknown") as keyof typeof statusClasses;
    const dotClass = statusClasses[statusKey] ?? statusClasses.unknown;

    return (
      <div className="inline-flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${dotClass}`} />
        <span className="capitalize">
          {row.status === "active" ? t("status-active") : t("status-inactive")}
        </span>
      </div>
    );
  };

  const columns: Columns<VehicleTypeRow>[] = useMemo(
    () => [
      {
        id: "vehicle-type",
        fieldId: "vehicle_type",
        label: tv("field-name"),
        sortable: true,
        filterable: true,
      },
      {
        id: "vehicleCategoryName",
        fieldId: "category_name",
        label: tv("field-category"),
        sortable: true,
        filterable: true,
        filterId: "vehicleCategoryName",
        filterOptions: categoryOptions,
      },
      {
        id: "tempTypeId",
        fieldId: "temp_type_name",
        label: tv("field-temp-type"),
        sortable: true,
        filterable: true,
        filterId: "tempTypeId",
        filterOptions: tempTypeOptions,
        render: renderTempType,
      },
      {
        id: "status",
        fieldId: "status",
        label: t("column-status"),
        sortable: true,
        filterable: true,
        filterOptions: [
          { label: t("select-all"), value: "" },
          { label: t("status-active"), value: "active" },
          { label: t("status-inactive"), value: "inactive" },
        ],
        render: renderStatus,
      },
    ],
    [t, tv, categoryOptions, tempTypeOptions],
  );

  return {
    page,
    setPage,
    limit,
    totalPage: data?.metadata?.total_page ?? 1,
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
    onBulkActivate,
    onBulkDeactivate,
    isBulkProcessing: isActivating || isDeactivating, // export this too so button state is easy to manage
  };
};

export default useVehicleTypeTable;
