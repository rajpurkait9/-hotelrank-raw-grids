import { HStack } from '@chakra-ui/react';
import { useState } from 'react';
import FiltersDrawer, { renderFilter } from './FilterDrawer';
import { IMainFilterType } from './FilterTypes';

export const FiltersToolBar = ({
  title,
  filters,
  onVisibilityChange,
  onReorder,
  onSizeChange,
  onClear,
  maxToolbarUnits,
  pageKey,
  onLoadPreset,
  activePresetName,
  filterDrawerSize = 'sm',
}: IMainFilterType) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <HStack wrap="wrap" pl={2} pr={2} width="100%" justify="space-between">
      {title}

      <HStack gapX={1}>
        {filters
          .filter((filter) => filter.visible !== false)
          .map((filter) => (
            <HStack
              flex={filter.size ?? 1}
              minW={`${(filter.size ?? 1) * 100}px`}
              key={filter.id}
              alignItems={'center'}
            >
              {renderFilter(filter)}
            </HStack>
          ))}

        <FiltersDrawer
          filterDrawerSize={filterDrawerSize}
          onVisibilityChange={onVisibilityChange}
          onReorder={onReorder}
          onSizeChange={onSizeChange}
          onClear={onClear}
          maxToolbarUnits={maxToolbarUnits}
          pageKey={pageKey}
          filters={filters}
          onLoadPreset={onLoadPreset}
          activePresetName={activePresetName}
          open={drawerOpen}
          onOpenChange={(e: { open: boolean }) => {
            setDrawerOpen(e.open);
          }}
        />
      </HStack>
    </HStack>
  );
};

export default FiltersToolBar;
