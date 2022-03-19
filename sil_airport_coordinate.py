# Kütüphaneler
import pandas as pd
import numpy as np
np.seterr(divide='ignore', invalid='ignore')

from bokeh.plotting import figure
from bokeh.tile_providers import get_provider, WIKIMEDIA, CARTODBPOSITRON, STAMEN_TERRAIN, STAMEN_TONER, ESRI_IMAGERY, OSM
from bokeh.io import output_notebook, show

import json


# Kodun Notebook üzerinde çıktı vermesi için
output_notebook()

# csv => data frame
havaliman = pd.read_csv("airports.csv") 
#print(type(havaliman))
#print(havaliman)


#############################################


osmHarita = get_provider(OSM)

p = figure(plot_width=900, plot_height=700, x_range=(3000000, 5000000), y_range=(3500000, 6000000),
           x_axis_type="mercator", y_axis_type="mercator", tooltips=[("Pist Tipi", "@type"), 
            ("Havalimanı", "@name"), ("(Long, Lat)", "(@longitude_deg, @latitude_deg)")], title = "Havalimanı Konumları")

p.add_tile(osmHarita)


def wgs84_to_web_mercator(df, lon, lat):
            k = 6378137
            df["MercatorX"] = df[lon] * (k * np.pi/180.0)
            df["MercatorY"] = np.log(np.tan((90 + df[lat]) * np.pi/360.0)) * k
            return df

# Fonsiyonu çağır!!!!
ucus_yeni = wgs84_to_web_mercator(havaliman,"longitude_deg","latitude_deg")
        
p.circle(x = "MercatorX", y = "MercatorY", size=5, fill_color="blue", line_color="red", fill_alpha=0.5, source=havaliman)

show(p)
