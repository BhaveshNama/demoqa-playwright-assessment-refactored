export type ValidationResult = {
  valid: boolean;
  errors: string[];
};

/** Validates only the fields required by the assessment response contract. */
export function validateJsonResponse(payload: unknown): ValidationResult {
  const errors: string[] = [];

  if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
    return { valid: false, errors: ['Response must be a JSON object.'] };
  }

  const response = payload as Record<string, unknown>;

  if (typeof response.id !== 'number' || !Number.isFinite(response.id)) {
    errors.push('id must exist and be numeric.');
  }
  if (typeof response.name !== 'string' || response.name.trim().length === 0) {
    errors.push('name must exist and be non-empty.');
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof response.email !== 'string' || !emailPattern.test(response.email)) {
    errors.push('email must exist and have a valid format.');
  }
  if (!Array.isArray(response.roles) || response.roles.length === 0) {
    errors.push('roles must exist and contain at least one role.');
  }

  return { valid: errors.length === 0, errors };
}
