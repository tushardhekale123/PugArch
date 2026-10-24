# Day 2 - CSV Analysis
# Book Dataset Analysis

import csv
import os


# CSV file ka correct path
FILE_NAME = os.path.join(
    os.path.dirname(__file__),
    "books_dataset.csv"
)


books = []


# Read CSV file
try:
    with open(FILE_NAME, "r") as file:
        reader = csv.DictReader(file)

        for row in reader:
            books.append(row)

except FileNotFoundError:
    print("Error: CSV file not found.")
    exit()


print("--- Dataset Analysis ---")


# 1. Record Count
print("Total Records:", len(books))


# 2. Missing Values
missing_values = 0

for book in books:
    for value in book.values():
        if value == "":
            missing_values += 1

print("Missing Values:", missing_values)


# 3. Duplicate Records
seen = set()
duplicates = 0

for book in books:
    book_key = (
        book["title"],
        book["author"],
        book["category"],
        book["price"],
        book["rating"]
    )

    if book_key in seen:
        duplicates += 1
    else:
        seen.add(book_key)

print("Duplicate Records:", duplicates)


# 4. Average Price
prices = []

for book in books:
    prices.append(float(book["price"]))

average_price = sum(prices) / len(prices)

print("Average Price:", average_price)


# 5. Minimum Price
minimum_price = min(prices)

print("Minimum Price:", minimum_price)


# 6. Maximum Price
maximum_price = max(prices)

print("Maximum Price:", maximum_price)


# 7. Category-wise Statistics
category_data = {}

for book in books:

    category = book["category"]
    price = float(book["price"])

    if category not in category_data:
        category_data[category] = []

    category_data[category].append(price)


print("\n--- Category-wise Statistics ---")


for category, category_prices in category_data.items():

    average = sum(category_prices) / len(category_prices)

    print(
        category,
        "| Count:", len(category_prices),
        "| Average Price:", round(average, 2),
        "| Minimum:", min(category_prices),
        "| Maximum:", max(category_prices)
    )