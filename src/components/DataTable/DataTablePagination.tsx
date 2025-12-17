'use client';

import {
  Box,
  ButtonGroup,
  HStack,
  IconButton,
  Pagination,
  Portal,
  Select,
  Text,
  createListCollection,
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
    { label: '10', value: '10' },
    { label: '20', value: '20' },
    { label: '50', value: '50' },
    { label: '100', value: '100' },
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
      <HStack justify="space-between" mx="auto" flexWrap="wrap">
        {/* PAGE SIZE SELECT */}
        <HStack>
          <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
            Rows per page:
          </Text>

          <Select.Root
            collection={frameworks}
            size="sm"
            width="60px"
            onValueChange={(value) => onPageSizeChange(Number(value.items[0].value))}
            value={[String(pageSize)]}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {frameworks.items.map((framework) => (
                    <Select.Item item={framework.value} key={framework.value}>
                      {framework.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
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
