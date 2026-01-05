'use client';

import { Box, Table } from '@chakra-ui/react';
import { useStore } from '@tanstack/react-store';
import { useEffect, useMemo } from 'react';
import TableHeader from './DataTableHeader';
import TablePagination from './DataTablePagination';
import TableRows from './DataTableRow';
import DataTableSkeleton from './DataTableSkeleton';
import { setActionsConfig, setData, setTableId, tableStore } from './tableStore';
import { DataTableProps } from './types';

export default function DataTable<T extends Record<string, unknown>>({
  tableId,
  data: rowData = [],
  headers = [],
  loading = false,
  loadingChildren,
  skeletonLoading = false,
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
  pageSizeOptions,
}: DataTableProps<T>) {
  useEffect(() => {
    setTableId(tableId);
  }, [tableId]);

  useEffect(() => {
    setData(rowData, headers);
  }, [rowData, headers]);

  useEffect(() => {
    if (actionConfig) {
      setActionsConfig(actionConfig);
    }
  }, [actionConfig]);

  const { sortColumn, sortDirection, data: newData, columnOrder } = useStore(tableStore);

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
      <Box flex="1" minHeight={0} overflow="auto" h={'100%'}>
        <Table.Root variant="outline" w="100%" size={density}>
          <TableHeader />

          {loading ? (
            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan={columnOrder.length + (actions ? 1 : 0)}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    h={'83vh'}
                    w="100%"
                  >
                    {loadingChildren ?? 'Loading...'}
                  </Box>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ) : skeletonLoading ? (
            <DataTableSkeleton rows={pageSize} columns={headers.length + (actions ? 2 : 0)} />
          ) : processedData.length === 0 ? (
            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan={headers.length + (actions ? 1 : 0)}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    minH="200px"
                    color="gray.500"
                  >
                    {emptyMessage}
                  </Box>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ) : (
            <TableRows data={processedData} actions={actions} />
          )}
        </Table.Root>
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
          pageSizeOptions={pageSizeOptions}
        />
      </Box>
    </Box>
  );
}
