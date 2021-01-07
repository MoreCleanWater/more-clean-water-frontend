import GoogleMapReact from "google-map-react";
import LocationMarker from "./LocationMarker";
import "./LocationMarker.css";

function SamplePoints({ samplePoint, center, zoom }) {
  let markers = null;
  if (samplePoint != null) {
    markers = samplePoint.map((sp, index) => {
      if (
        sp.samplingPointType.group ===
        process.env.REACT_APP_SAMPLING_POINT_GROUPS_FW
      )
        return <LocationMarker key={index} lat={sp.lat} lng={sp.long} />;
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
