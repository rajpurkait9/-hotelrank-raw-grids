'use client';

import { Skeleton, Table } from '@chakra-ui/react';

interface DataTableSkeletonProps {
  rows?: number;
  columns: number;
}

export default function DataTableSkeleton({
  rows = 6,
  columns,
}: DataTableSkeletonProps) {
  return (
    <Table.Body>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <Table.Row key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Table.Cell key={colIndex}>
              <Skeleton height="25px" />
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  );
}
