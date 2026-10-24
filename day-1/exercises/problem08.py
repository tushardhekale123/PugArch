# Find Duplicate Numbe

numbers = [1, 3, 4, 2, 2]

seen = set()

for number in numbers:
    if number in seen:
        print("Duplicate number:", number)
        break
    seen.add(number)