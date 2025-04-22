import * as React from "react";
import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MapRender({ lat, lng }) {
  return (
    <Map
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 14,
      }}
      style={{ width: "100%", height: 500 }}
      mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`}
    >
      <Marker longitude={lng} latitude={lat} anchor='bottom'></Marker>
    </Map>
  );
}
