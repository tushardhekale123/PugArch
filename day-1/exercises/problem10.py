# Common Elements in Two Arrays

array1 = [1, 2, 3, 4]
array2 = [3, 4, 5, 6]

common = []

for number in array1:
    if number in array2:
        common.append(number)

print("Common elements:", common)