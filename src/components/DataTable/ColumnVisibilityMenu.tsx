'use client';

import { Checkbox, IconButton, Menu, Portal } from '@chakra-ui/react';
import { Columns } from 'lucide-react';
import type { ColumnId } from './Column';
import { COLUMNS } from './Column';

interface Props {
  visibility: Record<ColumnId, boolean>;
  onToggle: (column: ColumnId) => void;
}

export default function ColumnVisibilityMenu({ visibility, onToggle }: Props) {
  return (
    <Menu.Root closeOnSelect={false}>
      <Menu.Trigger asChild>
        <IconButton aria-label="Toggle columns" variant="outline" size="sm" ml="1">
          <Columns size={18} />
        </IconButton>
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="220px">
            {COLUMNS.map((col) => {
              const isChecked = Boolean(visibility[col.id]);

              return (
                <Menu.Item key={col.id} value={col.id} closeOnSelect={false}>
                  <Checkbox.Root checked={isChecked} onCheckedChange={() => onToggle(col.id)}>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>{col.label}</Checkbox.Label>
                  </Checkbox.Root>
                </Menu.Item>
              );
            })}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
