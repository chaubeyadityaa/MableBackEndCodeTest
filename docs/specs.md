# Specifications

## Overview

This project implements a simple banking transaction processor for a single company. The system loads initial account balances from a CSV file, processes a day’s transactions from another CSV file, and ensures that no transaction causes an account balance to fall below $0.

---

## Functional Requirements

### Account Loading

* The system must load accounts from a CSV file.
* Each account is uniquely identified by a **16-digit account number**.
* Each account has a starting balance represented as a decimal number.

### Transaction Processing

* Transactions are loaded from a CSV file with the following fields:

  * `from` (source account number)
  * `to` (destination account number)
  * `amount`
* Transactions are processed sequentially in the order they appear in the file.
* A transaction **must not** be applied if:

  * The source account does not exist
  * The destination account does not exist
  * The transaction amount would cause the source account balance to drop below $0

### Failed Transactions

* Failed transactions must not modify any account balances.
* Failed transactions should be logged or tracked for reporting.

### Output

* After processing, final account balances should be:

  * Printed to the console
  * Written to a CSV file

---

## Non-Functional Requirements

* Written in **TypeScript**
* Uses Node.js runtime
* Clear separation of concerns (models, services, entry point)
* Short, readable methods
* Uses native data structures where possible

---

## Domain Models

### Account

* Properties:

  * `accountNumber: string`
  * `balance: number`
* Behavior:

  * `deposit(amount)`
  * `withdraw(amount)` (fails if insufficient funds)

### Transaction

* Properties:

  * `from: string`
  * `to: string`
  * `amount: number`

---

## Testing Requirements

* Tests must be written using **Jest** (RSpec-equivalent for TypeScript)
* Tests should:

  * Cover successful and failed transactions
  * Validate account balance constraints
  * Be orthogonal and independent
  * Clearly describe system behavior

---

## Constraints & Assumptions

* All monetary values are treated as floating-point numbers
* CSV headers must be present and correctly named
* The system processes one company and one day of transactions at a time
