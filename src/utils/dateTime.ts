import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat';


dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(advancedFormat);

export type DateTimeVariant =
  | 'date'
  | 'time'
  | 'dateTime'
  | 'full'
  | 'relative'
  | 'short';

export interface FormatDateTimeProps {
  value: string | Date | number | null | undefined;
  variant?: DateTimeVariant;
  format?: string;
  fallback?: string;
}

const DEFAULT_FORMATS: Record<DateTimeVariant, string> = {
  date: 'DD MMM YYYY',
  time: 'hh:mm A',
  dateTime: 'DD MMM YYYY, hh:mm A',
  full: 'dddd, DD MMM YYYY, hh:mm A',
  short: 'DD/MM/YY',
  relative: '',
};

export function formatDateTime({
  value,
  variant = 'dateTime',
  format,
  fallback = '--',
}: FormatDateTimeProps): string {
  if (!value) return fallback;

  const d = dayjs(value);
  if (!d.isValid()) return fallback;

  if (variant === 'relative') {
    return d.fromNow();
  }

  return d.format(format ?? DEFAULT_FORMATS[variant]);
}
