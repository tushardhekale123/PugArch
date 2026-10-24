# Day 3 - Data Analysis & Python for AI/ML

## Objective

To analyze, clean and visualize a real-world facility inspection dataset using Python, NumPy, Pandas and Matplotlib.

## Dataset

The dataset contains facility inspection information such as:

- Facility ID
- Location
- Cleanliness Score
- Odor Score
- Waste Level
- Water Availability
- Footfall
- Complaints
- Inspection Date

## Data Analysis

The dataset was analyzed using Pandas.

The following operations were performed:

- Dataset inspection
- Filtering by location
- Sorting by footfall
- Grouping by location
- Average footfall calculation
- Missing value detection
- Duplicate record detection
- Basic statistical analysis
- Outlier detection using IQR

## Data Cleaning

The dataset was cleaned by:

- Checking missing values
- Removing duplicate records
- Handling missing numeric values using median
- Handling missing text values using "Unknown"
- Saving the cleaned dataset

## Visualizations

The following visualizations were created:

1. Average Footfall by Location
2. Average Complaints by Location
3. Cleanliness Score Histogram
4. Footfall vs Complaints Scatter Plot
5. Waste Level Distribution

## Project Structure

```text
day-3/
├── dataset/
│   ├── facility_inspection.csv
│   └── cleaned_facility_inspection.csv
├── data-cleaning/
│   └── data_cleaning.py
├── analysis/
│   └── data_analysis.py
├── visualizations/
│   ├── average_complaints_by_location.png
│   ├── average_footfall_by_location.png
│   ├── cleanliness_histogram.png
│   ├── footfall_vs_complaints.png
│   ├── visualizations.py
│   └── waste_level_distribution.png
└── README.md

```

## Technologies Used

Python
Pandas
NumPy
Matplotlib
How to Run

## Run data analysis:

python day-3/analysis/data_analysis.py

## Run data cleaning:

python day-3/data-cleaning/data_cleaning.py

## Run visualizations:

python day-3/visualizations/visualizations.py

## Learning Outcome

Through this project, I practiced data inspection, cleaning, filtering, sorting, grouping, statistical analysis, outlier detection and data visualization using Python.