import { useState } from 'react';
import {Map, Marker,InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import workingIcon from "../../img/workingstations.png";
import notworkingIcon from "../../img/notworkingstations.png";
import waterShortages from "../../img/shortages.jpg";
import dirtywaterIcon from "../../img/dirtywater.jpg";

function SamplePoints({  shortages,
  workingStations,
  notWorkingStations,
  unsafe,
  center,
  zoom,
  google,}) {
  const [address, setAddress] = useState("");
  const [mapCenter, setMapCenter] = useState({
      lat: 51.507351,
    lng: -0.127758});
    // showingInfoWindow: false,
    // activeMarker: {},
    // selectedPlace: {},
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({});
  
    let shortageMarkers = null;
    let workingStationMarkers = null;
    let notWorkingStationMarkers = null;
    let unsafeMarkers = null;

  const handleChange = location => {
    setAddress(location);
  };
 
  const handleSelect = location => {
    setAddress(location);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);

        // update center state
        setMapCenter(latLng);
      })
      .catch(error => console.error('Error', error));
  };

  const getWaterShortages = () => {
    shortageMarkers = shortages.map((sh) => {
      const latLong = sh.basearea.split(",");
      return (
        <Marker
          key={sh.catId + " " + sh.countyId + " " + sh.basearea}
          countyName={sh.county}
          position={{ lat: latLong[0], lng: latLong[1] }}
          icon={{
            url: waterShortages,
            anchor: new google.maps.Point(22, 22),
            scaledSize: new google.maps.Size(20, 20),
          }}
          onClick={(props, marker) => {
            // console.log("watershortages props on click " + props);
            setSelectedPlace(props);
            setActiveMarker(marker);
            setShowingInfoWindow(!showingInfoWindow);
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
          stationSize={ws.size}
          capacity={ws.capacity}
          installDate={ws.installDate}
          position={{ lat: ws.lat, lng: ws.lang }}
          icon={{
            url: workingIcon,
            anchor: new google.maps.Point(22, 22),
            scaledSize: new google.maps.Size(20, 20),
          }}
          onClick={(props, marker) => {
            setSelectedPlace(props);
            setActiveMarker(marker);
            setShowingInfoWindow(!showingInfoWindow);
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
          key={ws.stationId}
          stationSize={ws.size}
          capacity={ws.capacity}
          installDate={ws.installDate}
          position={{ lat: ws.lat, lng: ws.lang }}
          icon={{
            url: notworkingIcon,
            anchor: new google.maps.Point(22, 22),
            scaledSize: new google.maps.Size(20, 20),
          }}
          onClick={(props, marker) => {
            setSelectedPlace(props);
            setActiveMarker(marker);
            setShowingInfoWindow(!showingInfoWindow);
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
          key={us.catId + " " + us.countyId + " " + us.basearea}
          countyName={us.county}
          position={{ lat: latLong[0], lng: latLong[1] }}
          icon={{
            url: dirtywaterIcon,
            anchor: new google.maps.Point(22, 22),
            scaledSize: new google.maps.Size(20, 20),
          }}
          onClick={(props, marker) => {
            setSelectedPlace(props);
            setActiveMarker(marker);
            setShowingInfoWindow(!showingInfoWindow);
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
      <div id='googleMaps'>
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
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
        disableDefaultUI={true}
        google={google}
        initialCenter={{
          lat: mapCenter.lat,
          lng: mapCenter.lng
        }}
        center={{
          lat: mapCenter.lat,
          lng: mapCenter.lng
        }}
         zoom={zoom}
        onClick={() => {
          setShowingInfoWindow(false);
        }}
       
      >
        {shortageMarkers}
        {workingStationMarkers}
        {notWorkingStationMarkers}
        {unsafeMarkers}
        {/* <Marker
          name={"Your position"}
          position={{ lat: 51.389637, lng: 0.08195 }}
          icon={{
            url: waterStations,
            anchor: new google.maps.Point(32, 32),
            scaledSize: new google.maps.Size(40, 40),
          }}
        /> */}

        {activeMarker ? (
          <InfoWindow visible={showingInfoWindow} marker={activeMarker}>
            <div>
              {selectedPlace.countyName ? (
                <h6>County: {selectedPlace.countyName}</h6>
              ) : null}
              {selectedPlace.stationSize ? (
                <h6>Size: {selectedPlace.stationSize}</h6>
              ) : null}
              {selectedPlace.capacity ? (
                <h6>Capacity: {selectedPlace.capacity}</h6>
              ) : null}
              {selectedPlace.installDate ? (
                <h6>Installation Date: {selectedPlace.installDate}</h6>
              ) : null}
            </div>
          </InfoWindow>
        ) : null}
      </Map>
      </div>
    )
  }



SamplePoints.defaultProps = {
  // center: {
  //   lat: 51.507351,
  //   lng: -0.127758,
  // },
  zoom: 7,
};
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_APIKEY
})(SamplePoints)