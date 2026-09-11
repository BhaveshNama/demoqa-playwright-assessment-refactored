import { Page } from '@playwright/test';

export interface CalendarDate {
  day: number;
  month: string;
  year: number;
}

export async function selectCalendarDate(
  page: Page,
  date: CalendarDate
): Promise<void> {
  try {
    const datePicker = page.locator('.react-datepicker');

    // Select the required year.
    await datePicker
      .locator('.react-datepicker__year-select')
      .selectOption(String(date.year));

    // Select the required month.
    await datePicker
      .locator('.react-datepicker__month-select')
      .selectOption({ label: date.month });

    // DemoQA uses three-digit day classes:
    // 1 -> 001, 5 -> 005, 15 -> 015.
    const formattedDay = String(date.day).padStart(3, '0');

    const requiredDate = datePicker.locator(
      `.react-datepicker__day--${formattedDay}:not(.react-datepicker__day--outside-month)`
    );

    await requiredDate.click();
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);

    throw new Error(
      `Unable to select calendar date ${date.day}-${date.month}-${date.year}: ${reason}`,
      { cause: error }
    );
  }
}