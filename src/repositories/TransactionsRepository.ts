import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    let income = 0;
    let outcome = 0;
    const allTransactions = this.transactions;

    function calculate(type: 'income' | 'outcome', value: number): null {
      if (type === 'income') {
        income += value;
      } else {
        outcome += value;
      }
      return null;
    }
    allTransactions.forEach(item => calculate(item.type, item.value));

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    // TODO
    const transaction = new Transaction({ title, value, type });
    const { total } = this.getBalance();
    if (type === 'outcome' && total - value < 0) {
      throw Error('string');
    }
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
