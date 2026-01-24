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
import { Calendar, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { withChildren } from '../../../utils/chakra-slot';

const PopoverRoot = withChildren(Popover.Root);
const PopoverContent = withChildren(Popover.Content);
const PopoverArrow = withChildren(Popover.Arrow);
const PopoverTrigger = withChildren(Popover.Trigger);
const PopoverPositioner = withChildren(Popover.Positioner);

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
  const day = parseInt(dd);
  const month = parseInt(mm) - 1;
  const year = parseInt(yyyy);

  if (isNaN(day) || isNaN(month) || isNaN(year) || yyyy.length !== 4) return null;

  const date = new Date(year, month, day);
  return date.getDate() === day && date.getMonth() === month ? date : null;
}

export type IMDSDatePickerTypes = {
  value?: Date;
  onChange: (date: Date | null) => void;
  width?: string;
  visible?: boolean;
  label?: string;
};

export default function MDSDatePicker({
  value,
  onChange,
  width = '220px',
  visible = true,
  label = 'Select date',
}: IMDSDatePickerTypes) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(value || new Date());
  const [inputValue, setInputValue] = useState(formatDate(value));

  useEffect(() => {
    setInputValue(formatDate(value));
  }, [value]);

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

  const handleKeyDown = (e) => {
    if (!open) return;
    switch (e.key) {
      case 'ArrowLeft':
        handlePrevMonth();
        break;
      case 'ArrowRight':
        handleNextMonth();
        break;
      case 'Escape':
        setOpen(false);
        break;
      default:
        break;
    }
  };

  const clearDate = () => {
    setInputValue('');
    onChange(null);
  };

  return (
    <Box width={width} onKeyDown={handleKeyDown}>
      {!visible && (
        <Text fontSize="xs" color="fg.muted" mb={1} fontWeight="medium">
          {label}
        </Text>
      )}

      <PopoverRoot
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        positioning={{ placement: 'bottom-start', gutter: 4 }}
      >
        <Group attached w="full" position="relative">
          {inputValue && (
            <IconButton
              size="xs"
              variant="ghost"
              aria-label="Clear date"
              onClick={clearDate}
              position="absolute"
              right="32px"
              top="50%"
              transform="translateY(-50%)"
              zIndex={1}
            >
              <X size={14} />
            </IconButton>
          )}
          <Input
            placeholder="DD-MM-YYYY"
            value={inputValue}
            onChange={(e) => {
              const val = e.target.value;
              setInputValue(val);

              const d = parseDate(val);
              if (d) {
                onChange(d);
                setCurrent(d);
              }
            }}
            size="sm"
            autoComplete="off"
          />
          <PopoverTrigger asChild>
            <InputAddon
              cursor="pointer"
              px={2}
              _hover={{ bg: 'gray.100' }}
              transition="background 0.2s"
            >
              <Calendar size={16} />
            </InputAddon>
          </PopoverTrigger>
        </Group>

        <PopoverPositioner>
          <PopoverContent
            width="300px"
            p={4}
            boxShadow="xl"
            zIndex={1000}
            borderRadius="md"
            outline="none"
          >
            <PopoverArrow />

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
                    borderRadius="md"
                  >
                    {day}
                  </Button>
                );
              })}
            </Grid>
            <Text fontSize="10px" color="fg.muted" mt={3} textAlign="center">
              Use Arrow Keys to change months • Esc to close
            </Text>
          </PopoverContent>
        </PopoverPositioner>
      </PopoverRoot>
    </Box>
  );
}
