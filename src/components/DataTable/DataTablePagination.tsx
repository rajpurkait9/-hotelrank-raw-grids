'use client';

import {
  Box,
  ButtonGroup,
  createListCollection,
  HStack,
  IconButton,
  Pagination,
  Select,
  Text,
} from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TablePaginationProps {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  siblingCount?: number;
}

const frameworks = createListCollection({
  items: [
    { label: 'React.js', value: 'react' },
    { label: 'Vue.js', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
  ],
});

export default function TablePagination({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
  onPageSizeChange,
  siblingCount = 2,
}: TablePaginationProps) {
  return (
    <Box mt={6} width="100%">
      <HStack justify="space-between" maxW="800px" mx="auto" flexWrap="wrap" gap={4}>
        {/* PAGE SIZE SELECT */}
        <HStack>
          <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
            Rows per page:
          </Text>

          <Stack gap="5" width="320px">
            <For each={['xs', 'sm', 'md', 'lg']}>
              {(size) => (
                <Select.Root key={size} size={size} collection={PAGE_SIZE_OPTIONS}>
                  <Select.HiddenSelect />
                  <Select.Label>size = {size}</Select.Label>
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select framework" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {frameworks.items.map((framework) => (
                          <Select.Item item={framework} key={framework.value}>
                            {framework.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              )}
            </For>
          </Stack>
        </HStack>

        {/* PAGINATION */}
        <Pagination.Root
          count={totalCount}
          pageSize={pageSize}
          page={currentPage}
          siblingCount={siblingCount}
          onPageChange={(e) => onPageChange(e.page)}
        >
          <ButtonGroup size="sm" variant="ghost">
            <Pagination.PrevTrigger asChild>
              <IconButton aria-label="Previous page">
                <ChevronLeft size={18} />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(item) => (
                <IconButton
                  key={item.value ?? item.type}
                  variant={item.type === 'page' && item.value === currentPage ? 'outline' : 'ghost'}
                  aria-current={
                    item.type === 'page' && item.value === currentPage ? 'page' : undefined
                  }
                >
                  {item.type === 'page' ? item.value : '…'}
                </IconButton>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton aria-label="Next page">
                <ChevronRight size={18} />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </HStack>
    </Box>
  );
}
