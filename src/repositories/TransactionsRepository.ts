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

    income = this.getAccumulatedTransactionsValueByType('income');
    outcome = this.getAccumulatedTransactionsValueByType('outcome');

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  private getAccumulatedTransactionsValueByType(type: string): number {
    return this.transactions.reduce((accumulator, transaction) => {
      if (transaction.type === type) {
        return accumulator + transaction.value;
      }
      return accumulator;
    }, 0);
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
