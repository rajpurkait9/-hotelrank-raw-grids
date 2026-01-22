'use client';

import { DatePicker, DateValue } from '@ark-ui/react';
import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Popover,
  Portal,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { withChildren } from '../../utils/chakra-slot';
import {
  DATE_SEPARATOR,
  formatDatePart,
  formatForDisplay,
  getTodayISO,
  parsePartialDate,
} from '../filters/shared/dateUtils';


/* ---------------- Popover slots ---------------- */
const PopoverRoot = withChildren(Popover.Root);
const PopoverTrigger = withChildren(Popover.Trigger);
const PopoverContent = withChildren(Popover.Content);
const PopoverPositioner = withChildren(Popover.Positioner);

/* ---------------- Helpers ---------------- */
const toISO = (date: Date) => {
  try {
    return date.toISOString().slice(0, 10);
  } catch {
    return getTodayISO();
  }
};

const fromISO = (iso?: string) => {
  if (!iso) return undefined;
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export default function DateRangeFilter({
  value,
  onChange,
  disabled = false,
}: {
  value?: string;
  onChange: (value?: string) => void;
  disabled?: boolean;
}) {
  // Parse initial value "YYYY-MM-DD|YYYY-MM-DD"
  const [startDate = '', endDate = ''] = value ? value.split('|') : [];

  // 1. Local Input State
  const [input, setInput] = useState(() => {
    if (startDate && endDate) {
      return `${formatForDisplay(startDate)}${DATE_SEPARATOR}${formatForDisplay(endDate)}`;
    }
    if (startDate) return formatForDisplay(startDate);
    return '';
  });

  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 2. Sync input text when prop `value` changes externally
  useEffect(() => {
    if (startDate && endDate) {
      setInput(`${formatForDisplay(startDate)}${DATE_SEPARATOR}${formatForDisplay(endDate)}`);
    } else if (!value) {
      setInput('');
    }
  }, [value, startDate, endDate]);

  /* ---------------- Handlers ---------------- */

  // Handle manual typing in the input
  const handleChange = (raw: string) => {
    let val = raw;
    // Basic auto-formatting logic
    if (val.includes(DATE_SEPARATOR)) {
      const [s, e = ''] = val.split(DATE_SEPARATOR);
      val = `${formatDatePart(s.trim())}${DATE_SEPARATOR}${formatDatePart(e.trim())}`;
    } else {
      val = formatDatePart(val);
    }
    setInput(val);
  };

  // Commit changes on Blur
  const handleBlur = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      onChange(undefined);
      return;
    }

    const [s, e = ''] = trimmed.split(DATE_SEPARATOR).map((x) => x.trim());
    const start = parsePartialDate(s);
    const end = e ? parsePartialDate(e) : null;

    if (!start) {
      // Invalid date, revert to empty or previous
      setInput('');
      onChange(undefined);
      return;
    }

    const finalStart = start;
    const finalEnd = end ?? start; // If end is missing, assume single day range

    // Sort so start is always before end
    const [a, b] = finalEnd < finalStart ? [finalEnd, finalStart] : [finalStart, finalEnd];

    // Update input display and trigger change
    const nextInput = `${formatForDisplay(a)}${DATE_SEPARATOR}${formatForDisplay(b)}`;
    if (input !== nextInput) setInput(nextInput);

    onChange(`${a}|${b}`);
  };

  // Commit changes on Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  // Convert "YYYY-MM-DD" strings to Date objects for Ark UI
  // const selectedRange: DateValue[] =
  //   startDate && endDate ? [fromISO(startDate)!, fromISO(endDate)!] : [];


  return (
    <InputGroup>
      <>
        {/* <InputLeftElement pointerEvents="none">
          <CalendarIcon size={16} color="gray" />
        </InputLeftElement> */}

        {/* Invisible trigger covering the icon area or handled via specific button if preferred.
          Here we wrap the Input interaction logic or use a specific trigger button.
          Given the UI design, usually the icon is just visual and clicking the input types,
          but we need a button to open the calendar. */}

        <PopoverRoot open={open} onOpenChange={(d) => setOpen(d.open)} portalled>
          <PopoverTrigger asChild>
            <IconButton
              size="sm"
              variant="ghost"
              position="absolute"
              right={0}
              zIndex={2}
              aria-label="Open calendar"
              // icon={<CalendarIcon size={16} />}
              onClick={() => setOpen(!open)}
            />
          </PopoverTrigger>

          <Portal>
            <PopoverPositioner>
              <PopoverContent
                p={4}
                w="320px"
                bg="white"
                boxShadow="xl"
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                zIndex={1500} // High z-index to sit above tables
              >
                <DatePicker.Root
                  selectionMode="range"
                  // value={selectedRange}
                  onValueChange={(details) => {
                    const [s, e] = details.value;
                    if (!s) return;

                    const sISO = toISO(s as any);
                    const eISO = e ? toISO(e as any) : sISO; // Handle partial selection

                    // Update text input immediately for feedback
                    setInput(`${formatForDisplay(sISO)}${DATE_SEPARATOR}${formatForDisplay(eISO)}`);

                    // Only trigger parent onChange when we have a conceptual range (start or start+end)
                    // Usually better to wait for end date if expecting a range, but this updates live:
                    onChange(`${sISO}|${eISO}`);
                  }}
                >
                  <VStack gap={4} align="stretch">
                    {/* --- Header & Navigation --- */}
                    <DatePicker.Context>
                      {(api) => (
                        <HStack justify="space-between">
                          <DatePicker.PrevTrigger asChild>
                            <IconButton size="xs" variant="outline" aria-label="Prev">
                              <ChevronLeft size={14} />
                            </IconButton>
                          </DatePicker.PrevTrigger>

                          <DatePicker.ViewTrigger asChild>
                            <Button size="sm" variant="ghost" fontWeight="bold">
                              <DatePicker.RangeText />
                            </Button>
                          </DatePicker.ViewTrigger>

                          <DatePicker.NextTrigger asChild>
                            <IconButton size="xs" variant="outline" aria-label="Next">
                              <ChevronRight size={14} />
                            </IconButton>
                          </DatePicker.NextTrigger>
                        </HStack>
                      )}
                    </DatePicker.Context>

                    {/* --- DAY View --- */}
                    <DatePicker.View view="day">
                      <DatePicker.Context>
                        {(api) => (
                          <DatePicker.Table>
                            <DatePicker.TableHead>
                              <DatePicker.TableRow>
                                {api.weekDays.map((day) => (
                                  <DatePicker.TableHeader key={day.short}>
                                    <Text fontSize="xs" color="gray.500" textAlign="center">
                                      {day.short}
                                    </Text>
                                  </DatePicker.TableHeader>
                                ))}
                              </DatePicker.TableRow>
                            </DatePicker.TableHead>
                            <DatePicker.TableBody>
                              {api.weeks.map((week, id) => (
                                <DatePicker.TableRow key={id}>
                                  {week.map((day, id) => (
                                    <DatePicker.TableCell key={id} value={day}>
                                      <DatePicker.TableCellTrigger asChild>
                                        <Box
                                          w="100%"
                                          p={1}
                                          textAlign="center"
                                          fontSize="sm"
                                          borderRadius="md"
                                          cursor="pointer"
                                          _hover={{ bg: 'blue.50' }}
                                          _selected={{ bg: 'blue.500', color: 'white' }}
                                          _inRange={{ bg: 'blue.100', color: 'blue.800' }}
                                          // Visual tweaks for disabled/outside days
                                          // opacity={day.outside ? 0.4 : 1}
                                        >
                                          {day.day}
                                        </Box>
                                      </DatePicker.TableCellTrigger>
                                    </DatePicker.TableCell>
                                  ))}
                                </DatePicker.TableRow>
                              ))}
                            </DatePicker.TableBody>
                          </DatePicker.Table>
                        )}
                      </DatePicker.Context>
                    </DatePicker.View>

                    {/* --- MONTH View --- */}
                    <DatePicker.View view="month">
                      <DatePicker.Context>
                        {(api) => (
                          <DatePicker.Table>
                            <DatePicker.TableBody>
                              {api
                                .getMonthsGrid({ columns: 4, format: 'short' })
                                .map((row, rowId) => (
                                  <DatePicker.TableRow key={rowId}>
                                    {row.map((month, colId) => (
                                      <DatePicker.TableCell key={colId} value={month.value}>
                                        <DatePicker.TableCellTrigger asChild>
                                          <Button variant="ghost" size="sm" w="full">
                                            {month.label}
                                          </Button>
                                        </DatePicker.TableCellTrigger>
                                      </DatePicker.TableCell>
                                    ))}
                                  </DatePicker.TableRow>
                                ))}
                            </DatePicker.TableBody>
                          </DatePicker.Table>
                        )}
                      </DatePicker.Context>
                    </DatePicker.View>

                    {/* --- YEAR View --- */}
                    <DatePicker.View view="year">
                      <DatePicker.Context>
                        {(api) => (
                          <DatePicker.Table>
                            <DatePicker.TableBody>
                              {api.getYearsGrid({ columns: 4 }).map((row, rowId) => (
                                <DatePicker.TableRow key={rowId}>
                                  {row.map((year, colId) => (
                                    <DatePicker.TableCell key={colId} value={year.value}>
                                      <DatePicker.TableCellTrigger asChild>
                                        <Button variant="ghost" size="sm" w="full">
                                          {year.label}
                                        </Button>
                                      </DatePicker.TableCellTrigger>
                                    </DatePicker.TableCell>
                                  ))}
                                </DatePicker.TableRow>
                              ))}
                            </DatePicker.TableBody>
                          </DatePicker.Table>
                        )}
                      </DatePicker.Context>
                    </DatePicker.View>
                  </VStack>
                </DatePicker.Root>
              </PopoverContent>
            </PopoverPositioner>
          </Portal>
        </PopoverRoot>

        <Input
          pl={10} // Space for LeftElement
          pr={10} // Space for Right Trigger
          ref={inputRef}
          placeholder="DD-MM-YYYY to DD-MM-YYYY"
          value={input}
          size="sm"
          disabled={disabled}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      </>
    </InputGroup>
  );
}
