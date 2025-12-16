export type DensityType = "comfortable" | "standard" | "compact";
export type SortOrder = "asc" | "desc";

export interface Column<T = unknown> {
  id: string;
  label: string;
  minWidth?: number | string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  format?: (value: unknown, row: T) => React.ReactNode;
}

export interface DataTableAction<T = unknown> {
  icon: React.ReactNode;
  label: string;
  onClick: (row: T) => void;
  colorScheme?:
    | "gray"
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "teal"
    | "blue"
    | "cyan"
    | "purple"
    | "pink";
}

export interface DataTableProps<T = unknown> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  page?: number;
  rowsPerPage?: number;
  totalRows?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  onRowClick?: (row: T) => void;
  actions?: DataTableAction<T>[];
  emptyMessage?: string;
  density?: DensityType;
  showIndex?: boolean;
  pageKey: string; // required for persistence
}
