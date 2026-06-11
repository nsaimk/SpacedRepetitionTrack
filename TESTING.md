# Testing Documentation

This project implements a robust testing strategy to ensure reliability across date calculations and adherence to the strict Code Your Future (CYF) accessibility requirements.

---

## 1. Unit Testing (Non-Trivial Logic)

Per the project requirements, we have isolated our core, non-trivial business logic into pure JavaScript functions inside `dateUtils.js`. This separates our critical time calculations from browser-dependent DOM manipulation, making it highly testable.

### The Tested Function: `calculateRevisionDates(startDateString)`
* **Why it is non-trivial:** Date math in JavaScript is prone to bugs, specifically edge cases around rolling over months (e.g., adding 1 month to January 31st) and daylight savings time adjustments (DST). This function is the engine of the application—it maps out the exact 1-week, 1-month, 3-month, 6-month, and 1-year milestones.
* **Impact on the solution:** The array returned by this function is passed directly into the required `storage.js` module to persist a user's data.

### Test Coverage Breakdown
Our test file `dateUtils.test.js` covers the exact manual verification scenarios outlined in the project rubric:
1. **Interval Verification:** Assures exactly 5 milestone objects are generated.
2. **Index Math Accuracy:** Validates that cross-year transitions (e.g., July 2026 rolling into January 2027) compute precisely without off-by-one errors.
3. **Month/Day Integrity:** Confirms strict compliance with the expected output values from the rubric specifications.

---

## 2. How to Run the Unit Tests

The testing suite relies on **Jest** configured to handle ES6 modules natively. Follow these steps to execute the suite locally:

### Prerequisites
Ensure you have installed the project dependencies:
```bash
npm install