import type { ColumnId } from './Column';

export type ColumnVisibility = Record<ColumnId, boolean>;

export const DEFAULT_COLUMN_VISIBILITY: ColumnVisibility = {
  name: true,
  email: true,
  role: true,
  status: true,
  joinDate: true,
};
