import { expect, Locator, Page } from '@playwright/test';
import { selectCalendarDate, type CalendarDate } from '../utils/datePickerUtility';

export type StudentRegistrationData = {
  firstName: string;
  lastName: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  mobile: string;
  dateOfBirth: CalendarDate;
  subjects: string[];
  hobbies: Array<'Sports' | 'Reading' | 'Music'>;
  picturePath: string;
  currentAddress: string;
  state: string;
  city: string;
};

export class StudentRegistrationPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly dateOfBirthInput: Locator;
  readonly subjectsInput: Locator;
  readonly currentAddressInput: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly pictureInput: Locator;
  readonly submitButton: Locator;
  readonly confirmationDialog: Locator;

  constructor(private readonly page: Page) {
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.emailInput = page.getByRole('textbox', { name: 'name@example.com' });
    this.mobileNumberInput = page.getByRole('textbox', { name: 'Mobile Number' });
    this.dateOfBirthInput = page.locator('#dateOfBirthInput');
    this.subjectsInput = page.locator('#subjectsInput');
    this.currentAddressInput = page.getByRole('textbox', { name: 'Current Address' });
    this.stateInput = page.locator('#react-select-3-input');
    this.cityInput = page.locator('#react-select-4-input');
    this.pictureInput = page.locator('#uploadPicture');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.confirmationDialog = page.getByRole('dialog');
  }

  async open(): Promise<void> {
    await this.page.goto('/forms');
    await this.page.getByRole('link', { name: 'Practice Form' }).click();
    await expect(this.page, 'Practice Form URL should be displayed').toHaveURL(
      /automation-practice-form/
    );
    await expect(
      this.page.getByRole('heading', { name: 'Practice Form' }),
      'Practice Form heading should be visible'
    ).toBeVisible();
  }

  async fillStudentRegistrationForm(data: StudentRegistrationData): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.page.getByRole('radio', { name: data.gender, exact: true }).check();
    await this.mobileNumberInput.fill(data.mobile);

    await this.dateOfBirthInput.click();
    await selectCalendarDate(this.page, data.dateOfBirth);

    for (const subject of data.subjects) {
      await this.subjectsInput.fill(subject);
      await this.page.getByRole('option', { name: subject, exact: true }).click();
    }

    for (const hobby of data.hobbies) {
      await this.page.getByRole('checkbox', { name: hobby, exact: true }).check();
    }

    if (data.picturePath) {
      await this.pictureInput.setInputFiles(data.picturePath);
    }
    await this.currentAddressInput.fill(data.currentAddress);
    await this.selectStateAndCity(data.state, data.city);
  }

  async selectStateAndCity(state: string, city: string): Promise<void> {
    await this.stateInput.fill(state);
    await this.page.getByRole('option', { name: state, exact: true }).click();
    await this.cityInput.fill(city);
    await this.page.getByRole('option', { name: city, exact: true }).click();
  }

  async submitForm(): Promise<void> {
    await this.submitButton.click();
  }

  async expectSubmissionSummary(data: StudentRegistrationData): Promise<void> {
    await expect(this.confirmationDialog, 'Submission confirmation should be visible').toBeVisible();
    await expect(
      this.confirmationDialog.getByText('Thanks for submitting the form'),
      'Confirmation title should be displayed'
    ).toBeVisible();

    await this.expectSummaryRow('Student Name', `${data.firstName} ${data.lastName}`);
    await this.expectSummaryRow('Student Email', data.email);
    await this.expectSummaryRow('Gender', data.gender);
    await this.expectSummaryRow('Mobile', data.mobile);
    await this.expectSummaryRow('Subjects', data.subjects.join(', '));
    await this.expectSummaryRow('Hobbies', data.hobbies.join(', '));
    await this.expectSummaryRow('Address', data.currentAddress);
    await this.expectSummaryRow('State and City', `${data.state} ${data.city}`);
  }

  async expectFormNotSubmitted(): Promise<void> {
    await expect(
      this.confirmationDialog,
      'Confirmation dialog should remain hidden for invalid data'
    ).toBeHidden();
  }

  async expectRequiredFieldInvalid(locator: Locator, fieldName: string): Promise<void> {
    const isValid = await locator.evaluate((element: HTMLInputElement) => element.checkValidity());
    expect(isValid, `${fieldName} should fail browser validation`).toBe(false);
  }

  private async expectSummaryRow(label: string, expectedValue: string): Promise<void> {
    const summaryRow = this.confirmationDialog.getByRole('row').filter({ hasText: label });
    await expect(
      summaryRow.getByRole('cell').nth(1),
      `${label} should match the submitted value`
    ).toHaveText(expectedValue);
  }
}
