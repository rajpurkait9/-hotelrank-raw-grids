'use client';

import { Box, Table } from '@chakra-ui/react';
import { useStore } from '@tanstack/react-store';
import { useEffect, useMemo } from 'react';
import { loadColumnVisibility } from './DataTableActions';
import TableHeader from './DataTableHeader';
import TablePagination from './DataTablePagination';
import TableRows from './DataTableRow';
import { setActionsConfig, setData, setTableId, tableStore } from './tableStore';
import { DataTableProps } from './types';

export default function DataTable<T extends Record<string, unknown>>({
  tableId,
  data: rowData = [],
  headers = [],
  loading = false,
  emptyMessage = 'No data',
  actions,
  page = 1,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  density = 'sm',
  totalCount = 0,
  paginationMode = 'client',
  actionConfig,
}: DataTableProps<T>) {
  useEffect(() => {
    setTableId(tableId);
    loadColumnVisibility(tableId);
  }, [tableId]);

  useEffect(() => {
    setData(rowData, headers);
  }, [rowData, headers]);

  useEffect(() => {
    if (actionConfig) {
      setActionsConfig(actionConfig);
    }
  }, [actionConfig]);

  const { sortColumn, sortDirection, data: newData } = useStore(tableStore);

  const processedData = useMemo(() => {
    const data = [...newData];
    const safePage = Math.max(1, page || 1);

    if (sortColumn) {
      data.sort((a, b) =>
        sortDirection === 'asc'
          ? String(a[sortColumn]).localeCompare(String(b[sortColumn]))
          : String(b[sortColumn]).localeCompare(String(a[sortColumn])),
      );
    }

    if (paginationMode === 'client') {
      const start = (safePage - 1) * pageSize;
      return data.slice(start, start + pageSize);
    }

    return data;
  }, [newData, sortColumn, sortDirection, page, pageSize, paginationMode]);

  useEffect(() => {
    if (page < 1 && onPageChange) {
      onPageChange(1);
    }
  }, [page, onPageChange]);

  return (
    <Box h="100%" display="flex" flexDirection="column" p={2} pt={2} minHeight={0}>
      <Box flex="1" minHeight={0} overflow="auto">
        {loading ? (
          <Box display="flex" alignItems="center" justifyContent="center" h="100%" color="gray.500">
            Loading...
          </Box>
        ) : processedData.length === 0 ? (
          <Box display="flex" alignItems="center" justifyContent="center" h="100%" color="gray.500">
            {emptyMessage}
          </Box>
        ) : (
          <Table.Root variant="outline" w="100%" size={density}>
            <TableHeader />
            <TableRows data={processedData} actions={actions} />
          </Table.Root>
        )}
      </Box>

      <Box mt={0.5}>
        <TablePagination
          totalCount={totalCount}
          pageSize={pageSize}
          currentPage={page}
          onPageChange={onPageChange}
          onPageSizeChange={(s) => {
            if (onPageSizeChange) {
              onPageSizeChange(s);
            }
            if (page > 1 && onPageChange) {
              onPageChange(1);
            }
          }}
        />
      </Box>
    </Box>
  );
}
