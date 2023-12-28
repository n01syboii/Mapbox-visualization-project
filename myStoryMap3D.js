// Constants and configuration
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoicXVhbG5vdGVzIiwiYSI6ImNsbzV1dHF6ZTBkbDAybG56a2lqMjR2OTAifQ.oOqxb62O7-gZXNmOX9Rhfg";

// Fetching data
fetch("Data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    // Call the function to initialize the map with the fetched data
    initializeMap(data);
  })
  .catch((error) => {
    console.error("Error during fetch operation:", error);
  });

// Function to initialize the map with the provided data
function initializeMap(data) {
  const geoNotesList = data.geoNotesList;

  if (geoNotesList && geoNotesList.length > 0) {
    const firstGeoNote = geoNotesList[0];

    // Initialize the map
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v11",
      center: [firstGeoNote.lon, firstGeoNote.lat],
      zoom: 16,
      pitch: 45,
      bearing: -17.6,
      antialias: true,
      scrollZoom: false,
    });

    // Add navigation control to the map
    map.on("load", function () {
      map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

      // Process and add markers to the map
      processMarkers(map, geoNotesList);
    });
  } else {
    console.error("geoNotesList is empty or does not exist:", geoNotesList);
  }
}

// Function to process and add markers to the map
function processMarkers(map, geoNotesList) {
  var count = 0;
  let markerCoords = {};
  
  geoNotesList.forEach((markerData) => {
      const el = document.createElement("div");
      el.className = "marker";
      el.id = "marker-" + count;
      
    // Add markers based on note type
    if (markerData.note_type === "photo" && markerData.imgPath) {
        addPhotoMarker(map, el, markerData, count, markerCoords);
        count++;
    } else if (markerData.note_type === "text") {
        addTextMarker(map, el, markerData, count, markerCoords);
        count++;
    } else if (markerData.note_type === "audio" && markerData.audioPath) {
        addAudioMarker(map, el, markerData, count, markerCoords);
        count++;
    } else if (markerData.note_type === "routepoint") {
        // Handle route point marker
        addRoutePointMarker(el, markerData);
    }
});

// Process route and add polyline to the map
processRoute(map, geoNotesList);

//Add marker button function to the map
addButtonFunction();

// Add 3D buildings layer to the map
addBuildingLayer(map);

// Add observer for intersection and navigation control
addIntersectionObserver(markerCoords, map);
}

// Function to add photo marker
function addPhotoMarker(map, el, markerData, count, markerCoords) {
  new mapboxgl.Marker().setLngLat([markerData.lon, markerData.lat]).addTo(map);

  markerCoords[count] = [markerData.lon, markerData.lat];

  new mapboxgl.Marker(el)
    .setLngLat([markerData.lon, markerData.lat])
    .setPopup(
        new mapboxgl.Popup()
    )
    .addTo(map);
  // Add the image and text to the sidecar
  var sidecar = document.getElementById("sidecar");
  var element = document.createElement("section");
  element.id = count;
  element.className = "hidden";
  sidecar.appendChild(element);
  //Adding a count
  var text = document.createElement("p");
  text.className = "count";
  count++;
  text.innerText = count;
  element.appendChild(text);
  var img = document.createElement("img");
  img.src = markerData.imgPath;
  img.alt = "Note Image";
  img.width = 300; // You can adjust this
  element.appendChild(img);
}

// Function to add text marker
function addTextMarker(map, el, markerData, count, markerCoords) {
  new mapboxgl.Marker().setLngLat([markerData.lon, markerData.lat]).addTo(map);

  markerCoords[count] = [markerData.lon, markerData.lat];

  new mapboxgl.Marker(el)
    .setLngLat([markerData.lon, markerData.lat])
    .setPopup(
        new mapboxgl.Popup()
    )
    .addTo(map);

  // Add the text to the sidecar
  var sidecar = document.getElementById("sidecar");
  var element = document.createElement("section");
  element.className = "hidden";
  element.id = count;
  sidecar.appendChild(element);
  //Adding a count
  var ctext = document.createElement("p");
  ctext.className = "count";
  count++;
  ctext.innerText = count;
  element.appendChild(ctext);
  var text = document.createElement("text");
  element.appendChild(text);
  if (markerData.text) {
    var text = document.createElement("p");
    text.innerText = markerData.text;
    element.appendChild(text);
  }
}

// Function to add audio marker
function addAudioMarker(map, el, markerData, count, markerCoords) {
  new mapboxgl.Marker().setLngLat([markerData.lon, markerData.lat]).addTo(map);

  markerCoords[count] = [markerData.lon, markerData.lat];

  new mapboxgl.Marker(el)
    .setLngLat([markerData.lon, markerData.lat])
    .setPopup(
      new mapboxgl.Popup()
    )
    .addTo(map);

  // Add the audio and text to the sidecar
  var sidecar = document.getElementById("sidecar");
  var element = document.createElement("section");
  element.id = count;
  element.className = "hidden";
  sidecar.appendChild(element);
  //Adding a count
  var text = document.createElement("p");
  text.className = "count";
  count++;
  text.innerText = count;
  element.appendChild(text);
  var audio = document.createElement("audio");
  audio.className = "sideCar-Audio";
  audio.controls = "controls";
  audio.src = markerData.audioPath;
  audio.type = "audio/mp3";
  element.appendChild(audio);
}

// Function to handle route point marker
function addRoutePointMarker(el, markerData) {
  new mapboxgl.Marker(el).setLngLat([markerData.lon, markerData.lat]);
}

// Function to process route and add polyline to the map
function processRoute(map, geoNotesList) {
  const coords = geoNotesList.map((markerData) => [
    markerData.lon,
    markerData.lat,
  ]);

  map.addSource("route", {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: coords,
      },
    },
  });

  map.addLayer({
    id: "route",
    type: "line",
    source: "route",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#7C4F1A",
      "line-width": 8,
    },
  });
}

// Function to add 3D building layer
function addBuildingLayer(map) {
  map.addLayer({
    id: "add-3d-buildings",
    source: "composite",
    "source-layer": "building",
    filter: ["==", "extrude", "true"],
    type: "fill-extrusion",
    minzoom: 15,
    paint: {
      "fill-extrusion-color": "#EAC696",
      // Use an 'interpolate' expression to
      // add a smooth transition effect to
      // the buildings as the user zooms in.
      "fill-extrusion-height": [
        "interpolate",
        ["linear"],
        ["zoom"],
        15,
        0,
        15.05,
        ["get", "height"],
      ],
      "fill-extrusion-base": [
        "interpolate",
        ["linear"],
        ["zoom"],
        15,
        0,
        15.05,
        ["get", "min_height"],
      ],
      "fill-extrusion-opacity": 0.6,
    },
    // The 'building' layer in the Mapbox Streets
    // vector tileset contains building height data
    // from OpenStreetMap.
  });
}

// Function to add intersection observer for markers and navigation control
function addIntersectionObserver(markerCoords, map) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((currentNote) => {
        const navBar = document.querySelector("#navBar");

        let highlightMarkerId = document.getElementById(
          "marker-" + currentNote.target.id
        );
        //hide or show each section
        if (highlightMarkerId) {
          if (currentNote.isIntersecting) {
            currentNote.target.classList.add("show");
            console.log(highlightMarkerId);
            highlightMarkerId.classList.add("highlightedMarker");

            if (markerCoords.hasOwnProperty(currentNote.target.id)) {
              const coordinates = markerCoords[currentNote.target.id];
              map.flyTo({
                center: coordinates,
                duration: 1000,
                essential: true,
              });
            } else {
              console.error("Coordinates not found for index:", sectionindex);
            }
          } else {
            highlightMarkerId.classList.remove("highlightedMarker");
            currentNote.target.classList.remove("show");
          }
        } else {
          console.error(
            "Marker element not found for id:",
            currentNote.target.id
          );
        }
        //hide or show navBar
        if (currentNote.target.id === "startPage") {
          if (
            currentNote.isIntersecting &&
            currentNote.intersectionRatio >= 0.3
          ) {
            navBar.classList.add("navHide");
            navBar.classList.remove("navShow");
          } else {
            navBar.classList.add("navShow");
            navBar.classList.remove("navHide");
          }
        }
      });
    },
    { threshold: 0.3 }
  );

  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => observer.observe(el));
}

// Function to add marker button function to scroll to corresponding section
function addButtonFunction() {
    // Find all elements with the role "button"
    const buttons = document.querySelectorAll('[role="button"]');

    // Add a click event listener to each button
    buttons.forEach((button, count) => {
        button.addEventListener('click', () => {
            // Scroll to the corresponding section with the same index
            const sectionId = `${count}`;
            const section = document.getElementById(sectionId);

            if (section) {
                // Scroll to the section smoothly
                section.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.warn(`Section with id ${sectionId} not found.`);
            }
        });
    });
}

