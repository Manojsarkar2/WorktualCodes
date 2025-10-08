import pandas as pd
from sklearn.preprocessing import MinMaxScaler

df = pd.read_csv('s.csv')

scale = df[['Overall']]
minmax_scaler = MinMaxScaler() 
minmax = pd.DataFrame(minmax_scaler.fit_transform(scale), columns=scale.columns)
print("\nMin-Max Scaled Data:\n", minmax)