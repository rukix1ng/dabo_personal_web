const ENGLISH_MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type SupportedLocale = "zh" | "ja" | "en";

type DateTimeParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

export function extractDateTimeParts(value: string | Date | null | undefined): DateTimeParts | null {
  if (!value) return null;

  if (value instanceof Date) {
    return {
      year: value.getFullYear(),
      month: value.getMonth() + 1,
      day: value.getDate(),
      hour: value.getHours(),
      minute: value.getMinutes(),
      second: value.getSeconds(),
    };
  }

  const normalized = String(value).trim();
  const match = normalized.match(
    /^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2})(?::(\d{2}))?)?/
  );

  if (!match) return null;

  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
    hour: Number(match[4] ?? "0"),
    minute: Number(match[5] ?? "0"),
    second: Number(match[6] ?? "0"),
  };
}

export function formatLocalDateTime(
  value: string | Date | null | undefined,
  locale: SupportedLocale
): string {
  const parts = extractDateTimeParts(value);
  if (!parts) return "";

  const { year, month, day, hour, minute } = parts;
  const time = `${pad(hour)}:${pad(minute)}`;

  if (locale === "en") {
    return `${ENGLISH_MONTH_NAMES[month - 1]} ${day}, ${year} ${time}`;
  }

  return `${year}年${month}月${day}日 ${time}`;
}

export function formatAdminDateTime(value: string | Date | null | undefined): string {
  const parts = extractDateTimeParts(value);
  if (!parts) return "";

  const { year, month, day, hour, minute, second } = parts;
  return `${year}/${month}/${day} ${pad(hour)}:${pad(minute)}:${pad(second)}`;
}

export function formatDateTimeLocalValue(value: string | Date | null | undefined): string {
  const parts = extractDateTimeParts(value);
  if (!parts) return "";

  const { year, month, day, hour, minute } = parts;
  return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}`;
}

export function formatStructuredDateTime(value: string | Date | null | undefined): string | undefined {
  const parts = extractDateTimeParts(value);
  if (!parts) return undefined;

  const { year, month, day, hour, minute, second } = parts;
  return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}`;
}

export function formatYearMonth(
  value: string | Date | null | undefined,
  locale: SupportedLocale
): string {
  const parts = extractDateTimeParts(value);
  if (!parts) return "";

  const { year, month } = parts;

  if (locale === "en") {
    return `${ENGLISH_MONTH_NAMES[month - 1]} ${year}`;
  }

  return `${year}年${month}月`;
}

export function formatMonthInputValue(value: string | Date | null | undefined): string {
  const parts = extractDateTimeParts(value);
  if (!parts) return "";

  const { year, month } = parts;
  return `${year}-${pad(month)}`;
}

export function extractYear(value: string | Date | null | undefined): string {
  const parts = extractDateTimeParts(value);
  if (!parts) return "";

  return String(parts.year);
}
