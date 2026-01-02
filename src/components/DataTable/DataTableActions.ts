import { tableStore } from './tableStore';
import { Column } from './types';

export const getColumnOrderKey = (tableId: string) => `table_column_order_v1:${tableId}`;
export const getColumnVisibilityKey = (tableId: string) => `table_column_visibility_v1:${tableId}`;

export const setColumnOrder = (order: Column<any>[]) => {
  const { tableId } = tableStore.state;
  localStorage.setItem(getColumnOrderKey(tableId), JSON.stringify(order.map((c) => c.id)));

  tableStore.setState((s) => ({
    ...s,
    columnOrder: order,
  }));
  tableStore.setState((s) => ({ ...s, columnOrder: order }));
};

// export const toggleColumn = (id: string) => {

//   tableStore.setState((s) => ({
//     ...s,
//     visibility: { ...s.visibility, [id]: !s.visibility[id] },
//   }));
// };

export function sortByColumn(columnId: string) {
  tableStore.setState((s) => {
    if (s.sortColumn === columnId) {
      return {
        ...s,
        sortDirection: s.sortDirection === 'asc' ? 'desc' : 'asc',
      };
    }

    return {
      ...s,
      sortColumn: columnId,
      sortDirection: 'asc',
    };
  });
}

export const toggleColumn = (id: string) => {
  tableStore.setState((s) => {
    const nextVisibility = {
      ...s.visibility,
      [id]: !s.visibility[id],
    };

    if (s.tableId) {
      localStorage.setItem(getColumnVisibilityKey(s.tableId), JSON.stringify(nextVisibility));
    }

    return {
      ...s,
      visibility: nextVisibility,
    };
  });
};

export const loadColumnVisibility = (tableId: string) => {
  if (!tableId) return;

  const raw = localStorage.getItem(getColumnVisibilityKey(tableId));
  if (!raw) return;

  try {
    const visibility = JSON.parse(raw);

    tableStore.setState((s) => ({
      ...s,
      visibility,
    }));
  } catch {}
};

export const resetColumnVisibility = () => {
  tableStore.setState((s) => {
    if (s.tableId) {
      localStorage.removeItem(getColumnVisibilityKey(s.tableId));
    }

    return {
      ...s,
      visibility: {},
    };
  });
};
