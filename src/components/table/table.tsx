import EmptyLottie from "assets/images/empty.json";
import Checkbox from "components/checkbox";
import Icon from "components/icon";
import Input from "components/input";
import Select, { SelectOption } from "components/select";
import { isEmpty } from "lodash";
import React, {
  DragEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Lottie from "react-lottie";

type Primitive = string | number;
type Align = "left" | "center" | "right";
type SortDirection = "asc" | "desc";

export type TableSortState = {
  columnId: string;
  direction: SortDirection;
} | null;

type FilterRenderArgs = {
  columnId: string;
  value: string;
  onChange: (value: string) => void;
};

export interface Columns<T> {
  id?: string;
  fieldId: keyof T | "index";
  fieldId2?: string;
  fieldId3?: string;
  label: string;
  render?: (data: T) => React.ReactElement | string;
  renderHeader?: () => React.ReactElement | string;
  sortable?: boolean;
  filterable?: boolean;
  filterOptions?: SelectOption[];
  filterPlaceholder?: string;
  filterSearchable?: boolean;
  filterSearch?: (term: string) => Promise<SelectOption[]>;
  renderFilter?: (args: FilterRenderArgs) => React.ReactNode;
  align?: Align;
  width?: string;
  dragDisabled?: boolean;
}

interface Props<T> {
  data?: T[];
  columns: Columns<T>[];
  ranked?: boolean;
  loading?: boolean | null;
  error?: string;
  action?: boolean;
  currentPage?: number;
  limit?: number;
  onRowClick?: (item: T) => void;
  rowKey?: keyof T | ((item: T, index: number) => Primitive);
  selectable?: boolean;
  selectedRowKeys?: Primitive[];
  defaultSelectedRowKeys?: Primitive[];
  onSelectedRowKeysChange?: (keys: Primitive[], rows: T[]) => void;
  enableColumnDrag?: boolean;
  sortState?: TableSortState;
  defaultSortState?: TableSortState;
  onSortStateChange?: (sort: TableSortState) => void;
  filterValues?: Record<string, string>;
  defaultFilterValues?: Record<string, string>;
  onFilterValuesChange?: (filters: Record<string, string>) => void;
  onColumnOrderChange?: (columnIds: string[]) => void;
  selectableLabel?: string;
}

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getColumnId<T>(column: Columns<T>, index: number) {
  return column.id ?? String(column.fieldId ?? index);
}

function getRowKey<T>(
  row: T,
  index: number,
  currentPage: number,
  limit: number,
  rowKey?: keyof T | ((item: T, rowIndex: number) => Primitive),
): Primitive {
  if (typeof rowKey === "function") {
    return rowKey(row, index);
  }

  if (typeof rowKey === "string") {
    return (row as Record<string, Primitive>)[rowKey];
  }

  return `${currentPage}-${limit}-${index}`;
}

function getDefaultCellValue<T>(
  row: T,
  column: Columns<T>,
  index: number,
  currentPage: number,
  limit: number,
) {
  if (column.fieldId === "index") {
    return index + 1 + (currentPage - 1) * limit;
  }

  const primaryValue = (row as Record<string, React.ReactNode>)[
    String(column.fieldId)
  ];
  const secondaryValue = column.fieldId2
    ? (row as Record<string, React.ReactNode>)[column.fieldId2]
    : undefined;
  const tertiaryValue = column.fieldId3
    ? (row as Record<string, React.ReactNode>)[column.fieldId3]
    : undefined;

  if (!secondaryValue && !tertiaryValue) {
    return primaryValue;
  }

  return (
    <div className="flex flex-col gap-1">
      <span>{primaryValue}</span>
      {secondaryValue ? (
        <span className="text-xs text-text-secondary">{secondaryValue}</span>
      ) : null}
      {tertiaryValue ? (
        <span className="text-xs text-text-secondary">{tertiaryValue}</span>
      ) : null}
    </div>
  );
}

export function Table<T>({
  data = [],
  columns = [],
  ranked = false,
  loading = false,
  error = "",
  action = false,
  currentPage = 1,
  limit = 0,
  onRowClick,
  rowKey,
  selectable = false,
  selectedRowKeys,
  defaultSelectedRowKeys = [],
  onSelectedRowKeysChange,
  enableColumnDrag = true,
  sortState,
  defaultSortState = null,
  onSortStateChange,
  filterValues,
  defaultFilterValues = {},
  onFilterValuesChange,
  onColumnOrderChange,
  selectableLabel = "All",
}: Props<T>): React.ReactElement {
  const [columnOrder, setColumnOrder] = useState(() =>
    columns.map((column, index) => getColumnId(column, index)),
  );
  const [internalSortState, setInternalSortState] =
    useState<TableSortState>(defaultSortState);
  const [internalFilterValues, setInternalFilterValues] =
    useState<Record<string, string>>(defaultFilterValues);
  const [internalSelectedRowKeys, setInternalSelectedRowKeys] =
    useState<Primitive[]>(defaultSelectedRowKeys);
  const dragColumnIdRef = useRef<string | null>(null);

  useEffect(() => {
    setColumnOrder((currentOrder) => {
      const nextIds = columns.map((column, index) => getColumnId(column, index));
      const existingIds = currentOrder.filter((columnId) => nextIds.includes(columnId));
      const missingIds = nextIds.filter((columnId) => !existingIds.includes(columnId));
      return [...existingIds, ...missingIds];
    });
  }, [columns]);

  const activeSortState =
    sortState !== undefined ? sortState : internalSortState;
  const activeFilterValues =
    filterValues !== undefined ? filterValues : internalFilterValues;
  const activeSelectedKeys =
    selectedRowKeys !== undefined ? selectedRowKeys : internalSelectedRowKeys;

  const orderedColumns = useMemo(() => {
    const columnMap = new Map(
      columns.map((column, index) => [getColumnId(column, index), column]),
    );

    return columnOrder
      .map((columnId) => columnMap.get(columnId))
      .filter((column): column is Columns<T> => Boolean(column));
  }, [columnOrder, columns]);

  const rowsWithKeys = useMemo(
    () =>
      data.map((row, index) => ({
        row,
        key: getRowKey(row, index, currentPage, limit, rowKey),
      })),
    [currentPage, data, limit, rowKey],
  );

  const allVisibleRowsSelected =
    rowsWithKeys.length > 0 &&
    rowsWithKeys.every(({ key }) => activeSelectedKeys.includes(key));
  const someVisibleRowsSelected =
    rowsWithKeys.some(({ key }) => activeSelectedKeys.includes(key)) &&
    !allVisibleRowsSelected;

  const commitFilterValues = (nextFilters: Record<string, string>) => {
    if (filterValues === undefined) {
      setInternalFilterValues(nextFilters);
    }

    onFilterValuesChange?.(nextFilters);
  };

  const commitSortState = (nextSortState: TableSortState) => {
    if (sortState === undefined) {
      setInternalSortState(nextSortState);
    }

    onSortStateChange?.(nextSortState);
  };

  const commitSelectedKeys = (nextKeys: Primitive[]) => {
    if (selectedRowKeys === undefined) {
      setInternalSelectedRowKeys(nextKeys);
    }

    const nextRows = rowsWithKeys
      .filter(({ key }) => nextKeys.includes(key))
      .map(({ row }) => row);

    onSelectedRowKeysChange?.(nextKeys, nextRows);
  };

  const handleSort = (columnId: string, sortable?: boolean) => {
    if (!sortable) {
      return;
    }

    if (!activeSortState || activeSortState.columnId !== columnId) {
      commitSortState({ columnId, direction: "asc" });
      return;
    }

    if (activeSortState.direction === "asc") {
      commitSortState({ columnId, direction: "desc" });
      return;
    }

    commitSortState(null);
  };

  const handleFilterChange = (columnId: string, nextValue: string) => {
    commitFilterValues({
      ...activeFilterValues,
      [columnId]: nextValue,
    });
  };

  const handleToggleAllRows = () => {
    if (allVisibleRowsSelected) {
      const visibleKeys = rowsWithKeys.map(({ key }) => key);
      commitSelectedKeys(
        activeSelectedKeys.filter((key) => !visibleKeys.includes(key)),
      );
      return;
    }

    const mergedKeys = Array.from(
      new Set([...activeSelectedKeys, ...rowsWithKeys.map(({ key }) => key)]),
    );
    commitSelectedKeys(mergedKeys);
  };

  const handleToggleRow = (key: Primitive) => {
    const nextKeys = activeSelectedKeys.includes(key)
      ? activeSelectedKeys.filter((currentKey) => currentKey !== key)
      : [...activeSelectedKeys, key];
    commitSelectedKeys(nextKeys);
  };

  const handleColumnDragStart =
    (columnId: string, dragDisabled?: boolean) =>
    (event: DragEvent<HTMLTableCellElement>) => {
      if (!enableColumnDrag || dragDisabled) {
        event.preventDefault();
        return;
      }

      dragColumnIdRef.current = columnId;
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", columnId);
    };

  const handleColumnDragOver = (event: DragEvent<HTMLTableCellElement>) => {
    if (!enableColumnDrag) {
      return;
    }

    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleColumnDrop =
    (targetColumnId: string, dragDisabled?: boolean) =>
    (event: DragEvent<HTMLTableCellElement>) => {
      event.preventDefault();

      const sourceColumnId = dragColumnIdRef.current;
      dragColumnIdRef.current = null;

      if (
        !enableColumnDrag ||
        dragDisabled ||
        !sourceColumnId ||
        sourceColumnId === targetColumnId
      ) {
        return;
      }

      setColumnOrder((currentOrder) => {
        const sourceIndex = currentOrder.indexOf(sourceColumnId);
        const targetIndex = currentOrder.indexOf(targetColumnId);

        if (sourceIndex === -1 || targetIndex === -1) {
          return currentOrder;
        }

        const nextOrder = [...currentOrder];
        nextOrder.splice(sourceIndex, 1);
        nextOrder.splice(targetIndex, 0, sourceColumnId);
        onColumnOrderChange?.(nextOrder);
        return nextOrder;
      });
    };

  const hasRows = !isEmpty(rowsWithKeys);
  const totalColumnCount = orderedColumns.length + (selectable ? 1 : 0);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-tertiary-100">
              {selectable ? (
                <th className="w-[68px] border-b border-dashed border-divider px-3 py-5 text-left">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={allVisibleRowsSelected}
                      indeterminate={someVisibleRowsSelected}
                      onChange={handleToggleAllRows}
                      aria-label="Select all rows"
                    />
                    <span className="text-base font-semibold text-primary-600">
                      {selectableLabel}
                    </span>
                  </div>
                </th>
              ) : null}
              {orderedColumns.map((column, index) => {
                const columnId = getColumnId(column, index);
                const isSorted = activeSortState?.columnId === columnId;

                return (
                  <th
                    key={columnId}
                    scope="col"
                    draggable={enableColumnDrag && !column.dragDisabled}
                    onDragStart={handleColumnDragStart(columnId, column.dragDisabled)}
                    onDragOver={handleColumnDragOver}
                    onDrop={handleColumnDrop(columnId, column.dragDisabled)}
                    className={classNames(
                      "border-b border-dashed border-divider px-4 py-5 align-middle",
                      column.align === "center" ? "text-center" : "",
                      column.align === "right" ? "text-right" : "text-left",
                    )}
                    style={column.width ? { width: column.width } : undefined}
                  >
                    <div
                      className={classNames(
                        "flex items-center gap-3",
                        column.align === "center"
                          ? "justify-center"
                          : column.align === "right"
                            ? "justify-end"
                            : "justify-between",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {enableColumnDrag && !column.dragDisabled ? (
                          <Icon
                            name="drag"
                            size={14}
                            className="cursor-grab text-primary-500"
                          />
                        ) : null}
                        <span className="text-sm font-semibold text-primary-600">
                          {column.label}
                        </span>
                        {column.renderHeader?.()}
                      </div>
                      {column.sortable ? (
                        <button
                          type="button"
                          onClick={() => handleSort(columnId, column.sortable)}
                          className="inline-flex items-center text-primary-600"
                          aria-label={`Sort ${column.label}`}
                        >
                          <Icon
                            name={
                              isSorted
                                ? activeSortState?.direction === "asc"
                                  ? "arrow-up"
                                  : "arrow-down"
                                : "arrow-swap-vertical"
                            }
                            size={16}
                          />
                        </button>
                      ) : null}
                    </div>
                  </th>
                );
              })}
            </tr>
            <tr className="bg-white">
              {selectable ? (
                <th className="border-b border-dashed border-divider px-3 py-3" />
              ) : null}
              {orderedColumns.map((column, index) => {
                const columnId = getColumnId(column, index);

                return (
                  <th
                    key={`${columnId}-filter`}
                    className="border-b border-dashed border-divider px-4 py-3 align-top"
                  >
                    {column.renderFilter ? (
                      column.renderFilter({
                        columnId,
                        value: activeFilterValues[columnId] ?? "",
                        onChange: (nextValue) =>
                          handleFilterChange(columnId, nextValue),
                      })
                    ) : column.filterable ? (
                      column.filterOptions?.length || column.filterSearch ? (
                        <Select
                          options={column.filterOptions ?? []}
                          value={activeFilterValues[columnId] ?? ""}
                          onValueChange={(nextValue) =>
                            handleFilterChange(
                              columnId,
                              Array.isArray(nextValue) ? nextValue[0] ?? "" : nextValue,
                            )
                          }
                          searchable={column.filterSearchable}
                          onSearch={column.filterSearch}
                          placeholder={column.filterPlaceholder ?? "All Data"}
                          reserveHelperSpace={false}
                          overrideClassName="min-h-[40px] rounded-[8px] border-border text-sm"
                        />
                      ) : (
                        <Input
                          placeholder={column.filterPlaceholder ?? "Search by"}
                          value={activeFilterValues[columnId] ?? ""}
                          onChange={(event) =>
                            handleFilterChange(columnId, event.target.value)
                          }
                          leftIcon={<Icon name="search" size={16} />}
                          reserveHelperSpace={false}
                          overrideClassName="min-h-[40px] rounded-[8px] border-border"
                        />
                      )
                    ) : null}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="bg-white">
            {!loading && isEmpty(error) && hasRows
              ? rowsWithKeys.map(({ row, key }, index) => (
                  <tr
                    key={String(key)}
                    className={classNames(
                      ranked
                        ? index === 0
                          ? "bg-success-100/40"
                          : index === 1
                            ? "bg-primary-50"
                            : index === 2
                              ? "bg-warning-100/50"
                              : ""
                        : "",
                      onRowClick ? "cursor-pointer hover:bg-whiteScale-90" : "",
                    )}
                    onClick={() => onRowClick?.(row)}
                    role={action ? "button" : undefined}
                  >
                    {selectable ? (
                      <td className="border-b border-dashed border-divider px-3 py-4">
                        <div
                          className="flex items-center justify-center"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <Checkbox
                            checked={activeSelectedKeys.includes(key)}
                            onChange={() => handleToggleRow(key)}
                            aria-label={`Select row ${index + 1}`}
                          />
                        </div>
                      </td>
                    ) : null}
                    {orderedColumns.map((column, columnIndex) => (
                      <td
                        key={getColumnId(column, columnIndex)}
                        className={classNames(
                          "border-b border-dashed border-divider px-4 py-4 text-sm text-text-primary",
                          column.align === "center" ? "text-center" : "",
                          column.align === "right" ? "text-right" : "text-left",
                        )}
                      >
                        {column.render
                          ? column.render(row)
                          : getDefaultCellValue(
                              row,
                              column,
                              index,
                              currentPage,
                              limit,
                            )}
                      </td>
                    ))}
                  </tr>
                ))
              : null}
            {loading ? (
              <tr>
                <td
                  colSpan={totalColumnCount}
                  className="px-4 py-12 text-center text-sm text-text-secondary"
                >
                  Loading...
                </td>
              </tr>
            ) : null}
            {!loading && !isEmpty(error) ? (
              <tr>
                <td
                  colSpan={totalColumnCount}
                  className="px-4 py-12 text-center text-sm text-error"
                >
                  {error}
                </td>
              </tr>
            ) : null}
            {!loading && isEmpty(error) && !hasRows ? (
              <tr>
                <td colSpan={totalColumnCount} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Lottie
                      options={{
                        loop: true,
                        autoplay: true,
                        animationData: EmptyLottie,
                        rendererSettings: {
                          preserveAspectRatio: "xMidYMid slice",
                        },
                      }}
                      height={100}
                      width={100}
                    />
                    <span className="text-sm text-text-secondary">No data found</span>
                  </div>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
