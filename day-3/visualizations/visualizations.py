import pandas as pd
import matplotlib.pyplot as plt

data = pd.read_csv("day-3/dataset/cleaned_facility_inspection.csv")

# 1. Bar Chart - Average Footfall by Location
location_footfall = data.groupby("location")["footfall"].mean()

location_footfall.plot(kind="bar")
plt.title("Average Footfall by Location")
plt.xlabel("Location")
plt.ylabel("Average Footfall")
plt.tight_layout()
plt.savefig("day-3/visualizations/average_footfall_by_location.png")
plt.show()


# 2. Bar Chart - Average Complaints by Location
location_complaints = data.groupby("location")["complaints"].mean()

location_complaints.plot(kind="bar")
plt.title("Average Complaints by Location")
plt.xlabel("Location")
plt.ylabel("Average Complaints")
plt.tight_layout()
plt.savefig("day-3/visualizations/average_complaints_by_location.png")
plt.show()


# 3. Histogram - Cleanliness Score
data["cleanliness_score"].plot(kind="hist", bins=5)

plt.title("Cleanliness Score Distribution")
plt.xlabel("Cleanliness Score")
plt.ylabel("Frequency")
plt.tight_layout()
plt.savefig("day-3/visualizations/cleanliness_histogram.png")
plt.show()


# 4. Scatter Plot - Footfall vs Complaints
plt.scatter(data["footfall"], data["complaints"])

plt.title("Footfall vs Complaints")
plt.xlabel("Footfall")
plt.ylabel("Complaints")
plt.tight_layout()
plt.savefig("day-3/visualizations/footfall_vs_complaints.png")
plt.show()


# 5. Additional Visualization - Waste Level
waste_counts = data["waste_level"].value_counts()

waste_counts.plot(kind="pie", autopct="%1.1f%%")
plt.title("Waste Level Distribution")
plt.ylabel("")
plt.tight_layout()
plt.savefig("day-3/visualizations/waste_level_distribution.png")
plt.show()