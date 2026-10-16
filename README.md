
# Software Testing Final Exam - Playwright

- Student ID: 6804101375
- Student Name: Worraphat Wiriya
- Website: https://www.saucedemo.com/
- Tools: TypeScript, Playwright Test

## Test Cases

### Chapter 1: Unit / UI Component Testing
- UT-01: Login Form Validation
- UT-02: Product Button State Validation

### Chapter 2: Integration Testing
- IT-01: Top-Down Integration Testing with Stub
- IT-02: Bottom-Up Integration Testing with Driver

### Chapter 3: System Testing
- ST-01: Complete Purchase Flow
- ST-02: Checkout Validation and Recovery

## Integration Testing Design

### IT-01: Top-Down with Stub
- Real: Login on the actual SauceDemo website.
- Stub: Inventory HTML is rendered with page.setContent().
- Assertions verify the mock heading and two mock products.

### IT-02: Bottom-Up with Driver
- Driver: Creates a BrowserContext, sets the session-username cookie,
  and opens inventory.html directly.
- Real: Inventory product list and Shopping Cart interactions.
- Note: The test must verify that SauceDemo actually accepts the
  prepared login state.

## Run Tests

```bash
npx playwright test
```

## Open HTML Report

```bash
npx playwright show-report
```

## Reports

- HTML: playwright-report/index.html
- JSON: reports/results.json
- Summary: reports/test-summary.md

## Test Results

See the generated Playwright HTML and JSON reports.
The results summary must reflect the actual test run.
