mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: restaurant.geometry.coordinates,
  zoom: 10,
});

const nav = new mapboxgl.NavigationControl();
map.addControl(nav);

const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
  `<h3>${restaurant.title}</h3>`
);

// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker()
  .setLngLat(restaurant.geometry.coordinates)
  .setPopup(popup)
  .addTo(map);
