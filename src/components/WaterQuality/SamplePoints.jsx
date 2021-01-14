import { useState } from "react";
import "./LocationMarker/LocationMarker.css";
import { GoogleApiWrapper, Map, InfoWindow, Marker } from "google-maps-react";

function SamplePoints({ samplePoint, center, zoom, google }) {
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});

  let markers = null;
  if (samplePoint != null) {
    markers = samplePoint.map((sp) => {
      if (
        sp.samplingPointType.group ===
        process.env.REACT_APP_SAMPLING_POINT_GROUPS_FW
      )
        return (
          <Marker
            key={sp.easting}
            name={sp.label}
            position={{ lat: sp.lat, lng: sp.long }}
            onClick={(props, marker) => {
              //  console.log(props);
              setSelectedPlace(props);
              setActiveMarker(marker);
              setShowingInfoWindow(!showingInfoWindow);
            }}
          ></Marker>
        );
      return null;
    });
  }

  return (
    <div className="map">
      <Map
        disableDefaultUI={true}
        google={google}
        initialCenter={center}
        zoom={zoom}
        onClick={() => {
          setShowingInfoWindow(false);
        }}
      >
        {markers}
        {activeMarker ? (
          <InfoWindow visible={showingInfoWindow} marker={activeMarker}>
            <div>
              <h6>{selectedPlace.name}</h6>
            </div>
          </InfoWindow>
        ) : null}
      </Map>
    </div>
  );
}
SamplePoints.defaultProps = {
  center: {
    lat: 51.507351,
    lng: -0.127758,
  },
  zoom: 7,
};
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_APIKEY,
})(SamplePoints);
