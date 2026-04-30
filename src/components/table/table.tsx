import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EmptyLottie from "assets/images/empty.json";
import Checkbox from "components/checkbox";
import Icon from "components/icon";
import Input from "components/input";
import Select, { SelectOption } from "components/select";
import { isEmpty } from "lodash";
import React, { useEffect, useMemo, useRef, useState } from "react";
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

/**
 * Definition for a single table column.
 * @template T - The type of data in a single row.
 */
export interface Columns<T> {
  /**
   * Unique identifier for the column.
   * If not provided, defaults to `fieldId`.
   */
  id?: string;

  /**
   * The key in the data object to display.
   * Use `"index"` to show a row number (e.g., 1, 2, 3...).
   */
  fieldId: keyof T | "index";

  /**
   * Optional secondary field key to display below the primary field text.
   */
  fieldId2?: string;

  /**
   * Optional tertiary field key to display below the secondary field text.
   */
  fieldId3?: string;

  /**
   * Text label displayed in the column header.
   */
  label: string;

  /**
   * Custom renderer for the cell content.
   * Receives the full row object as an argument.
   */
  render?: (data: T) => React.ReactElement | string;

  /**
   * Custom renderer for the header cell.
   */
  renderHeader?: () => React.ReactElement | string;

  /**
   * If `true`, the column can be sorted by clicking the header.
   */
  sortable?: boolean;

  /**
   * If `true`, enables a filter input in the header for this column.
   */
  filterable?: boolean;

  /**
   * Predefined options for the filter dropdown.
   */
  filterOptions?: SelectOption[];

  /**
   * Placeholder text for the filter input.
   */
  filterPlaceholder?: string;

  /**
   * If `true`, the filter dropdown will include a search box.
   */
  filterSearchable?: boolean;

  /**
   * Async function to fetch filter options from an API.
   */
  filterSearch?: (term: string) => Promise<SelectOption[]>;

  /**
   * Custom renderer for the filter cell.
   */
  renderFilter?: (args: FilterRenderArgs) => React.ReactNode;

  /**
   * Horizontal alignment of cell content.
   * @default "left"
   */
  align?: Align;

  /**
   * Width of the column (e.g. "100px", "20%").
   */
  width?: string;

  /**
   * If `true`, prevents this column from being moved via drag-and-drop.
   */
  dragDisabled?: boolean;
}

/**
 * Props for the Table component.
 */
interface Props<T> {
  /** Array of data objects to display as rows. */
  data?: T[];

  /** Array of column definitions. */
  columns: Columns<T>[];

  /** If `true`, adds a specific styling for ranked lists. */
  ranked?: boolean;

  /** If `true`, shows a loading overlay/spinner. */
  loading?: boolean | null;

  /** Error message to display if data fetching fails. */
  error?: string;

  /** Whether to show standard action buttons. */
  action?: boolean;

  /** Current page index for pagination/index calculation. @default 1 */
  currentPage?: number;

  /** Number of items per page. */
  limit?: number;

  /** Callback triggered when a row is clicked. */
  onRowClick?: (item: T) => void;

  /** Unique key for each row. Can be a property name or a function. */
  rowKey?: keyof T | ((item: T, index: number) => Primitive);

  /** If `true`, enables row selection with checkboxes. */
  selectable?: boolean;

  /** Array of currently selected row keys (controlled). */
  selectedRowKeys?: Primitive[];

  /** Initial selected row keys. */
  defaultSelectedRowKeys?: Primitive[];

  /** Callback triggered when selection changes. */
  onSelectedRowKeysChange?: (keys: Primitive[], rows: T[]) => void;

  /** If `true`, columns can be reordered via drag-and-drop. @default true */
  enableColumnDrag?: boolean;

  /** Current sort state (controlled). */
  sortState?: TableSortState;

  /** Initial sort state. */
  defaultSortState?: TableSortState;

  /** Callback triggered when sort direction or column changes. */
  onSortStateChange?: (sort: TableSortState) => void;

  /** Current filter values (controlled). */
  filterValues?: Record<string, string>;

  /** Initial filter values. */
  defaultFilterValues?: Record<string, string>;

  /** Callback triggered when a filter value changes. */
  onFilterValuesChange?: (filters: Record<string, string>) => void;

  /** Delay in milliseconds before triggering filter changes. @default 300 */
  filterDebounceMs?: number;

  /** Callback triggered when column order changes. */
  onColumnOrderChange?: (columnIds: string[]) => void;

  /** If `true`, columns can be resized. @default true */
  enableColumnResize?: boolean;

  /** Current widths of columns (controlled). */
  columnWidths?: Record<string, number>;

  /** Initial widths of columns. */
  defaultColumnWidths?: Record<string, number>;

  /** Callback triggered when a column is resized. */
  onColumnWidthsChange?: (widths: Record<string, number>) => void;

  /** Minimum width a column can be resized to. @default 140 */
  minColumnWidth?: number;

  /** Label for the 'select all' checkbox header. @default "All" */
  selectableLabel?: string;

  /** Determine how many skeleton rows in loading state. @default 10 */
  skeletonRowsCount?: number;
}

type HeaderCellProps = {
  id: string;
  disabled?: boolean;
  children: (args: {
    dragHandleProps: {
      attributes: ReturnType<typeof useSortable>["attributes"];
      listeners: ReturnType<typeof useSortable>["listeners"];
    } | null;
    isDragging: boolean;
  }) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function areFilterValuesEqual(left: Record<string, string>, right: Record<string, string>) {
  if (left === right) {
    return true;
  }

  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);

  if (leftKeys.length !== rightKeys.length) {
    return false;
  }

  return leftKeys.every((key) => left[key] === right[key]);
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

  const primaryValue = (row as Record<string, React.ReactNode>)[String(column.fieldId)];
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
      {tertiaryValue ? <span className="text-xs text-text-secondary">{tertiaryValue}</span> : null}
    </div>
  );
}

function parseColumnWidth(width?: string) {
  if (!width) {
    return undefined;
  }

  const numericWidth = Number.parseFloat(width);
  return Number.isFinite(numericWidth) ? numericWidth : undefined;
}

const SortableHeaderCell = ({ id, disabled, children, className, style }: HeaderCellProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled,
  });

  const resolvedStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : undefined,
    ...style,
  };

  return (
    <th
      ref={setNodeRef}
      style={resolvedStyle}
      className={classNames(
        "align-middle transition-shadow duration-150",
        isDragging ? "opacity-0" : "",
        className,
      )}
    >
      {children({
        dragHandleProps: disabled ? null : { attributes, listeners },
        isDragging,
      })}
    </th>
  );
};

/**
 * Feature-rich data table component.
 * Supports sorting, filtering, selection, column drag-and-drop, and resizing.
 *
 * @template T - The type of data in a single row.
 *
 * @example
 * <Table<User>
 *   data={users}
 *   columns={[
 *     { fieldId: "name", label: "User Name", sortable: true },
 *     { fieldId: "email", label: "Email Address" }
 *   ]}
 *   rowKey="id"
 *   selectable
 *   onSelectedRowKeysChange={(keys) => console.log(keys)}
 * />
 */
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
  filterDebounceMs = 300,
  onColumnOrderChange,
  enableColumnResize = true,
  columnWidths,
  defaultColumnWidths = {},
  onColumnWidthsChange,
  minColumnWidth = 140,
  selectableLabel = "All",
  skeletonRowsCount = 10,
}: Props<T>): React.ReactElement {
  const [columnOrder, setColumnOrder] = useState(() =>
    columns.map((column, index) => getColumnId(column, index)),
  );
  const [internalSortState, setInternalSortState] = useState<TableSortState>(defaultSortState);
  const [internalFilterValues, setInternalFilterValues] =
    useState<Record<string, string>>(defaultFilterValues);
  const [internalSelectedRowKeys, setInternalSelectedRowKeys] =
    useState<Primitive[]>(defaultSelectedRowKeys);
  const [internalColumnWidths, setInternalColumnWidths] =
    useState<Record<string, number>>(defaultColumnWidths);
  const [activeDragColumnId, setActiveDragColumnId] = useState<string | null>(null);
  const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);
  const filterDebounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resizeStateRef = useRef<{
    columnId: string;
    startX: number;
    startWidth: number;
  } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  useEffect(() => {
    setColumnOrder((currentOrder) => {
      const nextIds = columns.map((column, index) => getColumnId(column, index));
      const existingIds = currentOrder.filter((columnId) => nextIds.includes(columnId));
      const missingIds = nextIds.filter((columnId) => !existingIds.includes(columnId));
      return [...existingIds, ...missingIds];
    });
  }, [columns]);

  const activeSortState = sortState !== undefined ? sortState : internalSortState;
  const activeFilterValues = filterValues !== undefined ? filterValues : internalFilterValues;
  const activeSelectedKeys =
    selectedRowKeys !== undefined ? selectedRowKeys : internalSelectedRowKeys;
  const activeColumnWidths = columnWidths !== undefined ? columnWidths : internalColumnWidths;
  const [draftFilterValues, setDraftFilterValues] =
    useState<Record<string, string>>(activeFilterValues);

  const orderedColumns = useMemo(() => {
    const columnMap = new Map(columns.map((column, index) => [getColumnId(column, index), column]));

    return columnOrder
      .map((columnId) => columnMap.get(columnId))
      .filter((column): column is Columns<T> => Boolean(column));
  }, [columnOrder, columns]);

  useEffect(() => {
    setInternalColumnWidths((currentWidths) => {
      const nextWidths = { ...currentWidths };
      let hasChange = false;

      columns.forEach((column, index) => {
        const columnId = getColumnId(column, index);
        const configuredWidth = parseColumnWidth(column.width);

        if (
          configuredWidth !== undefined &&
          nextWidths[columnId] === undefined &&
          defaultColumnWidths[columnId] === undefined
        ) {
          nextWidths[columnId] = configuredWidth;
          hasChange = true;
        }
      });

      return hasChange ? nextWidths : currentWidths;
    });
  }, [columns, defaultColumnWidths]);

  const activeColumn = useMemo(
    () =>
      orderedColumns.find((column, index) => getColumnId(column, index) === activeDragColumnId) ??
      null,
    [activeDragColumnId, orderedColumns],
  );

  const rowsWithKeys = useMemo(
    () =>
      data.map((row, index) => ({
        row,
        key: getRowKey(row, index, currentPage, limit, rowKey),
      })),
    [currentPage, data, limit, rowKey],
  );

  const allVisibleRowsSelected =
    rowsWithKeys.length > 0 && rowsWithKeys.every(({ key }) => activeSelectedKeys.includes(key));
  const someVisibleRowsSelected =
    rowsWithKeys.some(({ key }) => activeSelectedKeys.includes(key)) && !allVisibleRowsSelected;

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

    const nextRows = rowsWithKeys.filter(({ key }) => nextKeys.includes(key)).map(({ row }) => row);

    onSelectedRowKeysChange?.(nextKeys, nextRows);
  };

  const commitColumnWidths = (nextWidths: Record<string, number>) => {
    if (columnWidths === undefined) {
      setInternalColumnWidths(nextWidths);
    }

    onColumnWidthsChange?.(nextWidths);
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
    setDraftFilterValues((currentFilters) => {
      const nextFilters = {
        ...currentFilters,
        [columnId]: nextValue,
      };

      commitFilterValues(nextFilters);
      return nextFilters;
    });
  };

  const handleFilterChangeDebounced = (columnId: string, nextValue: string) => {
    setDraftFilterValues((currentFilters) => {
      const nextFilters = {
        ...currentFilters,
        [columnId]: nextValue,
      };

      if (filterDebounceMs <= 0) {
        commitFilterValues(nextFilters);
        return nextFilters;
      }

      if (filterDebounceTimeoutRef.current) {
        clearTimeout(filterDebounceTimeoutRef.current);
      }

      filterDebounceTimeoutRef.current = setTimeout(() => {
        commitFilterValues(nextFilters);
        filterDebounceTimeoutRef.current = null;
      }, filterDebounceMs);

      return nextFilters;
    });
  };

  const flushDebouncedFilterChange = () => {
    if (filterDebounceTimeoutRef.current) {
      clearTimeout(filterDebounceTimeoutRef.current);
      filterDebounceTimeoutRef.current = null;
    }

    if (!areFilterValuesEqual(draftFilterValues, activeFilterValues)) {
      commitFilterValues(draftFilterValues);
    }
  };

  const SkeletonCell = () => <div className="h-5 w-full animate-pulse rounded bg-greyScale-80" />;

  const handleToggleAllRows = () => {
    if (allVisibleRowsSelected) {
      const visibleKeys = rowsWithKeys.map(({ key }) => key);
      commitSelectedKeys(activeSelectedKeys.filter((key) => !visibleKeys.includes(key)));
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

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragColumnId(String(event.active.id));
    setDragOverColumnId(String(event.active.id));
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (event.over) {
      setDragOverColumnId(String(event.over.id));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const activeId = String(event.active.id);
    const overId = event.over ? String(event.over.id) : null;

    setActiveDragColumnId(null);
    setDragOverColumnId(null);

    if (!overId || activeId === overId) {
      return;
    }

    setColumnOrder((currentOrder) => {
      const oldIndex = currentOrder.indexOf(activeId);
      const newIndex = currentOrder.indexOf(overId);

      if (oldIndex === -1 || newIndex === -1) {
        return currentOrder;
      }

      const nextOrder = arrayMove(currentOrder, oldIndex, newIndex);
      onColumnOrderChange?.(nextOrder);
      return nextOrder;
    });
  };

  const handleDragCancel = () => {
    setActiveDragColumnId(null);
    setDragOverColumnId(null);
  };

  useEffect(() => {
    const handleResizeMove = (event: MouseEvent) => {
      const resizeState = resizeStateRef.current;

      if (!resizeState) {
        return;
      }

      const nextWidth = Math.max(
        minColumnWidth,
        resizeState.startWidth + (event.clientX - resizeState.startX),
      );

      commitColumnWidths({
        ...activeColumnWidths,
        [resizeState.columnId]: nextWidth,
      });
    };

    const handleResizeEnd = () => {
      resizeStateRef.current = null;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("mousemove", handleResizeMove);
    window.addEventListener("mouseup", handleResizeEnd);

    return () => {
      window.removeEventListener("mousemove", handleResizeMove);
      window.removeEventListener("mouseup", handleResizeEnd);
    };
  }, [activeColumnWidths, minColumnWidth]);

  useEffect(() => {
    if (filterDebounceTimeoutRef.current) {
      clearTimeout(filterDebounceTimeoutRef.current);
      filterDebounceTimeoutRef.current = null;
    }

    setDraftFilterValues((currentFilters) =>
      areFilterValuesEqual(currentFilters, activeFilterValues)
        ? currentFilters
        : activeFilterValues,
    );
  }, [activeFilterValues]);

  useEffect(
    () => () => {
      if (filterDebounceTimeoutRef.current) {
        clearTimeout(filterDebounceTimeoutRef.current);
      }
    },
    [],
  );

  const getColumnDragState = (columnId: string) => ({
    isDragSource: activeDragColumnId === columnId,
    isDragTarget: dragOverColumnId === columnId && activeDragColumnId !== columnId,
  });

  const getColumnStyle = (column: Columns<T>, columnId: string) => {
    const resizedWidth = activeColumnWidths[columnId];

    if (resizedWidth !== undefined) {
      return {
        width: `${resizedWidth}px`,
        minWidth: `${resizedWidth}px`,
      };
    }

    if (column.width) {
      return {
        width: column.width,
        minWidth: column.width,
      };
    }

    return undefined;
  };

  const handleResizeStart = (event: React.MouseEvent<HTMLButtonElement>, columnId: string) => {
    event.preventDefault();
    event.stopPropagation();

    const headerCell = event.currentTarget.closest("th");
    const startWidth = headerCell?.getBoundingClientRect().width;

    if (!startWidth) {
      return;
    }

    resizeStateRef.current = {
      columnId,
      startX: event.clientX,
      startWidth,
    };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const renderFilterCell = (column: Columns<T>, columnId: string) => {
    if (column.renderFilter) {
      return column.renderFilter({
        columnId,
        value: draftFilterValues[columnId] ?? "",
        onChange: (nextValue) => handleFilterChange(columnId, nextValue),
      });
    }

    if (!column.filterable) {
      return null;
    }

    if (column.filterOptions?.length || column.filterSearch) {
      return (
        <Select
          options={column.filterOptions ?? []}
          value={draftFilterValues[columnId] ?? ""}
          onValueChange={(nextValue) =>
            handleFilterChange(columnId, Array.isArray(nextValue) ? nextValue[0] ?? "" : nextValue)
          }
          searchable={column.filterSearchable}
          onSearch={column.filterSearch}
          placeholder={column.filterPlaceholder ?? "All Data"}
          reserveHelperSpace={false}
          overrideClassName="min-h-[40px] rounded-[8px] border-border text-sm"
        />
      );
    }

    return (
      <Input
        placeholder={column.filterPlaceholder ?? "Search by"}
        value={draftFilterValues[columnId] ?? ""}
        onChange={(event) => handleFilterChangeDebounced(columnId, event.target.value)}
        onBlur={flushDebouncedFilterChange}
        leftIcon={<Icon name="search" size={16} />}
        reserveHelperSpace={false}
        overrideClassName="min-h-[40px] rounded-[8px] border-border"
      />
    );
  };

  const hasRows = !isEmpty(rowsWithKeys);
  const totalColumnCount = orderedColumns.length + (selectable ? 1 : 0);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
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
                <SortableContext
                  items={orderedColumns.map((column, index) => getColumnId(column, index))}
                  strategy={horizontalListSortingStrategy}
                >
                  {orderedColumns.map((column, index) => {
                    const columnId = getColumnId(column, index);
                    const isSorted = activeSortState?.columnId === columnId;
                    const { isDragSource, isDragTarget } = getColumnDragState(columnId);

                    return (
                      <SortableHeaderCell
                        key={columnId}
                        id={columnId}
                        disabled={!enableColumnDrag || column.dragDisabled}
                        style={getColumnStyle(column, columnId)}
                        className={classNames(
                          "relative border-b border-dashed border-divider px-4 py-5 text-left transition-colors duration-150",
                          column.align === "center" ? "text-center" : "",
                          column.align === "right" ? "text-right" : "text-left",
                          isDragSource
                            ? "bg-primary-100/70 shadow-[inset_0_0_0_1px_rgba(34,74,138,0.24)]"
                            : "",
                          isDragTarget
                            ? "bg-secondary-100/70 shadow-[inset_0_0_0_1px_rgba(0,153,156,0.24)]"
                            : "",
                        )}
                      >
                        {({ dragHandleProps }) => (
                          <>
                            <div
                              className={classNames(
                                "flex items-center gap-3 pr-3",
                                column.align === "center"
                                  ? "justify-center"
                                  : column.align === "right"
                                    ? "justify-end"
                                    : "justify-between",
                              )}
                            >
                              <div className="flex items-center gap-3">
                                {enableColumnDrag && !column.dragDisabled ? (
                                  <button
                                    type="button"
                                    aria-label={`Drag ${column.label}`}
                                    className="cursor-grab touch-none text-primary-500 active:cursor-grabbing"
                                    {...dragHandleProps?.attributes}
                                    {...dragHandleProps?.listeners}
                                  >
                                    <Icon name="drag" size={14} className="text-primary-500" />
                                  </button>
                                ) : null}
                                <span className="text-base font-semibold text-primary-600">
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
                                        : "arrow-2-vertical"
                                    }
                                    size={16}
                                  />
                                </button>
                              ) : null}
                            </div>
                            {enableColumnResize && index !== orderedColumns.length - 1 ? (
                              <button
                                type="button"
                                aria-label={`Resize ${column.label}`}
                                onMouseDown={(event) => handleResizeStart(event, columnId)}
                                className="absolute right-0 top-0 h-full w-3 cursor-col-resize touch-none"
                              >
                                <span className="absolute right-1 top-1/2 h-10 w-px -translate-y-1/2 bg-divider transition-colors group-hover:bg-primary-300" />
                              </button>
                            ) : null}
                          </>
                        )}
                      </SortableHeaderCell>
                    );
                  })}
                </SortableContext>
              </tr>
              <tr className="bg-white">
                {selectable ? (
                  <th className="border-b border-dashed border-divider px-3 py-3" />
                ) : null}
                {orderedColumns.map((column, index) => {
                  const columnId = getColumnId(column, index);
                  const { isDragSource, isDragTarget } = getColumnDragState(columnId);

                  return (
                    <th
                      key={`${columnId}-filter`}
                      style={getColumnStyle(column, columnId)}
                      className={classNames(
                        "border-b border-dashed border-divider px-4 py-3 text-left align-top transition-colors duration-150",
                        isDragSource ? "bg-primary-50/70" : "",
                        isDragTarget ? "bg-secondary-50/70" : "",
                      )}
                    >
                      {renderFilterCell(column, columnId)}
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
                        <td className="border-b border-dashed border-divider px-3 py-4 align-middle">
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
                      {orderedColumns.map((column, columnIndex) => {
                        const columnId = getColumnId(column, columnIndex);
                        const { isDragSource, isDragTarget } = getColumnDragState(columnId);

                        return (
                          <td
                            key={columnId}
                            style={getColumnStyle(column, columnId)}
                            className={classNames(
                              "border-b border-dashed border-divider px-4 py-4 text-sm text-text-primary transition-colors duration-150 align-middle",
                              column.align === "center" ? "text-center" : "",
                              column.align === "right" ? "text-right" : "text-left",
                              isDragSource ? "bg-primary-50/70" : "",
                              isDragTarget ? "bg-secondary-50/70" : "",
                            )}
                          >
                            {column.render
                              ? column.render(row)
                              : getDefaultCellValue(row, column, index, currentPage, limit)}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                : null}
              {loading
                ? Array.from({ length: skeletonRowsCount }).map((_, rowIndex) => (
                    <tr key={`skeleton-row-${rowIndex}`}>
                      {selectable ? (
                        <td className="border-b border-dashed border-divider px-3 py-4">
                          <div className="flex items-center justify-center">
                            <div className="h-4 w-4 animate-pulse rounded bg-greyScale-80" />
                          </div>
                        </td>
                      ) : null}
                      {orderedColumns.map((column, columnIndex) => (
                        <td
                          key={`skeleton-col-${columnIndex}`}
                          className="border-b border-dashed border-divider px-4 py-4"
                        >
                          <SkeletonCell />
                        </td>
                      ))}
                    </tr>
                  ))
                : null}
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
      <DragOverlay>
        {activeColumn ? (
          <div
            className="min-w-[220px] overflow-hidden rounded-xl border border-primary-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
            style={getColumnStyle(activeColumn, activeDragColumnId ?? getColumnId(activeColumn, 0))}
          >
            <div className="border-b border-dashed border-divider bg-tertiary-100 px-4 py-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Icon name="drag" size={14} className="text-primary-500" />
                  <span className="text-base font-semibold text-primary-600">
                    {activeColumn.label}
                  </span>
                </div>
              </div>
            </div>
            <div className="border-b border-dashed border-divider px-4 py-3">
              {renderFilterCell(activeColumn, activeDragColumnId ?? "")}
            </div>
            <div className="max-h-[320px] overflow-hidden bg-white">
              {rowsWithKeys.map(({ row, key }, index) => (
                <div
                  key={String(key)}
                  className={classNames(
                    "border-b border-dashed border-divider px-4 py-4 text-sm text-text-primary",
                    ranked
                      ? index === 0
                        ? "bg-success-100/40"
                        : index === 1
                          ? "bg-primary-50"
                          : index === 2
                            ? "bg-warning-100/50"
                            : ""
                      : "",
                  )}
                >
                  {activeColumn.render
                    ? activeColumn.render(row)
                    : getDefaultCellValue(row, activeColumn, index, currentPage, limit)}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
