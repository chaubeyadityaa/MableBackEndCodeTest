// src/index.ts
import fs from "fs";
import { CsvLoader } from "./services/CsvLoader";
import { TransferProcessor } from "./services/TransferProcessor";
import { Account } from "./models/Account";

// 1️⃣ Load accounts and transactions
const accounts = CsvLoader.loadAccounts("mable_account_balances.csv");
const transactions = CsvLoader.loadTransactions("mable_transactions.csv");

// 2️⃣ Process transactions
const processor = new TransferProcessor(accounts);
processor.process(transactions);

// 3️⃣ Print final balances
console.log("Final Account Balances:");
Object.values(accounts).forEach(acc => {
  console.log(`${acc.number}: ${acc.balance.toFixed(2)}`);
});

// 4️⃣ Print failed transactions, if any
if (processor.failedTransactions.length > 0) {
  console.log("\nFailed Transactions:");
  processor.failedTransactions.forEach(tx => {
    console.log(`${tx.from} -> ${tx.to}: ${tx.amount}`);
  });
}

// 5️⃣ Write final balances to a new CSV
const finalCsvLines = ["account_number,balance"];
Object.values(accounts).forEach((acc: Account) => {
  finalCsvLines.push(`${acc.number},${acc.balance.toFixed(2)}`);
});

fs.writeFileSync("final_balances.csv", finalCsvLines.join("\n"), "utf-8");
console.log("\n✅ Final balances written to final_balances.csv file");
