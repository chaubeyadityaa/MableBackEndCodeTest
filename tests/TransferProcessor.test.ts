import { Account } from "../src/models/Account";
import { Transaction } from "../src/models/Transaction";
import { TransferProcessor } from "../src/services/TransferProcessor";

describe("TransferProcessor", () => {
  let accounts: Record<string, Account>;
  let processor: TransferProcessor;

  beforeEach(() => {
    accounts = {
      "A1": new Account("A1", 100),
      "A2": new Account("A2", 50)
    };
    processor = new TransferProcessor(accounts);
  });

  it("processes valid transactions correctly", () => {
    const tx = new Transaction("A1", "A2", 60);
    processor.process([tx]);
    expect(accounts["A1"].balance).toBe(40);
    expect(accounts["A2"].balance).toBe(110);
    expect(processor.failedTransactions.length).toBe(0);
  });

  it("records failed transactions when funds are insufficient", () => {
    const tx = new Transaction("A1", "A2", 200);
    processor.process([tx]);
    expect(accounts["A1"].balance).toBe(100);
    expect(accounts["A2"].balance).toBe(50);
    expect(processor.failedTransactions).toContain(tx);
  });
});
