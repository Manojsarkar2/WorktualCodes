import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import OrdinalEncoder
from sklearn.feature_selection import VarianceThreshold

df = pd.read_csv('s.csv')

df_encoded = pd.get_dummies(df,columns = ['Gender'])
df_encoded['Gender_Female']
df_encoded['Gender_Male']


# Custom Encoding

# data = {'Size': ['Small', 'Medium', 'Large', 'Medium', 'Small', 'Large']}
# df2 = pd.DataFrame(data)
# category_order = ['Small', 'Medium', 'Large']

# encoder = OrdinalEncoder(categories=[category_order])
# df2['Size_encoded'] = encoder.fit_transform(df2[['Size']])
# df2

