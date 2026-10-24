# Find Largest Number

numbers = [4,8,2,10,6]
largest = numbers[0]

for number in numbers:
    if number > largest:
        largest = number
print("Largest number:", largest)
