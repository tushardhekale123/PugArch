
from pathlib import Path

import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report,
)
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier

BASE_DIR = Path(__file__).resolve().parent.parent
DATASET_FILE = BASE_DIR / "dataset" / "prepared_facility_data.csv"
MODEL_DIR = BASE_DIR / "models"
EVALUATION_DIR = BASE_DIR / "evaluation"

MODEL_DIR.mkdir(exist_ok=True)
EVALUATION_DIR.mkdir(exist_ok=True)


def main():
    if not DATASET_FILE.exists():
        raise FileNotFoundError(
            f"Dataset not found: {DATASET_FILE}\n"
            "Run preprocessing/prepare_data.py first."
        )

    df = pd.read_csv(DATASET_FILE)

    target = "hygiene_risk"
    drop_columns = [target]

    # Facility ID is an identifier, not a predictive feature.
    if "facility_id" in df.columns:
        drop_columns.append("facility_id")

    X = df.drop(columns=drop_columns)
    y = df[target]

    numeric_features = X.select_dtypes(include="number").columns.tolist()
    categorical_features = X.select_dtypes(exclude="number").columns.tolist()

    preprocessor = ColumnTransformer(
        transformers=[
            (
                "numeric",
                SimpleImputer(strategy="median"),
                numeric_features,
            ),
            (
                "categorical",
                Pipeline(
                    steps=[
                        ("imputer", SimpleImputer(strategy="most_frequent")),
                        ("encoder", OneHotEncoder(handle_unknown="ignore")),
                    ]
                ),
                categorical_features,
            ),
        ]
    )

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.25,
        random_state=42,
        stratify=y,
    )

    models = {
        "Logistic Regression": LogisticRegression(max_iter=1000),
        "Decision Tree": DecisionTreeClassifier(
            max_depth=4,
            random_state=42,
        ),
        "Random Forest": RandomForestClassifier(
            n_estimators=100,
            random_state=42,
        ),
    }

    results = []
    best_f1 = -1
    best_name = None

    for name, estimator in models.items():
        pipeline = Pipeline(
            steps=[
                ("preprocessor", preprocessor),
                ("model", estimator),
            ]
        )

        pipeline.fit(X_train, y_train)
        predictions = pipeline.predict(X_test)

        accuracy = accuracy_score(y_test, predictions)
        precision = precision_score(
            y_test, predictions, average="weighted", zero_division=0
        )
        recall = recall_score(
            y_test, predictions, average="weighted", zero_division=0
        )
        f1 = f1_score(
            y_test, predictions, average="weighted", zero_division=0
        )

        results.append(
            {
                "model": name,
                "accuracy": accuracy,
                "precision": precision,
                "recall": recall,
                "f1_score": f1,
            }
        )

        safe_name = name.lower().replace(" ", "_")
        joblib.dump(pipeline, MODEL_DIR / f"{safe_name}.joblib")

        print(f"\n--- {name} ---")
        print(f"Accuracy : {accuracy:.3f}")
        print(f"Precision: {precision:.3f}")
        print(f"Recall   : {recall:.3f}")
        print(f"F1 Score : {f1:.3f}")
        print("\nClassification Report:")
        print(classification_report(y_test, predictions, zero_division=0))
        print("Confusion Matrix:")
        print(confusion_matrix(y_test, predictions, labels=sorted(y.unique())))

        if f1 > best_f1:
            best_f1 = f1
            best_name = name
            joblib.dump(pipeline, MODEL_DIR / "best_model.joblib")

    results_df = pd.DataFrame(results)
    results_df.to_csv(EVALUATION_DIR / "model_comparison.csv", index=False)

    with open(EVALUATION_DIR / "best_model.txt", "w", encoding="utf-8") as file:
        file.write(f"Best model: {best_name}\n")
        file.write(f"Weighted F1 score: {best_f1:.3f}\n")
        file.write(
            "Note: The dataset is a small practice dataset; "
            "results are not evidence of real-world performance.\n"
        )

    print("\n=== MODEL TRAINING COMPLETE ===")
    print(f"Best model: {best_name}")
    print(f"Comparison saved: {EVALUATION_DIR / 'model_comparison.csv'}")
    print(f"Best model saved: {MODEL_DIR / 'best_model.joblib'}")


if __name__ == "__main__":
    main()

