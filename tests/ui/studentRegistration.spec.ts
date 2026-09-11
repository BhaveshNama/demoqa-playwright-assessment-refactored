import { test } from '@playwright/test';
import { StudentRegistrationPage } from '../../pages/StudentRegistrationPage';
import {
  createValidStudentRegistrationData,
  getInvalidStudentRegistrationData
} from '../../utils/studentDataFactory';

test.describe('@UI DemoQA Practice Form', () => {
  test('TS-01 | Submit the student registration form with valid runtime data', async ({ page }) => {
    const studentRegistrationPage = new StudentRegistrationPage(page);
    const validStudentData = createValidStudentRegistrationData();

    await studentRegistrationPage.open();
    await studentRegistrationPage.fillStudentRegistrationForm(validStudentData);
    await studentRegistrationPage.submitForm();
    await studentRegistrationPage.expectSubmissionSummary(validStudentData);
  });

  test('TS-02 | Prevent submission when mandatory fields are empty', async ({ page }) => {
    const studentRegistrationPage = new StudentRegistrationPage(page);

    await studentRegistrationPage.open();
    await studentRegistrationPage.submitForm();

    await studentRegistrationPage.expectFormNotSubmitted();
    await studentRegistrationPage.expectRequiredFieldInvalid(
      studentRegistrationPage.firstNameInput,
      'First Name'
    );
    await studentRegistrationPage.expectRequiredFieldInvalid(
      studentRegistrationPage.lastNameInput,
      'Last Name'
    );
    await studentRegistrationPage.expectRequiredFieldInvalid(
      studentRegistrationPage.mobileNumberInput,
      'Mobile Number'
    );
  });

  test('TS-03 | Reject a mobile number shorter than ten digits', async ({ page }) => {
    const studentRegistrationPage = new StudentRegistrationPage(page);
    const validStudentData = createValidStudentRegistrationData();
    const invalidStudentData = getInvalidStudentRegistrationData();

    await studentRegistrationPage.open();
    await studentRegistrationPage.firstNameInput.fill(validStudentData.firstName);
    await studentRegistrationPage.lastNameInput.fill(validStudentData.lastName);
    await page.getByRole('radio', { name: validStudentData.gender, exact: true }).check();
    await studentRegistrationPage.mobileNumberInput.fill(invalidStudentData.shortMobileNumber);
    await studentRegistrationPage.submitForm();

    await studentRegistrationPage.expectFormNotSubmitted();
    await studentRegistrationPage.expectRequiredFieldInvalid(
      studentRegistrationPage.mobileNumberInput,
      'Mobile Number'
    );
  });
});
