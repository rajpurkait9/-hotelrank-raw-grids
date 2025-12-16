import { Th, Tr } from "@chakra-ui/react";
import { Column } from "./types";

interface Props<T> {
  columns: Column<T>[];
}

export function DataTableHeader<T>({ columns }: Props<T>) {
  return (
    <Tr>
      {columns.map(col => (
        <Th key={col.id}>{col.label}</Th>
      ))}
    </Tr>
  );
}
