# Practice: Functions

def calculate_average(numbers):
    total = sum(numbers)
    average = total / len(numbers)
    return average


marks = [78, 85, 69, 92, 76]

result = calculate_average(marks)

print("Marks:", marks)
print("Average:", result)