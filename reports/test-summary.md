# Test Summary

- Date: 2026-10-16
- Website: https://www.saucedemo.com/
- Framework: Playwright Test
- Language: TypeScript
- Browser: Chromium

## Results

| Test Case | Result |
|---|---|
| UT-01.1: empty username and password | PASSED |
| UT-01.2: missing password | PASSED |
| UT-01.3: invalid login details | PASSED |
| UT-02: product button state Add to cart -> Remove -> Add to cart | PASSED |
| IT-01: top-down REAL Login -> browser-level Inventory STUB | PASSED |
| IT-02: DRIVER login state -> REAL Inventory and Cart | PASSED |
| ST-01: complete purchase of two products | PASSED |
| ST-02: checkout validation and recovery | PASSED |

## Total

- Total Tests: 8
- Passed: 8
- Failed: 0
- Skipped: 0

## Failures and Notes

All 8 test cases passed during the test run.

- UT-01 verified login form validation for empty credentials, missing password, and invalid login details.
- UT-02 verified the Add to cart and Remove button states and cart badge.
- IT-01 verified real login and the browser-level Inventory Stub.
- IT-02 verified the Driver-prepared login state, inventory products, and shopping cart.
- ST-01 verified the complete purchase flow for two products.
- ST-02 verified checkout validation and successful recovery after entering the required information.
