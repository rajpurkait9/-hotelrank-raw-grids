'use client';

import { Table } from '@chakra-ui/react';
import { useStore } from '@tanstack/react-store';
import { tableStore } from './tableStore';

interface RowData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
}

export default function TableRows({ data = [] }: { data: RowData[] }) {
  console.log(data);
  const { columnOrder, visibility } = useStore(tableStore);

  if (!Array.isArray(data)) return null;

  return (
    <Table.Body>
      {data.map((row) => (
        <Table.Row key={row.id}>
          {columnOrder
            .filter((id) => visibility[id])
            .map((id) => (
              <Table.Cell key={id}>{row[id]}</Table.Cell>
            ))}

          <Table.Cell>Actions</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  );
}
