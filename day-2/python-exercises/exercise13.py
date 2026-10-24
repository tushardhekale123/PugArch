# Practice: Encapsulation

class BankAccount:

    def __init__(self, account_holder, balance):
        self.account_holder = account_holder
        self.__balance = balance

    def deposit(self, amount):
        self.__balance += amount
        print("Amount deposited:", amount)

    def withdraw(self, amount):
        if amount <= self.__balance:
            self.__balance -= amount
            print("Amount withdrawn:", amount)
        else:
            print("Insufficient balance.")

    def show_balance(self):
        print("Account Holder:", self.account_holder)
        print("Balance:", self.__balance)


account1 = BankAccount("Tushar", 5000)

account1.show_balance()

account1.deposit(1500)
account1.withdraw(2000)

account1.show_balance()