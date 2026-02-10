// src/services/CsvLoader.ts
import fs from "fs";
import { parse } from "csv-parse/sync";
import { Account } from "../models/Account";
import { Transaction } from "../models/Transaction";

type AccountRow = { account_number: string; balance: string };
type TransactionRow = { from: string; to: string; amount: string };

export class CsvLoader {
  /**
   * Load accounts from CSV
   * CSV format: account_number,balance
   */
  static loadAccounts(path: string): Record<string, Account> {
    const content = fs.readFileSync(path, "utf-8");
    const records: AccountRow[] = parse(content, {
      columns: true,
      skip_empty_lines: true,
    });

    const accounts: Record<string, Account> = {};
    for (const row of records) {
      const accountNumber = row.account_number;
      const balance = parseFloat(row.balance);
      accounts[accountNumber] = new Account(accountNumber, balance);
    }

    return accounts;
  }

  /**
   * Load transactions from CSV
   * CSV format: from,to,amount
   */
  static loadTransactions(path: string): Transaction[] {
    const content = fs.readFileSync(path, "utf-8");
    const records: TransactionRow[] = parse(content, {
      columns: true,
      skip_empty_lines: true,
    });

    return records.map(
      (row) => new Transaction(row.from, row.to, parseFloat(row.amount))
    );
  }
}
