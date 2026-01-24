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

// --- Chakra Slot Components ---
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

function parseDateRange(value) {
  const parts = value.split(/\s+to\s+/i);
  const startStr = parts[0];
  const endStr = parts[1];

  const parseSingle = (str) => {
    if (!str) return null;
    const p = str.trim().split('-');
    if (p.length !== 3) return null;
    const [dd, mm, yyyy] = p;
    const d = parseInt(dd);
    const m = parseInt(mm) - 1;
    const y = parseInt(yyyy);
    if (isNaN(d) || isNaN(m) || isNaN(y) || yyyy.length !== 4) return null;
    const date = new Date(y, m, d);
    return date.getDate() === d && date.getMonth() === m ? date : null;
  };

  const start = parseSingle(startStr);
  const end = parseSingle(endStr);

  return { start, end };
}

export type IMDSDateRangePickerTypes = {
  startDate?: Date;
  endDate?: Date;
  onChange: (start: Date | null, end: Date | null) => void;
  width?: string;
  showLabel?: boolean;
  label?: string;
  visible?: boolean;
};


export default function MDSDateRangePicker({
  startDate,
  endDate,
  onChange,
  width = '280px', // Slightly wider for " to "
  showLabel = true,
  label = 'Select date range',
  visible = true,
}: IMDSDateRangePickerTypes) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(startDate || new Date());
  const [hoverDay, setHoverDay] = useState<Date | null>(null);

  const [localStart, setLocalStart] = useState(startDate || null);
  const [localEnd, setLocalEnd] = useState(endDate || null);

  const getDisplayValue = (s, e) => {
    if (s && e) return `${formatDate(s)} to ${formatDate(e)}`;
    if (s) return `${formatDate(s)}`;
    return '';
  };

  const [inputValue, setInputValue] = useState(getDisplayValue(startDate, endDate));

  useEffect(() => {
    setLocalStart(startDate || null);
    setLocalEnd(endDate || null);
  }, [startDate, endDate]);

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

    if (!localStart || (localStart && localEnd)) {
      setLocalStart(selected);
      setLocalEnd(null);
      onChange(selected, null);
      setInputValue(formatDate(selected));
      return;
    }

    // Second click → set end
    if (localStart && !localEnd) {
      const start = selected < localStart ? selected : localStart;
      const end = selected < localStart ? localStart : selected;

      setLocalStart(start);
      setLocalEnd(end);
      onChange(start, end);
      setInputValue(`${formatDate(start)} to ${formatDate(end)}`);
      setOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);

    const { start, end } = parseDateRange(val);

    // If typed fully "01-01-2024 to 05-01-2024", update everything
    if (start && end) {
      const newStart = start < end ? start : end;
      const newEnd = start < end ? end : start;
      onChange(newStart, newEnd);
      setCurrent(newStart);
    }
    // If user deletes the end date text manually, update state to just start date
    else if (start && !val.toLowerCase().includes('to')) {
      onChange(start, null);
    }
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     const { start, end } = parseDateRange(inputValue);
  //     if (start && end) {
  //       onChange(start, end);
  //       setOpen(false);
  //     }
  //   }
  //   if (!open) return;
  //   if (e.key === 'ArrowLeft') handlePrevMonth();
  //   if (e.key === 'ArrowRight') handleNextMonth();
  //   if (e.key === 'Escape') setOpen(false);
  // };
  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;

    const { start, end } = parseDateRange(inputValue);

    // Case 1: start exists, no end → append " to "
    if (start && !end && !inputValue.toLowerCase().includes('to')) {
      const next = `${formatDate(start)} to `;
      setInputValue(next);
      setLocalStart(start);
      setLocalEnd(null);
      onChange(start, null);

      // move cursor to end (next tick)
      requestAnimationFrame(() => {
        const el = e.target;
        el.setSelectionRange(next.length, next.length);
      });

      return;
    }

    // Case 2: full range entered → commit + close
    if (start && end) {
      const newStart = start < end ? start : end;
      const newEnd = start < end ? end : start;
      setLocalStart(newStart);
      setLocalEnd(newEnd);
      onChange(newStart, newEnd);
      setOpen(false);
    }
  };

  const clearDates = () => {
    setLocalStart(null);
    setLocalEnd(null);
    setInputValue('');
    onChange(null, null);
  };

  return (
    <Box width={width} onKeyDown={handleKeyDown}>
      {showLabel && !visible && (
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
          <Input
            placeholder="DD-MM-YYYY to DD-MM-YYYY"
            value={inputValue}
            onChange={handleInputChange}
            size="sm"
            autoComplete="off"
          />
          {inputValue && (
            <IconButton
              size="xs"
              variant="ghost"
              aria-label="Clear date"
              onClick={clearDates}
              position="absolute"
              right="32px"
              top="50%"
              transform="translateY(-50%)"
            >
              <X size={14} />
            </IconButton>
          )}

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
                const date = new Date(current.getFullYear(), current.getMonth(), day);

                // Compute effective start and end for display/preview
                let effectiveStart = startDate;
                let effectiveEnd = endDate;
                if (effectiveStart && effectiveEnd) {
                  if (hoverDay) {
                    if (startDate && endDate) {
                      const mid =
                        startDate.getTime() + (endDate.getTime() - startDate.getTime()) / 2;
                      if (hoverDay.getTime() <= mid) {
                        effectiveStart = hoverDay;
                      } else {
                        effectiveEnd = hoverDay;
                      }
                      // Ensure order (though logic prevents reverse)
                      if (effectiveStart > effectiveEnd) {
                        [effectiveStart, effectiveEnd] = [effectiveEnd, effectiveStart];
                      }
                    } else if (startDate && !endDate) {
                      effectiveStart = hoverDay < startDate ? hoverDay : startDate;
                      effectiveEnd = hoverDay < startDate ? startDate : hoverDay;
                    }
                  }
                }

                const isStart = effectiveStart && date.getTime() === effectiveStart.getTime();
                const isEnd = effectiveEnd && date.getTime() === effectiveEnd.getTime();
                const inRange =
                  effectiveStart && effectiveEnd && date > effectiveStart && date < effectiveEnd;

                let bg = 'transparent';
                let colorPalette = 'gray';
                let variant = 'ghost';

                if (isStart || isEnd) {
                  variant = 'solid';
                  colorPalette = 'blue';
                } else if (inRange) {
                  bg = 'blue.100';
                }

                // Rounded corners logic
                let borderRadius = 'md';
                if (inRange) borderRadius = '0';
                if (isStart && effectiveEnd) {
                  borderRadius = isEnd ? 'md' : 'md 0 0 md';
                }
                if (isEnd && effectiveStart) {
                  borderRadius = isStart ? 'md' : '0 md md 0';
                }

                return (
                  <Button
                    key={day}
                    size="xs"
                    variant={'ghost'}
                    colorPalette={colorPalette}
                    bg={bg !== 'transparent' ? bg : undefined}
                    onClick={() => handleDayClick(day)}
                    onMouseEnter={() => setHoverDay(date)}
                    onMouseLeave={() => setHoverDay(null)}
                    minW="32px"
                    h="32px"
                    fontSize="xs"
                    borderRadius={borderRadius}
                    _hover={{
                      bg: isStart || isEnd ? undefined : 'gray.100',
                    }}
                  >
                    {day}
                  </Button>
                );
              })}
            </Grid>
            <Text fontSize="10px" color="fg.muted" mt={3} textAlign="center">
              Select Start Date then End Date
            </Text>
          </PopoverContent>
        </PopoverPositioner>
      </PopoverRoot>
    </Box>
  );
}
