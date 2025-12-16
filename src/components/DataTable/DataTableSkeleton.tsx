import { Skeleton, Td, Tr } from "@chakra-ui/react";

export function DataTableSkeleton({ cols }: { cols: number }) {
  return (
    <Tr>
      {Array.from({ length: cols }).map((_, i) => (
        <Td key={i}>
          <Skeleton height="20px" />
        </Td>
      ))}
    </Tr>
  );
}
