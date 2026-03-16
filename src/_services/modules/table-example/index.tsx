import { Api } from "_services/api";

export type CustomerRow = {
  id: string;
  customer: string;
  quantity: number;
  unit: string;
  status: "active" | "pending" | "inactive";
};

export type CustomerTableQueryParams = {
  sortBy?: string | null;
  sortDirection?: "asc" | "desc" | null;
  filters?: Record<string, string>;
};

type CustomerTableResponse = {
  items: CustomerRow[];
  total: number;
};

const dataset: CustomerRow[] = [
  {
    id: "CUST-1021",
    customer: "Ananda Putra Wijaya",
    quantity: 10,
    unit: "Karung",
    status: "active",
  },
  {
    id: "CUST-1022",
    customer: "Ananda Putra Wijaya",
    quantity: 12,
    unit: "Karung",
    status: "pending",
  },
  {
    id: "CUST-1023",
    customer: "Ananda Putra Wijaya",
    quantity: 8,
    unit: "Karung",
    status: "active",
  },
  {
    id: "CUST-1024",
    customer: "Ananda Putra Wijaya",
    quantity: 4,
    unit: "Karung",
    status: "inactive",
  },
  {
    id: "CUST-1025",
    customer: "Ananda Putra Wijaya",
    quantity: 15,
    unit: "Karung",
    status: "active",
  },
  {
    id: "CUST-1026",
    customer: "Ananda Putra Wijaya",
    quantity: 7,
    unit: "Karung",
    status: "active",
  },
  {
    id: "CUST-1027",
    customer: "Ananda Putra Wijaya",
    quantity: 11,
    unit: "Karung",
    status: "active",
  },
];

const normalizeValue = (value?: string) => value?.trim().toLowerCase() ?? "";

const applyFilters = (
  rows: CustomerRow[],
  filters: Record<string, string> = {},
) => {
  return rows.filter((row) => {
    const customerFilter = normalizeValue(filters.customer);
    const quantityFilter = normalizeValue(filters.quantity);
    const statusFilter = normalizeValue(filters.status);

    if (
      customerFilter &&
      !`${row.customer} ${row.id}`.toLowerCase().includes(customerFilter)
    ) {
      return false;
    }

    if (
      quantityFilter &&
      !`${row.quantity} ${row.unit}`.toLowerCase().includes(quantityFilter)
    ) {
      return false;
    }

    if (statusFilter && row.status.toLowerCase() !== statusFilter) {
      return false;
    }

    return true;
  });
};

const applySort = (
  rows: CustomerRow[],
  sortBy?: string | null,
  sortDirection?: "asc" | "desc" | null,
) => {
  if (!sortBy || !sortDirection) {
    return rows;
  }

  const sortedRows = [...rows];

  sortedRows.sort((leftRow, rightRow) => {
    let leftValue: string | number = "";
    let rightValue: string | number = "";

    if (sortBy === "customer") {
      leftValue = leftRow.customer;
      rightValue = rightRow.customer;
    } else if (sortBy === "quantity") {
      leftValue = leftRow.quantity;
      rightValue = rightRow.quantity;
    } else if (sortBy === "status") {
      leftValue = leftRow.status;
      rightValue = rightRow.status;
    }

    const comparison =
      typeof leftValue === "number" && typeof rightValue === "number"
        ? leftValue - rightValue
        : String(leftValue).localeCompare(String(rightValue), undefined, {
            numeric: true,
            sensitivity: "base",
          });

    return sortDirection === "asc" ? comparison : comparison * -1;
  });

  return sortedRows;
};

const wait = (duration: number) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });

export const TablesApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getCustomerTable: builder.query<CustomerTableResponse, CustomerTableQueryParams>({
      queryFn: async ({ sortBy, sortDirection, filters }) => {
        await wait(800);
        const filteredRows = applyFilters(dataset, filters);
        const items = applySort(filteredRows, sortBy, sortDirection);
        return {
          data: {
            items,
            total: items.length,
          },
        };
      },
      keepUnusedDataFor: 0,
    }),
  }),
  overrideExisting: false,
});

export const { useGetCustomerTableQuery } = TablesApi;
