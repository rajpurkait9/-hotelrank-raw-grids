'use client';

import { HStack, Table } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

export default function SortableHeaderCell({
  id,
  children,
  onClick,
  cursor,
}: {
  id: string;
  children: React.ReactNode;
  onClick?: () => void;
  cursor?: string;
}) {
  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id });

  return (
    <Table.ColumnHeader
      ref={setNodeRef}
      onClick={onClick}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: cursor,
      }}
      {...attributes}
    >
      <HStack justify="space-between">
        {children}
        <span {...listeners}>
          <GripVertical size={14} />
        </span>
      </HStack>
    </Table.ColumnHeader>
  );
}
