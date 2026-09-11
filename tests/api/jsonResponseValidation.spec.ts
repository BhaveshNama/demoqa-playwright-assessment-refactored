import { expect, test } from '@playwright/test';
import { validateJsonResponse } from '../../utils/jsonResponseValidator';
import { readJsonTestData } from '../../utils/dataHelper';

type InvalidResponseRow = {
  scenario: string;
  payload: unknown;
  expectedErrorCount: number;
};

test.describe('@API JSON response validation', () => {
  test('TS-04 | Accept the valid assessment response contract', () => {
    const validApiResponse = readJsonTestData<unknown>('test-data/valid-api-response.json');

    expect(validateJsonResponse(validApiResponse)).toEqual({ valid: true, errors: [] });
  });

  const invalidResponseRows = readJsonTestData<InvalidResponseRow[]>(
    'test-data/invalid-api-responses.json'
  );

  for (const responseRow of invalidResponseRows) {
    test(`TS-05 | Reject invalid JSON response: ${responseRow.scenario}`, () => {
      const validationResult = validateJsonResponse(responseRow.payload);

      expect(validationResult.valid, 'Invalid payload must be rejected').toBe(false);
      expect(
        validationResult.errors,
        `Expected ${responseRow.expectedErrorCount} validation error(s)`
      ).toHaveLength(responseRow.expectedErrorCount);
    });
  }
});
