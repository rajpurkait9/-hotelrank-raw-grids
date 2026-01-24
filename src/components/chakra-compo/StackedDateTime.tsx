import { Stack, Text } from '@chakra-ui/react';
import { formatDateTime } from '../../utils/dateTime';

export interface StackedDateTimeProps {
  value: string | Date | number | null | undefined;
  dateVariant?: 'date' | 'short' | 'full';
  timeVariant?: 'time';
  dateFormat?: string;
  timeFormat?: string;
  align?: 'start' | 'center' | 'end';
  dateColor?: string;
  dateFontSize?: string | number;
  dateFontWeight?: string | number;
  timeFontSize?: string | number;
  timeFontWeight?: string | number;
  timeColor?: string;
  showTime?: boolean;
}

export default function StackedDateTime({
  value,
  dateVariant = 'date',
  timeVariant = 'time',
  dateFormat,
  timeFormat,
  align = 'start',
  dateColor = 'gray.700',
  dateFontSize = '16px',
  dateFontWeight = '500',
  timeColor = 'gray.500',
  timeFontSize = '12px',
  timeFontWeight = '400',
  showTime = true,
}: StackedDateTimeProps) {
  return (
    <Stack gap={0.5} align={align}>
      <Text fontSize={dateFontSize} fontWeight={dateFontWeight} color={dateColor}>
        {formatDateTime({
          value,
          variant: dateVariant,
          format: dateFormat,
        })}
      </Text>

      {showTime && (
        <Text fontSize={timeFontSize} fontWeight={timeFontWeight} color={timeColor}>
          {formatDateTime({
            value,
            variant: timeVariant,
            format: timeFormat,
          })}
        </Text>
      )}
    </Stack>
  );
}
