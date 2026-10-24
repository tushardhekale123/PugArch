# Practice: Conditions and Loops

marks = [85, 62, 48, 91, 35]

for mark in marks:
    if mark >= 75:
        print(mark, "-> Distinction")
    elif mark >= 50:
        print(mark, "-> Pass")
    else:
        print(mark, "-> Fail")