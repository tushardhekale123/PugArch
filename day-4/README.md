# Day 4 — Machine Learning

## Facility Hygiene Risk Prediction

### 1. Project Overview

This project predicts facility hygiene risk using machine learning techniques. It uses inspection-related information such as cleanliness score, odor score, waste level, complaints, footfall, and hours since cleaning.

**Objective:** Understand core machine learning concepts and build a basic prediction model.

### 2. Dataset

The project uses a sample dataset containing 50 facility inspection records.

**Input features:**

* Cleanliness score
* Odor score
* Waste level
* Number of complaints
* Footfall
* Hours since cleaning

**Target label:** Hygiene risk (Low, Medium, High).

Note: The dataset is created for practice and does not represent real-world inspection records.

### 3. Project Structure

```text
day-4/
├── dataset/
│   ├── facility_inspection.csv
│   └── prepared_facility_data.csv
├── preprocessing/
│   └── prepare_data.py
├── models/
│   ├── train_models.py
│   ├── best_model.joblib
│   ├── logistic_regression.joblib
│   ├── decision_tree.joblib
│   └── random_forest.joblib
├── predictions/
│   └── predict_hygiene.py
├── evaluation/
│   ├── best_model.txt
│   └── model_comparison.csv
└── README.md
```

### 4. Machine Learning Algorithms

The project compares three classification algorithms:

1. Logistic Regression
2. Decision Tree
3. Random Forest

### 5. Workflow

1. Load the inspection dataset.
2. Clean missing values and remove duplicate records.
3. Separate input features and target labels.
4. Encode categorical features.
5. Split the data into training and testing sets.
6. Train and compare the classification models.
7. Evaluate predictions using classification metrics.
8. Save the best model.
9. Predict the hygiene risk for a new facility.

### 6. Evaluation Metrics

The models are evaluated using:

* Accuracy
* Precision
* Recall
* F1 Score
* Confusion Matrix

The model comparison results are saved in `evaluation/model_comparison.csv`.

### 7. How to Run the Project

Install the required packages:

```bash
python -m pip install pandas numpy scikit-learn joblib
```

Prepare the dataset:

```bash
python preprocessing/prepare_data.py
```

Train and evaluate the models:

```bash
python models/train_models.py
```

Predict the hygiene risk:

```bash
python predictions/predict_hygiene.py
```

### 8. Results

The best-performing model is recorded in `evaluation/best_model.txt`.

The actual evaluation results can be found in `evaluation/model_comparison.csv`.

### 9. Limitations

* The dataset contains only 50 sample records.
* Evaluation results may vary with different train/test splits.
* Perfect test accuracy on this small dataset does not guarantee good performance on real-world data.
* More real inspection data is needed before using the model for operational decisions.

### 10. Possible Improvements

* Collect a larger and more diverse dataset.
* Use cross-validation.
* Test the model on independent real-world data.
* Perform additional feature engineering.
* Monitor model performance as new inspection data becomes available.

### 11. Conclusion

This project demonstrates a basic machine learning workflow for facility hygiene risk classification, including data preparation, model training, evaluation, and prediction.
