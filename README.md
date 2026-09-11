# Playwright QA Technical Assessment

## Scope

This repository contains DemoQA Practice Form UI automation and the assessment JSON-response validation, implemented with Playwright and TypeScript.

## Improvements in version 1.1

- Faker-generated runtime student identity, email, mobile number, and address
- Separate valid and invalid JSON test-data files
- Generic typed JSON data helper and student data factory
- Role/accessibility-first locator strategy, with specific selectors only where DemoQA does not expose a reliable accessible name
- Environment-aware base URL and configurable two-worker parallel execution
- Reusable calendar utility
- `TS-01` style test-case identifiers and `@UI` / `@API` tags
- Separate UI and API-related spec files
- GitHub Actions CI workflow
- Parallel-safe test data with a fresh object per test and no shared mutable state

## Project structure

```text
api/                         Reserved for API client modules when a real endpoint is required
fixtures/                    Read-only files used by tests
test-data/                   Valid and invalid JSON data
tests/ui/                    UI specifications
tests/api/                   JSON/API specifications
pages/                       Page objects and reusable page flows
utils/                       Date, data, factory, and validation helpers
.github/workflows/           CI workflow
playwright.config.ts         Runner, environment, retries, workers, and reporting
```

## Prerequisites

- Node.js 20 or newer
- npm
- Git

## Installation

```bash
npm install
npx playwright install chromium
```

## Environment

`BASE_URL` and `WORKERS` may be supplied through environment variables. Defaults are `https://demoqa.com` and `2`.

Git Bash example:

```bash
BASE_URL=https://demoqa.com WORKERS=2 npm test
```

PowerShell example:

```powershell
$env:BASE_URL="https://demoqa.com"
$env:WORKERS="2"
npm.cmd test
```

## Execution

```bash
npm test
npm run test:ui
npm run test:api
npm run test:practice-form
npm run test:parallel
npm run typecheck
npm run report
```

## Retry and CI behaviour

- `retries: 3` retries failed cases up to three times.
- `workers` defaults to `2` and may be overridden by `WORKERS`.
- `forbidOnly` is enabled when `CI` is set.
- CI uses longer action/navigation timeouts, while preserving the same test code.
- The GitHub Actions workflow installs dependencies and Chromium, type-checks, executes tests, and uploads the HTML report even when tests fail.

## Parallel execution safety

Each UI test creates its own page object and fresh Faker-generated student data. JSON templates are read without mutation, nested arrays/objects are copied, and the fixture file is read-only. No test modifies shared files, static data, authentication state, or global mutable variables.

## Assertions and error handling

Web-first assertions verify the form URL, heading, confirmation dialog, summary values, and blocked invalid submissions. Assertion messages describe the failed expectation. `try/catch` is limited to reusable data/calendar helpers where extra context improves diagnostics; test failures are rethrown and never hidden.

## Custom fixtures

No custom Playwright fixture is included because this project has no shared login/authentication setup. The standard `page` fixture is sufficient and keeps the framework simple.

## API data assumption

The assessment provides a JSON response contract rather than a live API endpoint. API logic is therefore kept separate under `tests/api`, with JSON datasets and a reusable validator. The `api/` folder is reserved for an API client if a real endpoint is provided later; no unnecessary external call was introduced.

## Assumptions and limitations

- The supplied Forms URL is interpreted as the available Practice Form workflow.
- DemoQA is a public demonstration site and can be affected by advertisements, latency, or availability.
- Chromium is the configured project; more browser projects can be added if required.
- Test data is synthetic and no credentials, keys, or tokens are committed.
