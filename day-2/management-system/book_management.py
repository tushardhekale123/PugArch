# Book Management System

import json

FILE_NAME = "books.json"


def load_books():
    try:
        with open(FILE_NAME, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return []
    except json.JSONDecodeError:
        print("Error: Invalid JSON file.")
        return []


def save_books(books):
    with open(FILE_NAME, "w") as file:
        json.dump(books, file, indent=4)


books = load_books()


def add_book():
    try:
        book_id = int(input("Enter book ID: "))
        title = input("Enter book title: ")
        author = input("Enter author name: ")
        price = float(input("Enter price: "))
        category = input("Enter category: ")

        book = {
            "id": book_id,
            "title": title,
            "author": author,
            "price": price,
            "category": category
        }

        books.append(book)
        save_books(books)

        print("Book added successfully.")

    except ValueError:
        print("Error: Please enter valid numeric values.")


def list_books():
    if not books:
        print("No books found.")
        return

    print("\n--- Book List ---")

    for book in books:
        print(
            "ID:", book["id"],
            "| Title:", book["title"],
            "| Author:", book["author"],
            "| Price:", book["price"],
            "| Category:", book["category"]
        )


def search_book():
    title = input("Enter book title to search: ").lower()

    found = False

    for book in books:
        if title in book["title"].lower():
            print(book)
            found = True

    if not found:
        print("Book not found.")


def update_book():
    try:
        book_id = int(input("Enter book ID to update: "))

        for book in books:
            if book["id"] == book_id:
                book["title"] = input("Enter new title: ")
                book["author"] = input("Enter new author: ")
                book["price"] = float(input("Enter new price: "))
                book["category"] = input("Enter new category: ")

                save_books(books)

                print("Book updated successfully.")
                return

        print("Book not found.")

    except ValueError:
        print("Error: Invalid input.")


def delete_book():
    try:
        book_id = int(input("Enter book ID to delete: "))

        for book in books:
            if book["id"] == book_id:
                books.remove(book)
                save_books(books)

                print("Book deleted successfully.")
                return

        print("Book not found.")

    except ValueError:
        print("Error: Invalid book ID.")


def filter_by_category():
    category = input("Enter category: ").lower()

    found = False

    for book in books:
        if book["category"].lower() == category:
            print(book)
            found = True

    if not found:
        print("No books found in this category.")


def sort_by_price():
    if not books:
        print("No books available.")
        return

    sorted_books = sorted(books, key=lambda book: book["price"])

    print("\n--- Books Sorted by Price ---")

    for book in sorted_books:
        print(book["title"], "-", book["price"])


def statistics():
    if not books:
        print("No books available.")
        return

    prices = [book["price"] for book in books]

    total = sum(prices)
    average = total / len(prices)
    highest = max(prices)
    lowest = min(prices)

    print("\n--- Statistics ---")
    print("Total Books:", len(books))
    print("Average Price:", average)
    print("Highest Price:", highest)
    print("Lowest Price:", lowest)


def main():
    while True:
        print("\n==============================")
        print("     Book Management System")
        print("==============================")
        print("1. Add Book")
        print("2. List Books")
        print("3. Search Book")
        print("4. Update Book")
        print("5. Delete Book")
        print("6. Filter by Category")
        print("7. Sort by Price")
        print("8. Statistics")
        print("9. Exit")

        choice = input("Enter your choice: ")

        if choice == "1":
            add_book()

        elif choice == "2":
            list_books()

        elif choice == "3":
            search_book()

        elif choice == "4":
            update_book()

        elif choice == "5":
            delete_book()

        elif choice == "6":
            filter_by_category()

        elif choice == "7":
            sort_by_price()

        elif choice == "8":
            statistics()

        elif choice == "9":
            print("Thank you for using Book Management System!")
            break

        else:
            print("Invalid choice.")


main()