import pandas as pd

data = pd.read_csv("day-3/dataset/facility_inspection.csv")

print("First 5 Records:")
print(data.head())

print("\nDataset Shape:")
print(data.shape)

print("\nColumn Names:")
print(data.columns)

print("\nDataset Information:")
data.info()

print("\nNagpur Facilities:")
nagpur_data = data[data["location"] == "Nagpur"]
print(nagpur_data)

print("\nFacilities Sorted by Footfall:")
sorted_data = data.sort_values(by="footfall", ascending=False)
print(sorted_data)

print("\nAverage Footfall by Location:")
location_average = data.groupby("location")["footfall"].mean()
print(location_average)

print("\nMissing Values:")
missing_values = data.isnull().sum()
print(missing_values)

print("\nDuplicate Records:")
duplicate_records = data.duplicated().sum()
print("Number of duplicate records:", duplicate_records)

print("\nBasic Statistics:")
statistics = data.describe()
print(statistics)

print("\nFootfall Outliers:")
Q1 = data["footfall"].quantile(0.25)
Q3 = data["footfall"].quantile(0.75)
IQR = Q3 - Q1
lower_limit = Q1 - 1.5 * IQR
upper_limit = Q3 + 1.5 * IQR
outliers = data[
    (data["footfall"] < lower_limit) |
    (data["footfall"] > upper_limit)
]

print(outliers)