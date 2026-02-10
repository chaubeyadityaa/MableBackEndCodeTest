# Mable Banking Service – TypeScript Implementation

A simple **banking system** implemented in TypeScript that processes daily account balances and transactions for a company. Designed to handle CSV-based inputs, enforce balance constraints, and produce updated account balances.

---

## Features

- Load account balances from a CSV file  
- Load daily transactions from a CSV file  
- Process transactions while preventing negative balances  
- Track failed transactions (insufficient funds or missing accounts)  
- Output updated account balances to a CSV  
- Fully tested using **Jest** (TypeScript equivalent of RSpec)  
- Clean separation of concerns and domain modeling  

---

## Project Structure

```
mable-bank-ts/
├── account_balances.csv           # Initial account balances
├── mable_transaction.csv          # Daily transactions
├── final_balances.csv             # Generated after processing
├── package.json
├── tsconfig.json
├── src/
│   ├── models/
│   │   ├── Account.ts
│   │   └── Transaction.ts
│   ├── services/
│   │   ├── CsvLoader.ts
│   │   └── TransferProcessor.ts
│   └── index.ts                   # Entry point
└── tests/
    ├── Account.test.ts
    └── TransferProcessor.test.ts
```

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/chaubeyadityaa/MableBackEndCodeTest.git
cd MableBackEndCodeTest
```

### 2. Install dependencies

```bash
npm install
```

### 3. Ensure CSV files are present

- `account_balances.csv` – Initial account balances  
- `mable_transaction.csv` – Daily transactions  

Headers must match:

- `account_balances.csv` → `account_number,balance`  
- `mable_transaction.csv` → `from,to,amount`  

---

## Running the Program

To run the TypeScript code:

```bash
npx ts-node src/index.ts
```

Or using the `start` script:

```bash
npm run start
```

### Output

- Final balances will be printed to the console  
- A new CSV `final_balances.csv` will be generated:

```
account_number,balance
1111234522226789,4820.50
1111234522221234,9974.40
2222123433331212,1550.00
1212343433335665,1725.60
3212343433335755,4879.50
```

- Any failed transactions (e.g., insufficient funds) will also be listed in the console.  

---

## Tests

Tests are written using **Jest**, covering:

- Account operations (withdraw, deposit, insufficient funds)  
- Transaction processing and edge cases  
- Failed transactions  

Run tests with:

```bash
npm run test
```

---

## Pre-commit and Pre-push Hooks

This project uses **Husky** to automatically run tests before committing or pushing code.

### Setup Husky

```bash
npm install --save-dev husky
npm run prepare
```

### Pre-commit Hook

Create `.husky/pre-commit`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "Running tests before commit..."
npm test
```

Make it executable:

```bash
chmod +x .husky/pre-commit
```

### Pre-push Hook (Optional)

Create `.husky/pre-push`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "Running full test suite before push..."
npm test
```

Make it executable:

```bash
chmod +x .husky/pre-push
```

Now:
- Commits will **fail if tests fail**  
- Pushes will **fail if tests fail**  

This ensures your code is always tested before it enters the repo.

---

## Domain Models

- **Account** – Represents a bank account with `number` and `balance`  
- **Transaction** – Represents a money transfer between accounts  
- **TransferProcessor** – Handles applying transactions to accounts while respecting balance constraints  
- **CsvLoader** – Handles loading account and transaction data from CSV files  

---

## Notes

- All money amounts are handled as simple floating-point numbers for demonstration purposes  
- Failed transactions are tracked but do not stop the processing of other transactions  
- TypeScript + Jest are used instead of Ruby + RSpec for a Node.js environment  

---

## Future Improvements

- Output a separate `failed_transactions.csv` for audit  
- Add support for multiple companies / multi-day batch processing  
- Use a proper money library to avoid floating-point rounding issues  
- Integrate with a real database instead of CSV files  

---

## Example CSVs

**account_balances.csv**
```
account_number,balance
1111234522226789,5000.00
1111234522221234,10000.00
2222123433331212,550.00
1212343433335665,1200.00
3212343433335755,50000.00
```

**mable_transaction.csv**
```
from,to,amount
1111234522226789,1212343433335665,500.00
3212343433335755,2222123433331212,1000.00
3212343433335755,1111234522226789,320.50
1111234522221234,1212343433335665,25.60
```

