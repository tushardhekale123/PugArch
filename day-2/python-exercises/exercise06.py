# Practice: Lambda Function

numbers = [5, 10, 15, 20, 25]

double = lambda number: number * 2

for number in numbers:
    print(number, "->", double(number))