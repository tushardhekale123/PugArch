
from pathlib import Path

import joblib
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_FILE = BASE_DIR / "models" / "best_model.joblib"


def main():
    if not MODEL_FILE.exists():
        raise FileNotFoundError(
            "Trained model not found. Run models/train_models.py first."
        )

    model = joblib.load(MODEL_FILE)

    # Example facility inspection data
    facility = pd.DataFrame(
        [
            {
                "cleanliness_score": 3,
                "odor_score": 8,
                "waste_level": "High",
                "complaints": 5,
                "footfall": 300,
                "hours_since_cleaning": 20,
            }
        ]
    )

    prediction = model.predict(facility)[0]

    print("\n--- Facility Hygiene Risk Prediction ---")
    print(facility.to_string(index=False))
    print(f"\nPredicted Hygiene Risk: {prediction}")

    if hasattr(model, "predict_proba"):
        probabilities = model.predict_proba(facility)[0]
        print("\nPrediction probabilities:")
        for label, probability in zip(model.classes_, probabilities):
            print(f"{label}: {probability:.2%}")

    print("\nPrediction complete.")


if __name__ == "__main__":
    main()
