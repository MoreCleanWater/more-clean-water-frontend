import { useState } from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import workingIcon from "../../icons/opacity-24px.svg";
import notworkingIcon from "../../icons/block-24px.svg";
import waterShortages from "../../icons/invert_colors_off-24px.svg";
import dirtywaterIcon from "../../icons/report_problem-24px.svg";

function SamplePoints({
  shortages,
  workingStations,
  notWorkingStations,
  unsafe,
  zoom,
  google,
}) {
  const [address, setAddress] = useState("");
  const [mapCenter, setMapCenter] = useState({
    lat: 51.507351,
    lng: -0.127758,
  });
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});

  let shortageMarkers = null;
  let workingStationMarkers = null;
  let notWorkingStationMarkers = null;
  let unsafeMarkers = null;

  const handleChange = (location) => {
    setAddress(location);
  };

  const handleSelect = (location) => {
    setAddress(location);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setMapCenter(latLng);
      })
      .catch((error) => console.error("Error", error));
  };

  const getWaterShortages = () => {
    shortageMarkers = shortages.map((sh) => {
      const latLong = sh.basearea.split(",");
      // console.log(latLong)
      
      return (
        <Marker
          type='Water shortage detected'
          key={sh.catId + " " + sh.countyId + " " + sh.basearea}
          countyName={sh.county}
          position={{ lat: latLong[0], lng: latLong[1] }}
          icon={{
            url: waterShortages,
            anchor: new google.maps.Point(22, 22),
            scaledSize: new google.maps.Size(25, 25),
          }}
          onClick={(props, marker) => {
            const lat = marker.getPosition().lat();
            const lng = marker.getPosition().lng();
            setSelectedPlace(props);
            setActiveMarker(marker);
            setShowingInfoWindow(!showingInfoWindow);
            setMapCenter({lat, lng});
          }}
        ></Marker>
      );
      // return null;
    });
  };

  const getworkingStations = () => {
    workingStationMarkers = workingStations.map((ws) => {
      return (
        <Marker
          key={ws.stationId}
          type='Working water station'
          countyName={ws.county}
          stationSize={ws.size}
          capacity={ws.capacity}
          installDate={ws.installDate}
          position={{ lat: ws.lat, lng: ws.lang }}
          icon={{
            url: workingIcon,
            anchor: new google.maps.Point(22, 22),
            scaledSize: new google.maps.Size(25, 25),
          }}
          onClick={(props, marker) => {
            const lat = marker.getPosition().lat();
            const lng = marker.getPosition().lng();
            setSelectedPlace(props);
            setActiveMarker(marker);
            setShowingInfoWindow(!showingInfoWindow);
            setMapCenter({lat, lng});
          }}
        ></Marker>
      );
      // return null;
    });
  };

  const getNotWorkingStations = () => {
    notWorkingStationMarkers = notWorkingStations.map((ws) => {
      return (
        <Marker
          type='Water station not working'
          countyName={ws.county}
          key={ws.stationId}
          stationSize={ws.size}
          capacity={ws.capacity}
          installDate={ws.installDate}
          position={{ lat: ws.lat, lng: ws.lang }}
          icon={{
            url: notworkingIcon,
            anchor: new google.maps.Point(22, 22),
            scaledSize: new google.maps.Size(25, 25),
          }}
          onClick={(props, marker) => {
            const lat = marker.getPosition().lat();
            const lng = marker.getPosition().lng();
            setSelectedPlace(props);
            setActiveMarker(marker);
            setShowingInfoWindow(!showingInfoWindow);
            setMapCenter({lat, lng});
          }}
        ></Marker>
      );
      // return null;
    });
  };

  const getUnsafeList = () => {
    unsafeMarkers = unsafe.map((us) => {
      const latLong = us.basearea.split(",");
      return (
        <Marker
          type='Water not safe to drink'
          key={us.catId + " " + us.countyId + " " + us.basearea}
          countyName={us.county}
          position={{ lat: latLong[0], lng: latLong[1] }}
          icon={{
            url: dirtywaterIcon,
            anchor: new google.maps.Point(22, 22),
            scaledSize: new google.maps.Size(25, 25),
          }}
          onClick={(props, marker) => {
            const lat = marker.getPosition().lat();
            const lng = marker.getPosition().lng();
            setSelectedPlace(props);
            setActiveMarker(marker);
            setShowingInfoWindow(!showingInfoWindow);
            setMapCenter({lat, lng});
          }}
        ></Marker>
      );
      // return null;
    });
  };

  if (shortages != null) {
    getWaterShortages();
  }
  if (workingStations != null) {
    getworkingStations();
  }
  if (notWorkingStations != null) {
    getNotWorkingStations();
  }
  if (unsafe != null) {
    getUnsafeList();
  }

  return (
    <div id="googleMaps">
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={{position: 'relative'}}>
            <input
              {...getInputProps({
                placeholder: "Search here",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      <Map
        className='leMap'
        disableDefaultUI={true}
        google={google}
        initialCenter={{
          lat: mapCenter.lat,
          lng: mapCenter.lng,
        }}
        center={{
          lat: mapCenter.lat,
          lng: mapCenter.lng,
        }}
        zoom={zoom}
        zoomControl={true}
        onClick={() => {
          setShowingInfoWindow(false);
        }}
      >
        {shortageMarkers}
        {workingStationMarkers}
        {notWorkingStationMarkers}
        {unsafeMarkers}
        {activeMarker ? (
          <InfoWindow visible={showingInfoWindow} marker={activeMarker}>
            <div>
              {/* {console.log(selectedPlace)} */}
              {selectedPlace.type ? (
                <h3>{selectedPlace.type}</h3>
              ) : null}
              {selectedPlace.countyName ? (
                <p>County: {selectedPlace.countyName}</p>
              ) : null}
              {selectedPlace.stationSize ? (
                <p>Size: {selectedPlace.stationSize}</p>
              ) : null}
              {selectedPlace.capacity ? (
                <p>Capacity: {selectedPlace.capacity}</p>
              ) : null}
              {selectedPlace.installDate ? (
                <p>Installation Date: {selectedPlace.installDate}</p>
              ) : null}
            </div>
          </InfoWindow>
        ) : null}
      </Map>
    </div>
  );
}

SamplePoints.defaultProps = {
  zoom: 9,
};
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_APIKEY,
})(SamplePoints);
