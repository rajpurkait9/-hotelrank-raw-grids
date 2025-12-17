import { tableStore } from './tableStore';
import type { ColumnId } from './Column';

export const setColumnOrder = (order: ColumnId[]) => {
  tableStore.setState((s) => ({ ...s, columnOrder: order }));
};

export const toggleColumn = (id: ColumnId) => {
  tableStore.setState((s) => ({
    ...s,
    visibility: { ...s.visibility, [id]: !s.visibility[id] },
  }));
};

// export const sortByColumn = (column: ColumnId) => {
//   tableStore.setState((s) =>
//     s.sortColumn === column
//       ? { ...s, sortDirection: s.sortDirection === 'asc' ? 'desc' : 'asc' }
//       : { ...s, sortColumn: column, sortDirection: 'asc' }
//   );
// };


export function sortByColumn(columnId: ColumnId) {
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
