var map = L.map("map").setView([25.04659962842711, 55.24142126557905], 13);

var YOUR_MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoicXVhbG5vdGVzIiwiYSI6ImNsbzV1dHF6ZTBkbDAybG56a2lqMjR2OTAifQ.oOqxb62O7-gZXNmOX9Rhfg";

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" +
    YOUR_MAPBOX_ACCESS_TOKEN,
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/light-v10", // This is an example of a light grayscale map style
    tileSize: 512,
    zoomOffset: -1,
  }
).addTo(map);

// Your content
var content = [
  {
    note_index: 0,
    imgPath:
      "https://firebasestorage.googleapis.com/v0/b/qnweb-5f924.appspot.com/o/projects%2FzTpQuYTHL7uCjIxWg1Zm%2Fobs%2Fau5KAmwO4kYFFTc9M2Zx%2F0?alt=media&token=0c53bbf9-e259-4923-88bf-cf247a596020",
    deleteMe: false,
    lon: 55.24142126557905,
    text: "",
    lat: 25.04659962842711,
    timestamp: 1697801756543,
    audioPath: null,
    note_type: "photo",
  },
  {
    note_index: 1,
    imgPath: null,
    deleteMe: false,
    lon: 55.242528,
    text: "So the first thing to notice is that crossing the roads is a hazard because there’s virtually no crossing zebra crossings so I’ll becomes like Indian adventure, Aale stressful we’re now reaching Mohja, which is my favorite Japanese restaurant",
    lat: 25.042534,
    timestamp: 1697801757029,
    audioPath: null,
    note_type: "text",
  },
  {
    note_index: 2,
    imgPath: null,
    deleteMe: false,
    lon: 55.242528,
    text: "",
    lat: 25.035554,
    timestamp: 1697801757029,
    audioPath:
      "https://firebasestorage.googleapis.com/v0/b/qnweb-5f924.appspot.com/o/projects%2FzTpQuYTHL7uCjIxWg1Zm%2Fobs%2Fau5KAmwO4kYFFTc9M2Zx%2F1.m4a?alt=media&token=ff0ebbcb-9e8c-458b-ae0a-ee9b4c553277",
    note_type: "audio",
  },
  {
    note_index: 3,
    imgPath:
      "https://firebasestorage.googleapis.com/v0/b/qnweb-5f924.appspot.com/o/projects%2FzTpQuYTHL7uCjIxWg1Zm%2Fobs%2Fau5KAmwO4kYFFTc9M2Zx%2F3?alt=media&token=a5d6e9fe-88f8-4d7d-978f-0c350519bf5f",
    deleteMe: false,
    lon: 55.25142126557905,
    text: "",
    lat: 25.05659962842711,
    timestamp: 1697801756543,
    audioPath: null,
    note_type: "photo",
  },
  {
    note_index: 4,
    imgPath: null,
    deleteMe: false,
    lon: 55.252528,
    text: "",
    lat: 25.035554,
    timestamp: 1697801757029,
    audioPath:
      "https://firebasestorage.googleapis.com/v0/b/qnweb-5f924.appspot.com/o/projects%2FzTpQuYTHL7uCjIxWg1Zm%2Fobs%2Fau5KAmwO4kYFFTc9M2Zx%2F2.m4a?alt=media&token=0080591b-c0e2-4e30-9448-a673d5b96ca6",
    note_type: "audio",
  },
  {
    note_index: 5,
    imgPath: null,
    deleteMe: false,
    lon: 55.245428,
    text: "",
    lat: 25.035554,
    timestamp: 1697801757029,
    audioPath: null,
    note_type: "routepoint",
  },
  // ... add other notes here ...
];

// Parse content and add to map and sidecar
content.forEach((note) => {
  const validPoints = content.filter(
    (item) => !item.deleteMe && item.lon && item.lat
  );

  // Extract the coordinates into a string formatted as 'lon,lat;lon,lat;...'
  const coordinates = validPoints
    .map((item) => `${item.lon},${item.lat}`)
    .join(";");

  // Construct the API URL
  const directionsRequest = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=pk.eyJ1IjoicXVhbG5vdGVzIiwiYSI6ImNsbzV1dHF6ZTBkbDAybG56a2lqMjR2OTAifQ.oOqxb62O7-gZXNmOX9Rhfg`;

  if (note.note_type === "photo") {
    // Add a marker to the map
    L.marker([note.lat, note.lon])
      .addTo(map)
      .bindPopup(`<img src="${note.imgPath}" alt="Note Image" width="150">`)
      .openPopup();

    // Add the image and text to the sidecar
    var sidecar = document.getElementById("sidecar");
    var img = document.createElement("img");
    img.src = note.imgPath;
    img.alt = "Note Image";
    img.width = 300; // You can adjust this
    sidecar.appendChild(img);
  }
  // Handle other note types similarly
  if (note.note_type === "text") {
    // Add a marker to the map
    L.marker([note.lat, note.lon])
      .addTo(map)
      .bindPopup(`${note.text}`)
      .openPopup();

    // Add the text to the sidecar
    var sidecar = document.getElementById("sidecar");
    var text = document.createElement("text");
    sidecar.appendChild(text);
    if (note.text) {
      var text = document.createElement("p");
      text.innerText = note.text;
      sidecar.appendChild(text);
    }
  }

  if (note.note_type === "audio") {
    // Add a marker to the map
    L.marker([note.lat, note.lon])
      .addTo(map)
      .bindPopup(`<audio controls src= "${note.mediaPath}" type= "audio/mp3"/>`)
      .openPopup();

    // Add the audio and text to the sidecar
    var sidecar = document.getElementById("sidecar");
    var audio = document.createElement("audio");
    audio.controls = "controls";
    audio.src = note.audioPath;
    audio.type = "audio/mp3";
    sidecar.appendChild(audio);
  }

  if (note.note_type === "routepoint") {
    // Add a marker to the map
    L.marker([note.lat, note.lon]).addTo(map).openPopup();
  }
});
