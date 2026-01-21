'use client';

import { Box, HStack, Table } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { useRef } from 'react';
// import { setColumnWidth } from './DataTableActions';
import { useStore } from '@tanstack/react-store';
import { setColumnWidth } from './DataTableActions';
import { tableStore } from './tableStore';

export default function SortableHeaderCell({
  id,
  children,
  onClick,
  cursor,
  borderRight,
  backgroundColor,
}: {
  id: string;
  children: React.ReactNode;
  onClick?: () => void;
  cursor?: string;
  borderRight?: string;
  backgroundColor?: string;
}) {
  const { columnWidths } = useStore(tableStore);
  const width = columnWidths[id];

  const startX = useRef(0);
  const startWidth = useRef(0);

  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id });

  const onMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    startX.current = e.clientX;
    startWidth.current = width ?? 150;

    const onMove = (ev: MouseEvent) => {
      setColumnWidth(id, startWidth.current + (ev.clientX - startX.current));
    };

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  return (
    <Table.ColumnHeader
      ref={setNodeRef}
      onClick={onClick}
      backgroundColor={backgroundColor}
      w={width ? `${width}px` : undefined}
      minW="60px"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        cursor,
        borderRight,
      }}
      {...attributes}
    >
      <HStack position="relative">
        <span {...listeners}>
          <GripVertical
            size={12}
            style={{
              cursor: 'grab',
            }}
          />
        </span>
        {children}

        <Box
          position="absolute"
          right={0}
          top={0}
          h="100%"
          w="5px"
          cursor="col-resize"
          background={'gray.400'}
          onMouseDown={onMouseDown}
          _hover={{ bg: 'gray.600' }}
        />
      </HStack>
    </Table.ColumnHeader>
  );
}
