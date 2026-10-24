# Character Frequency

word = "banana"

frequency = {}

for char in word:
    if char in frequency:
        frequency[char] += 1
    else:
        frequency[char] = 1

print(frequency)