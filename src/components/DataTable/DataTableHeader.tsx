'use client';

import { Table } from '@chakra-ui/react';
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useStore } from '@tanstack/react-store';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import ColumnVisibilityMenu from './ColumnVisibilityMenu';
import { setColumnOrder, sortByColumn, toggleColumn } from './DataTableActions';
import SortableHeaderCell from './SortableHeaderCell';
import { tableStore } from './tableStore';

export default function TableHeader() {
  const { columnOrder, visibility, sortColumn, sortDirection, sortableColumns, actionsConfig } =
    useStore(tableStore);

  const visibleOrderedColumns = columnOrder
    .map((col) => sortableColumns.find((c) => c.id === col.id))
    .filter((c) => c !== undefined)
    .filter((c) => visibility[c!.id]);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = columnOrder.findIndex((col) => col.id === active.id);
    const newIndex = columnOrder.findIndex((col) => col.id === over.id);

    const newOrder = arrayMove(columnOrder, oldIndex, newIndex);
    setColumnOrder(newOrder);
  };

  return (
    <Table.Header background={'blue.200'} position="sticky" top={0} p="0" zIndex={1}>
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext
          items={columnOrder.map((col) => col.id)}
          strategy={horizontalListSortingStrategy}
        >
          <Table.Row height={'28px'}>
            {visibleOrderedColumns.map((col) => {
              const isSorted = sortColumn === col?.id;
              return (
                <SortableHeaderCell
                  key={col?.id}
                  id={col?.id}
                  onClick={() => col?.sortable && sortByColumn(col?.id)}
                  cursor={col?.sortable ? 'pointer' : 'default'}
                  borderRight="2px solid #dcdcdc"
                  backgroundColor={col?.backgroundColor}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      userSelect: 'none',
                    }}
                  >
                    {col?.label}

                    {col?.sortable &&
                      (isSorted ? (
                        sortDirection === 'asc' ? (
                          <ArrowUp size={14} />
                        ) : (
                          <ArrowDown size={14} />
                        )
                      ) : (
                        <ArrowUpDown size={14} opacity={0.4} />
                      ))}
                  </span>
                </SortableHeaderCell>
              );
            })}

            {actionsConfig?.showActionColumn && (
              <Table.ColumnHeader
                width={actionsConfig.width}
                backgroundColor={actionsConfig.backgroundColor}
                borderRight="2px solid #dcdcdc"
              >
                {actionsConfig.children}
              </Table.ColumnHeader>
            )}
            {actionsConfig?.showColumnVisibilityMenu && (
              <Table.ColumnHeader
                boxSize={'0.5'}
                backgroundColor={actionsConfig.backgroundColorColumnVisibilityMenu}
              >
                <ColumnVisibilityMenu visibility={visibility} onToggle={toggleColumn} />
              </Table.ColumnHeader>
            )}
          </Table.Row>
        </SortableContext>
      </DndContext>
    </Table.Header>
  );
}
