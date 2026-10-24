# Practice: File Handling

student_name = "Tushar"
student_course = "Python"
student_score = 85

with open("student.txt", "w") as file:
    file.write("Student Name: " + student_name + "\n")
    file.write("Course: " + student_course + "\n")
    file.write("Score: " + str(student_score) + "\n")

print("Student information saved successfully.")

with open("student.txt", "r") as file:
    data = file.read()

print("\n--- File Content ---")
print(data)