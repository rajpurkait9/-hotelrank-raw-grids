import { JSX } from 'react';

export type DensityType = 'sm' | 'md' | 'lg';
export type SortOrder = 'asc' | 'desc';

export interface Column<T = unknown> {
  id: string;
  label: string;
  minWidth?: number | string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  format?: (value: unknown, row: T) => React.ReactNode;
  backgroundColor?: string;
}

export interface DataTableAction<T = unknown> {
  icon: JSX.Element;
  label: string;
  onClick: (row: T) => void;
  visible?: boolean;
  colorScheme?:
    | 'gray'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'teal'
    | 'blue'
    | 'cyan'
    | 'purple'
    | 'pink';
}

export type ActionHeaderProps = {
  backgroundColor?: string;
  children?: React.ReactNode;
  showActionColumn?: boolean;
  width?: string;
  showColumnVisibilityMenu?: boolean;
  backgroundColorColumnVisibilityMenu?: string;
};

export interface DataTableProps<T = unknown> {
  tableId: string;
  headers?: Column<T>[];
  data?: T[];
  loading?: boolean;
  emptyMessage?: string;
  actions?: DataTableAction<T>[];
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void | undefined;
  onPageSizeChange?: (size: number) => void | undefined;
  density?: DensityType;
  totalCount?: number;
  paginationMode?: 'server' | 'client';
  actionConfig?: ActionHeaderProps;
  loadingChildren?: JSX.Element;
  skeletonLoading?: boolean;
  pageSizeOptions?: number[];
}
