import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

df = pd.read_csv('s.csv')
df = df.drop('Semester', axis=1)
df = df.drop('Extra',axis =1)

sns.boxplot(df['English'])

# It take grade 1 as outlier but we cannot remove that lowest grade(1) from the dataset in a real time scenario