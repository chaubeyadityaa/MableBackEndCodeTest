import { Account } from "../src/models/Account";

describe("Account", () => {
  let account: Account;

  beforeEach(() => {
    account = new Account("1234", 100);
  });

  it("allows withdrawals when balance is sufficient", () => {
    expect(account.canWithdraw(50)).toBe(true);
  });

  it("prevents withdrawals when balance is insufficient", () => {
    expect(account.canWithdraw(200)).toBe(false);
  });

  it("updates balance correctly after withdraw and deposit", () => {
    account.withdraw(40);
    expect(account.balance).toBe(60);
    account.deposit(50);
    expect(account.balance).toBe(110);
  });
});
