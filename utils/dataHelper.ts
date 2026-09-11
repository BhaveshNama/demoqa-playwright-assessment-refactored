import fs from 'node:fs';
import path from 'node:path';

/** Reads JSON test data relative to the project root and returns a typed object. */
export function readJsonTestData<T>(relativeFilePath: string): T {
  const absoluteFilePath = path.resolve(process.cwd(), relativeFilePath);

  try {
    const fileContent = fs.readFileSync(absoluteFilePath, 'utf-8');
    return JSON.parse(fileContent) as T;
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(`Unable to read test data from "${absoluteFilePath}": ${reason}`, {
      cause: error
    });
  }
}

/** Resolves fixture/test asset paths without mutating the source test-data object. */
export function resolveProjectPath(relativeFilePath: string): string {
  return path.resolve(process.cwd(), relativeFilePath);
}
