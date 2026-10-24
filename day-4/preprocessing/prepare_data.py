
from pathlib import Path

import pandas as pd
from sklearn.model_selection import train_test_split

# Project folders
BASE_DIR = Path(__file__).resolve().parent.parent
DATASET_DIR = BASE_DIR / "dataset"

INPUT_FILE = DATASET_DIR / "facility_inspection.csv"
OUTPUT_FILE = DATASET_DIR / "prepared_facility_data.csv"


def prepare_data():
    if not INPUT_FILE.exists():
        raise FileNotFoundError(
            f"Dataset not found: {INPUT_FILE}\n"
            "Create dataset/facility_inspection.csv first."
        )

    # Load dataset
    df = pd.read_csv(INPUT_FILE)

    print("\n--- Original Dataset ---")
    print(df.head())
    print(f"\nDataset shape: {df.shape}")

    # Remove duplicate records
    df = df.drop_duplicates()

    # Handle missing values
    numeric_columns = df.select_dtypes(include="number").columns
    categorical_columns = df.select_dtypes(exclude="number").columns

    for column in numeric_columns:
        df[column] = df[column].fillna(df[column].median())

    for column in categorical_columns:
        if not df[column].mode().empty:
            df[column] = df[column].fillna(df[column].mode()[0])

    # Validate required target column
    if "hygiene_risk" not in df.columns:
        raise ValueError("Dataset must contain a 'hygiene_risk' column.")

    # Save cleaned dataset
    df.to_csv(OUTPUT_FILE, index=False)

    print("\n--- Data Preparation Complete ---")
    print(f"Cleaned dataset saved to: {OUTPUT_FILE}")
    print(f"Cleaned dataset shape: {df.shape}")
    print("\nMissing values per column:")
    print(df.isnull().sum())
    print("\nHygiene risk distribution:")
    print(df["hygiene_risk"].value_counts())


if __name__ == "__main__":
    prepare_data()

