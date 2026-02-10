import { Account } from "../models/Account";
import { Transaction } from "../models/Transaction";

export class TransferProcessor {
  public failedTransactions: Transaction[] = [];

  constructor(private accounts: Record<string, Account>) {}

  process(transactions: Transaction[]): void {
    for (const tx of transactions) {
      this.processTransaction(tx);
    }
  }

  private processTransaction(tx: Transaction): void {
    const from = this.accounts[tx.from];
    const to = this.accounts[tx.to];

    if (!from || !to || !from.canWithdraw(tx.amount)) {
      this.failedTransactions.push(tx);
      return;
    }

    from.withdraw(tx.amount);
    to.deposit(tx.amount);
  }
}
