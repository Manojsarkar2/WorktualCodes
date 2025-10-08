from scipy.stats import ttest_ind
import pandas as pd


df = pd.read_csv('s.csv')

male = df[df['Gender'] == 'Male']['Overall']
female = df[df['Gender'] == 'Female']['Overall']

stat, p = ttest_ind(male, female, equal_var=False)

print("T-statistic:", stat)
print("P-value:", p)

if p > 0.05:
    print("Fail to reject H0: no significant difference in mean scores between genders")
else:
    print("Reject H0: significant difference in mean scores between genders")

print("Mean Male:", male.mean())
print("Mean Female:", female.mean())
