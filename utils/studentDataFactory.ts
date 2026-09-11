import { faker } from '@faker-js/faker';
import type { StudentRegistrationData } from '../pages/StudentRegistrationPage';
import { readJsonTestData, resolveProjectPath } from './dataHelper';
import path from 'path';

const picturePath = path.resolve(
  process.cwd(),
  'fixtures',
  'sample-upload.txt'
);

type ValidStudentTemplate = Pick<
  StudentRegistrationData,
  'gender' | 'dateOfBirth' | 'subjects' | 'hobbies' | 'state' | 'city'
> & { picturePath: string };

export type InvalidStudentRegistrationData = {
  shortMobileNumber: string;
  invalidEmailAddress: string;
};

const validTemplatePath = 'test-data/valid-student-registration.json';
const invalidDataPath = 'test-data/invalid-student-registration.json';

/** Creates a new independent student object for every test invocation. */
export function createValidStudentRegistrationData(): StudentRegistrationData {
  const template = readJsonTestData<ValidStudentTemplate>(validTemplatePath);

  return {
    ...template,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    mobile: faker.string.numeric({ length: 10, allowLeadingZeros: false }),
    currentAddress: faker.location.streetAddress({ useFullAddress: true }),
    subjects: [...template.subjects],
    hobbies: [...template.hobbies],
    dateOfBirth: { ...template.dateOfBirth },
    picturePath: resolveProjectPath(template.picturePath)
  };
}

/** Retrieves intentionally invalid registration values from the test-data layer. */
export function getInvalidStudentRegistrationData(): InvalidStudentRegistrationData {
  return readJsonTestData<InvalidStudentRegistrationData>(invalidDataPath);
}
