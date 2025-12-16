import { Box, Text, TableCell } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandleIcon } from "@chakra-ui/icons";
import type { Column, DensityType, SortOrder } from "./types";
import { getCellPadding } from "./utils";

interface Props<T> {
  column: Column<T>;
  orderBy: string;
  order: SortOrder;
  density: DensityType;
  onSort: (id: string) => void;
}

export default function SortableHeaderCell<T>({
  column,
  orderBy,
  order,
  density,
  onSort,
}: Props<T>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isSorted = orderBy === column.id;

  return (
    <TableCell
      ref={setNodeRef}
      style={{ ...style, minWidth: column.minWidth }}
      textAlign={column.align}
      px={getCellPadding(density)}
      py="12px"
      fontWeight="semibold"
      bg="gray.100"
      _dark={{ bg: "gray.700" }}
      borderRight="1px"
      borderColor="gray.200"
      _dark={{ borderColor: "gray.600" }}
      cursor={column.sortable !== false ? "pointer" : "default"}
      userSelect="none"
      onClick={() => column.sortable !== false && onSort(column.id)}
      _hover={
        column.sortable !== false
          ? { bg: "gray.200", _dark: { bg: "gray.600" } }
          : {}
      }
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Box
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          cursor="grab"
          _active={{ cursor: "grabbing" }}
          color="gray.500"
          _hover={{ color: "gray.700" }}
          _dark={{ color: "gray.400", _hover: { color: "gray.200" } }}
        >
          <DragHandleIcon />
        </Box>
        <Text flex={1}>
          {column.label}
          {isSorted && (order === "asc" ? " ↑" : " ↓")}
        </Text>
      </Box>
    </TableCell>
  );
}
