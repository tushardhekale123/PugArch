employees = []


def add_employee():
    print("\n--- Add Employee ---")

    employee_id = int(input("Enter employee ID: "))
    name = input("Enter employee name: ")
    salary = float(input("Enter salary: "))
    department = input("Enter department: ")

    employee = {
        "id": employee_id,
        "name": name,
        "salary": salary,
        "department": department
    }

    employees.append(employee)

    print("Employee added successfully!")


def update_employee():
    print("\n--- Update Employee ---")

    employee_id = int(input("Enter employee ID to update: "))

    for employee in employees:
        if employee["id"] == employee_id:
            employee["name"] = input("Enter new name: ")
            employee["salary"] = float(input("Enter new salary: "))
            employee["department"] = input("Enter new department: ")

            print("Employee updated successfully!")
            return

    print("Employee not found.")


def delete_employee():
    print("\n--- Delete Employee ---")

    employee_id = int(input("Enter employee ID to delete: "))

    for employee in employees:
        if employee["id"] == employee_id:
            employees.remove(employee)
            print("Employee deleted successfully!")
            return

    print("Employee not found.")


def search_employee():
    print("\n--- Search Employee ---")

    employee_id = int(input("Enter employee ID: "))

    for employee in employees:
        if employee["id"] == employee_id:
            print("\nEmployee Found")
            print("ID:", employee["id"])
            print("Name:", employee["name"])
            print("Salary:", employee["salary"])
            print("Department:", employee["department"])
            return

    print("Employee not found.")


def list_employees():
    print("\n--- Employee List ---")

    if len(employees) == 0:
        print("No employees found.")
        return

    for employee in employees:
        print(
            "ID:", employee["id"],
            "| Name:", employee["name"],
            "| Salary:", employee["salary"],
            "| Department:", employee["department"]
        )


def highest_salary():
    print("\n--- Highest Salary ---")

    if len(employees) == 0:
        print("No employees found.")
        return

    highest = employees[0]

    for employee in employees:
        if employee["salary"] > highest["salary"]:
            highest = employee

    print("Employee:", highest["name"])
    print("Salary:", highest["salary"])


def average_salary():
    print("\n--- Average Salary ---")

    if len(employees) == 0:
        print("No employees found.")
        return

    total = 0

    for employee in employees:
        total += employee["salary"]

    average = total / len(employees)

    print("Average Salary:", average)


def department_filter():
    print("\n--- Department Filter ---")

    department = input("Enter department: ")

    found = False

    for employee in employees:
        if employee["department"].lower() == department.lower():
            print(
                "ID:", employee["id"],
                "| Name:", employee["name"],
                "| Salary:", employee["salary"],
                "| Department:", employee["department"]
            )
            found = True

    if not found:
        print("No employees found in this department.")


def main():
    while True:
        print("\n================================")
        print("   Employee Management System")
        print("================================")
        print("1. Add Employee")
        print("2. Update Employee")
        print("3. Delete Employee")
        print("4. Search Employee")
        print("5. List Employees")
        print("6. Highest Salary")
        print("7. Average Salary")
        print("8. Department Filter")
        print("9. Exit")

        choice = input("Enter your choice: ")

        if choice == "1":
            add_employee()

        elif choice == "2":
            update_employee()

        elif choice == "3":
            delete_employee()

        elif choice == "4":
            search_employee()

        elif choice == "5":
            list_employees()

        elif choice == "6":
            highest_salary()

        elif choice == "7":
            average_salary()

        elif choice == "8":
            department_filter()

        elif choice == "9":
            print("Thank you for using Employee Management System!")
            break

        else:
            print("Invalid choice. Please try again.")


main()