import { Store } from '@tanstack/store';
import type { ColumnId } from './Column';
import { DEFAULT_COLUMN_VISIBILITY } from './ColumnVisibility';

interface TableState {
  sortColumn: ColumnId | null;
  sortDirection: 'asc' | 'desc';
  visibility: Record<ColumnId, boolean>;
  columnOrder: ColumnId[];
}

export const tableStore = new Store<TableState>({
  sortColumn: null,
  sortDirection: 'asc',
  visibility: DEFAULT_COLUMN_VISIBILITY,
  columnOrder: ['name', 'email', 'role', 'status', 'joinDate'],
});
