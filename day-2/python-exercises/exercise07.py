# Practice: List Comprehension

numbers = [3, 8, 11, 14, 17, 20, 25, 30]

even_numbers = [number for number in numbers if number % 2 == 0]

print("Original numbers:", numbers)
print("Even numbers:", even_numbers)