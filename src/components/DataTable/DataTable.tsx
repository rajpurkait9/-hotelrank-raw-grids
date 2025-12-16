'use client';

import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { dummyData } from '../../dummy/data';
import TablePagination from './DataTablePagination';
import DataTableRow from './DataTableRow';

export default function DataTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  // const pageSize = 25;

  return (
    <Box
      p={8}
      maxW="100%"
      mx="auto"
      overflowX="auto"
      overflowY="auto"
      minHeight="100vh"
      maxHeight="100vh"
      display="flex"
      flexDirection="column"
    >
      <DataTableRow page={page} pageSize={pageSize} />

     <TablePagination
      totalCount={dummyData.length}
      pageSize={pageSize}
      currentPage={page}
      onPageChange={setPage}
      onPageSizeChange={(newSize) => {
        setPageSize(newSize);
        setPage(1); // Reset to page 1 when changing size
      }}
    />
    </Box>
  );
}
