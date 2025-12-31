import { Stack, Text } from '@chakra-ui/react';
import { formatDateTime } from '../../utils/dateTime';

export interface StackedDateTimeProps {
  value: string | Date | number | null | undefined;
  dateVariant?: 'date' | 'short' | 'full';
  timeVariant?: 'time';
  dateFormat?: string;
  timeFormat?: string;
  align?: 'start' | 'center' | 'end';
}

export default function StackedDateTime({
  value,
  dateVariant = 'date',
  timeVariant = 'time',
  dateFormat,
  timeFormat,
  align = 'start',
}: StackedDateTimeProps) {
  return (
    <Stack gap={0.5} align={align}>
      <Text fontSize="sm" fontWeight="500">
        {formatDateTime({
          value,
          variant: dateVariant,
          format: dateFormat,
        })}
      </Text>

      <Text fontSize="xs" color="gray.500">
        {formatDateTime({
          value,
          variant: timeVariant,
          format: timeFormat,
        })}
      </Text>
    </Stack>
  );
}
