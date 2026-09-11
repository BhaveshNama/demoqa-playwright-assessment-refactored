# Test Automation Prioritisation

## Prioritisation criteria

1. Business criticality and customer impact.
2. Execution frequency and regression value.
3. Risk, defect history, and likelihood of failure.
4. Stability of the requirement and user interface.
5. Data combinations and repeatability.
6. Manual effort saved versus automation maintenance cost.
7. Suitability for deterministic, isolated execution.

## Tests to automate first

1. **Build-verification and smoke tests:** provide fast feedback that essential functions are available.
2. **Critical end-to-end flows:** registration, sign-in, search, cart, checkout, payment, and order confirmation protect revenue and core journeys.
3. **High-value regression tests:** repeatedly executed stable tests reduce manual regression effort.
4. **API and integration checks:** offer fast, reliable coverage of contracts, status codes, schema, and business rules.
5. **Data-driven and boundary tests:** efficiently cover many combinations and validation rules.
6. **Cross-browser tests for critical paths:** detect browser-specific issues on supported browsers.

## Lower-priority candidates

One-time checks, frequently changing prototypes, subjective visual checks, CAPTCHA/OTP flows without approved test hooks, and low-risk scenarios with high maintenance cost should generally remain manual or be automated later.
