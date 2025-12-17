export type ColumnId = 'name' | 'email' | 'role' | 'status' | 'joinDate';

export const COLUMNS: Array<{
  id: ColumnId;
  label: string;
  sortable: boolean;
}> = [
  { id: 'name', label: 'User', sortable: true },
  { id: 'email', label: 'Email', sortable: true },
  { id: 'role', label: 'Role', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'joinDate', label: 'Join Date', sortable: true },
];
