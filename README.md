# QualNotes Visualization Projects

This repository contains the code for visualizing geographic data annotations in both 2D and 3D formats. The 2D visualization is implemented using Python and Leaflet.js, while the 3D visualization uses Mapbox GL JS.

## Table of Contents
- [2D Visualization (Python & Leaflet.js)](#2d-visualization-python--leafletjs)
- [3D Visualization (Mapbox GL JS)](#3d-visualization-mapbox-gl-js)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## 2D Visualization (Python & Leaflet.js)

### Description
The 2D visualization plots geo-tagged notes on a map, allowing users to see the distribution and details of these notes spatially. It uses Python for backend data processing and Leaflet.js for rendering the map in a web browser interface.

### Prerequisites
- Python 3.x
- Pandas library
- Folium library
- An internet connection to load Leaflet.js from a CDN

### Installation & Setup
1. Clone the repository to your local machine.
2. Install the required Python libraries:
   ```bash
   pip install pandas folium
   ```
3. Navigate to the directory containing the `2d_visualization.py` script.

### Usage 
Run the Python script to generate the HTML file with the map:
``` bash
python 2d_visualization.py
``` 
Then, open the generated `my_map.html` file in a web browser to view your map.

## 3D Visualization (Mapbox GL JS)

### Description
The 3D visualization uses Mapbox GL JS to render a three-dimensional view of geo-notes, providing an interactive map experience.

### Prerequisites
- A modern web browser
- A Mapbox access token (obtain one from [Mapbox](https://www.mapbox.com/))

### Installation & Setup
1. Insert your Mapbox access token in the `myStoryMap3D.js` file where indicated.
2. Serve the HTML files using a local server or deploy them to a web hosting service.

### Usage
Open the `3d_visualization.html` file in your web browser to interact with the 3D map.

## Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments
- [Leaflet.js](https://leafletjs.com/) for the intuitive map API.
- [Mapbox](https://www.mapbox.com/) for their powerful mapping services.
- Anyone who devotes time to contribute to open-source projects.
