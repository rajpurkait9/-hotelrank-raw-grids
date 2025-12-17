'use client';

import { Box, Table } from '@chakra-ui/react';
import { useStore } from '@tanstack/react-store';
import { useMemo, useState } from 'react';
import { dummyData } from '../../dummy/data';
import TableHeader from './DataTableHeader';
import TablePagination from './DataTablePagination';
import TableRows from './DataTableRow';
import { tableStore } from './tableStore';

export default function DataTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const { sortColumn, sortDirection } = useStore(tableStore);

  const processedData = useMemo(() => {
    const data = [...dummyData];

    if (sortColumn) {
      data.sort((a, b) =>
        sortDirection === 'asc'
          ? String(a[sortColumn]).localeCompare(String(b[sortColumn]))
          : String(b[sortColumn]).localeCompare(String(a[sortColumn])),
      );
    }

    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [page, pageSize, sortColumn, sortDirection]);

  return (
    <Box h="100vh" display="flex" flexDirection="column" p={4}>
      <Box flex="1" overflow="hidden">
        <Box h="100%" overflowY="auto" border="1px solid" borderColor="gray.200" borderRadius="md">
          <Table.Root variant="outline" w="100%">
            <TableHeader />
            <TableRows data={processedData} page={page} pageSize={pageSize} />
          </Table.Root>
        </Box>
      </Box>

      <Box mt={1}>
        <TablePagination
          totalCount={dummyData.length}
          pageSize={pageSize}
          currentPage={page}
          onPageChange={setPage}
          onPageSizeChange={(s) => {
            setPageSize(s);
            setPage(1);
          }}
        />
      </Box>
    </Box>
  );
}
