import GoogleMapReact from "google-map-react";
import { useState } from "react";
import LocationMarker from "./LocationMarker/LocationMarker";
import "./LocationMarker/LocationMarker.css";
import { InfoWindow } from "google-maps-react";

function SamplePoints({ samplePoint, center, zoom }) {
  const [locationInfo, setLocationInfo] = useState(null);
  let markers = null;
  if (samplePoint != null) {
    markers = samplePoint.map((sp, index) => {
      if (
        sp.samplingPointType.group ===
        process.env.REACT_APP_SAMPLING_POINT_GROUPS_FW
      )
        return (
          <LocationMarker
            key={sp.easting}
            lat={sp.lat}
            lng={sp.long}
            onClick={() =>
              setLocationInfo({
                key: sp.easting,
                lat: sp.lat,
                lng: sp.long,
                area: sp.area.label,
              })
            }
          ></LocationMarker>
        );
      return null;
    });
  }

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: `${process.env.REACT_APP_GOOGLE_APIKEY}`,
        }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers}
        {locationInfo ? (
          <InfoWindow
            key={locationInfo.key}
            position={{ lat: locationInfo.lat, lng: locationInfo.lng }}
          >
            <div>
              <h2>{locationInfo.area}</h2>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMapReact>
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
export default SamplePoints;
