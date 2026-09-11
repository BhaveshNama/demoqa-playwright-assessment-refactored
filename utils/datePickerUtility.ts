import type { Page } from '@playwright/test';

export type CalendarDate = {
  day: string;
  month: string;
  year: string;
};

/** Selects a date from the DemoQA date picker using its semantic comboboxes. */
export async function selectCalendarDate(page: Page, date: CalendarDate): Promise<void> {
  try {
    const datePicker = page.locator('.react-datepicker');
    const calendarSelectors = datePicker.getByRole('combobox');

    await calendarSelectors.nth(1).selectOption(date.year);
    await calendarSelectors.first().selectOption({ label: date.month });
    await datePicker
      .getByRole('gridcell', { name: new RegExp(`${date.month} ${Number(date.day)}`) })
      .click();
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Unable to select calendar date ${date.day}-${date.month}-${date.year}: ${reason}`,
      { cause: error }
    );
  }
}
