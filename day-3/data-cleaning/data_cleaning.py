import pandas as pd

data = pd.read_csv("day-3/dataset/facility_inspection.csv")

print("Original Dataset:")
print(data)

print("\nMissing Values:")
print(data.isnull().sum())

print("\nDuplicate Records:")
print(data.duplicated().sum())

# Remove duplicate records
data = data.drop_duplicates()

# Fill missing numeric values with median
numeric_columns = data.select_dtypes(include="number").columns

for column in numeric_columns:
    data[column] = data[column].fillna(data[column].median())

# Fill missing text values with "Unknown"
text_columns = data.select_dtypes(include="object").columns

for column in text_columns:
    data[column] = data[column].fillna("Unknown")

# Save cleaned dataset
data.to_csv("day-3/dataset/cleaned_facility_inspection.csv", index=False)

print("\nCleaning completed successfully.")
print("Cleaned dataset saved successfully.")