export class Account {
  constructor(public number: string, private _balance: number) {}

  get balance(): number {
    return this._balance;
  }

  canWithdraw(amount: number): boolean {
    return this._balance >= amount;
  }

  withdraw(amount: number): void {
    if (!this.canWithdraw(amount)) throw new Error("Insufficient funds");
    this._balance -= amount;
  }

  deposit(amount: number): void {
    this._balance += amount;
  }
}
