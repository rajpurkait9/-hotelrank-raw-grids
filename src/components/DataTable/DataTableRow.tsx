'use client';

import { Avatar, Badge, Box, HStack, IconButton, Table, Text } from '@chakra-ui/react';
import { ArrowUpDownIcon, Edit, Trash } from 'lucide-react';
import { dummyData } from '../../dummy/data';

interface DataTableProps {
  page: number;
  pageSize: number;
}

export default function DataTableRow({ page, pageSize }: DataTableProps) {
  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'green' : 'red';
  };

  // Calculate paginated data
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = dummyData.slice(startIndex, endIndex);

  return (
    <Box flex="1" overflow="auto">
      <Table.Root
        bg="white"
        _dark={{ bg: 'gray.800' }}
        borderRadius="lg"
        boxShadow="lg"
        borderWidth="1px"
        borderColor="gray.200"
        // _dark={{ borderColor: 'gray.700' }}
      >
        <Table.Root colorScheme="teal" size="md">
          <Table.Header
            bg="teal.500"
            _dark={{ bg: 'teal.600' }}
            color="white"
            fontSize="sm"
            textTransform="uppercase"
          >
            <Table.Row>
              <Table.ColumnHeader>
                <HStack>
                  <Text>User</Text>
                  <ArrowUpDownIcon />
                </HStack>
              </Table.ColumnHeader>
              <Table.ColumnHeader>Email</Table.ColumnHeader>
              <Table.ColumnHeader>Role</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Join Date</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {paginatedData.map((user) => (
              <Table.Row
                key={user.id}
                _hover={{
                  bg: 'gray.50',
                  _dark: { bg: 'gray.700' },
                }}
              >
                <Table.Cell>
                  <HStack>
                    <Avatar.Root>
                      <Avatar.Image src={`https://i.pravatar.cc/150?img=${user.id}`} />
                      <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                    </Avatar.Root>
                    <Text fontWeight="medium">{user.name}</Text>
                  </HStack>
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  <Badge colorScheme="purple" variant="subtle">
                    {user.role}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Badge colorScheme={getStatusColor(user.status)} variant="solid">
                    {user.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{user.joinDate}</Table.Cell>
                <Table.Cell textAlign="center">
                  <HStack justify="center">
                    <IconButton
                      aria-label="Edit user"
                      // icon={<Edit size={16} />}
                      size="sm"
                      colorScheme="blue"
                      variant="ghost"
                    >
                      <Edit size={16} />
                    </IconButton>
                    <IconButton
                      aria-label="Delete user"
                      // icon={<Trash size={16} />}
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                    >
                      <Trash size={16} />
                    </IconButton>
                  </HStack>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.Root>
    </Box>
  );
}
