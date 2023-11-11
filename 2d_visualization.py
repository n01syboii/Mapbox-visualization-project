import pandas as pd
import folium
# 1. Read the JSON file into a pandas DataFrame
data = pd.read_json("Data.json")

df = pd.json_normalize(data['geoNotesList'])

# 2. Create a map using folium
m = folium.Map(location=[df['lat'].iloc[0], df['lon'].iloc[0]], zoom_start=22)

# Add markers, popups, and polylines
for index, row in df.iterrows():
    if row['note_type'] == "photo":
        popup_content = f"<a href='{row['imgPath']}' target='_blank'><img src='{row['imgPath']}' width='150' height='150'></a>"
    elif row['note_type'] == "audio":
        popup_content = f"<audio controls><source src='{row['audioPath']}' type='audio/mpeg'>Your browser does not support the audio element.</audio>"
    elif row['note_type'] == "text":
        popup_content = f"<p>{row['text']}</p>"
    else:
        popup_content = ""
    
    if (popup_content != ""):
        folium.Marker([row['lat'], row['lon']], popup=popup_content).add_to(m)

folium.PolyLine(df[['lat', 'lon']].values, color="blue").add_to(m)

# Save the map to an HTML file
m.save("my_map.html")

# Your Mapbox access token
YOUR_MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoicXVhbG5vdGVzIiwiYSI6ImNsbzV1dHF6ZTBkbDAybG56a2lqMjR2OTAifQ.oOqxb62O7-gZXNmOX9Rhfg';

# Create a base map
m = folium.Map(location=[df['lat'].iloc[0], df['lon'].iloc[0]], zoom_start=22, control_scale=True)

# Mapbox URL format for tile layers
##mapbox_url = f"https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{{z}}/{{x}}/{{y}}@2x?access_token={YOUR_MAPBOX_ACCESS_TOKEN}"
mapbox_url = f"https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{{z}}/{{x}}/{{y}}@2x?access_token={YOUR_MAPBOX_ACCESS_TOKEN}"

# Add the Mapbox tile layer to the map
folium.TileLayer(tiles=mapbox_url, attr='Mapbox', name='Mapbox Light').add_to(m)

# Add markers, popups, and polylines
for index, row in df.iterrows():
    if row['note_type'] == "photo":
        popup_content = f"<a href='{row['imgPath']}' target='_blank'><img src='{row['imgPath']}' width='150' height='150'></a>"
    elif row['note_type'] == "audio":
        popup_content = f"<audio controls><source src='{row['audioPath']}' type='audio/mpeg'>Your browser does not support the audio element.</audio>"
    elif row['note_type'] == "text":
        popup_content = f"<p>{row['text']}</p>"
    else:
        popup_content = ""
    
    if (popup_content != ""):
        folium.Marker([row['lat'], row['lon']], popup=popup_content).add_to(m)

folium.PolyLine(df[['lat', 'lon']].values, color="blue").add_to(m)


# Your Mapbox access token
YOUR_MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoicXVhbG5vdGVzIiwiYSI6ImNsbzV1dHF6ZTBkbDAybG56a2lqMjR2OTAifQ.oOqxb62O7-gZXNmOX9Rhfg';

# Create a base map
m2 = folium.Map(location=[df['lat'].iloc[0], df['lon'].iloc[0]], zoom_start=22, control_scale=True)

# Mapbox URL format for tile layers
mapbox_url = f"https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{{z}}/{{x}}/{{y}}@2x?access_token={YOUR_MAPBOX_ACCESS_TOKEN}"
##mapbox_url = f"https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{{z}}/{{x}}/{{y}}@2x?access_token={YOUR_MAPBOX_ACCESS_TOKEN}"

# Add the Mapbox tile layer to the map
folium.TileLayer(tiles=mapbox_url, attr='Mapbox', name='Mapbox Light').add_to(m2)

# Add markers, popups, and polylines
for index, row in df.iterrows():
    if row['note_type'] == "photo":
        popup_content = f"<a href='{row['imgPath']}' target='_blank'><img src='{row['imgPath']}' width='150' height='150'></a>"
    elif row['note_type'] == "audio":
        popup_content = f"<audio controls><source src='{row['audioPath']}' type='audio/mpeg'>Your browser does not support the audio element.</audio>"
    elif row['note_type'] == "text":
        popup_content = f"<p>{row['text']}</p>"
    else:
        popup_content = ""
    
    if (popup_content != ""):
        folium.Marker([row['lat'], row['lon']], popup=popup_content).add_to(m2)

folium.PolyLine(df[['lat', 'lon']].values, color="blue").add_to(m2)
m2
# Save the map to an HTML file
m2.save("my_map_box2.html")
