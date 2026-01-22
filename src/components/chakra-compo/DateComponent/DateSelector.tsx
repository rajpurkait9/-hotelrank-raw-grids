import {
  Box,
  Button,
  Grid,
  Group,
  HStack,
  IconButton,
  Input,
  InputAddon,
  Popover,
  Text,
} from '@chakra-ui/react';
import { Calendar } from 'lucide-react';
import { useState } from 'react';

// --- Helper Functions ---
function formatDate(date) {
  if (!date) return '';
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

function parseDate(value) {
  const parts = value.split('-');
  if (parts.length !== 3) return null;
  const [dd, mm, yyyy] = parts;
  const month = parseInt(mm) - 1;
  const day = parseInt(dd);
  const year = parseInt(yyyy);
  const date = new Date(year, month, day);
  // Optional: Add logic to check for valid dates only
  return isNaN(date.getTime()) ? null : date;
}

export default function MDSDatePicker({
  value,
  onChange,
  width = '220px', // Slightly wider to accommodate icon
  showLabel = true,
  label = 'Select date',
}) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(value || new Date());

  const daysInMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();
  const firstDay = new Date(current.getFullYear(), current.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1));
  };

  const handleDayClick = (day) => {
    const selected = new Date(current.getFullYear(), current.getMonth(), day);
    onChange(selected);
    setOpen(false);
  };

  return (
    <Box width={width}>
      {showLabel && (
        <Text fontSize="xs" color="fg.muted" mb={1} fontWeight="medium">
          {label}
        </Text>
      )}

      <Popover.Root
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        positioning={{ placement: 'bottom-start', gutter: 4 }}
      >
        <Group attached w="full">
          <Input
            placeholder="DD-MM-YYYY"
            value={formatDate(value)}
            onChange={(e) => {
              const d = parseDate(e.target.value);
              // Only trigger onChange if it's a valid full date
              if (d && e.target.value.length === 10) onChange(d);
            }}
            size="sm"
            autoComplete="off"
          />
          <Popover.Trigger asChild>
            <InputAddon
              cursor="pointer"
              px={2}
              _hover={{ bg: 'gray.100' }}
              transition="background 0.2s"
            >
              <Calendar size={16} />
            </InputAddon>
          </Popover.Trigger>
        </Group>

        <Popover.Positioner>
          <Popover.Content width="300px" p={4} boxShadow="xl" zIndex={1000} borderRadius="md">
            <Popover.Arrow />

            {/* HEADER */}
            <HStack justify="space-between" mb={4}>
              <IconButton
                size="xs"
                variant="ghost"
                onClick={handlePrevMonth}
                aria-label="Previous month"
              >
                ‹
              </IconButton>
              <Text fontWeight="bold" fontSize="sm">
                {current.toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
              <IconButton
                size="xs"
                variant="ghost"
                onClick={handleNextMonth}
                aria-label="Next month"
              >
                ›
              </IconButton>
            </HStack>

            {/* CALENDAR GRID */}
            <Grid templateColumns="repeat(7, 1fr)" gap={1} textAlign="center">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <Text key={`${d}-${i}`} fontSize="xs" fontWeight="bold" color="fg.subtle" py={1}>
                  {d}
                </Text>
              ))}

              {Array(firstDay)
                .fill(null)
                .map((_, i) => (
                  <Box key={`empty-${i}`} />
                ))}

              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const isSelected =
                  value &&
                  value.getDate() === day &&
                  value.getMonth() === current.getMonth() &&
                  value.getFullYear() === current.getFullYear();

                return (
                  <Button
                    key={day}
                    size="xs"
                    variant={isSelected ? 'solid' : 'ghost'}
                    colorPalette={isSelected ? 'blue' : 'gray'}
                    onClick={() => handleDayClick(day)}
                    minW="32px"
                    h="32px"
                    fontSize="xs"
                  >
                    {day}
                  </Button>
                );
              })}
            </Grid>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </Box>
  );
}
