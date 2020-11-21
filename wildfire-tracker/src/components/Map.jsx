import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker';
import LocationInfoBox from './LocationInfoBox';
import { useState, useEffect } from 'react';

const Map = ({ eventData, center, zoom }) => {
  // create a piece of state for the location Info
  const [locationInfo, setLocationInfo] = useState(null);

  // Have to Map through all the location Markers
  const markers = eventData.map((ev) => {
    if (ev.categories[0].id === 8) {
      return (
        <LocationMarker
          lat={ev.geometries[0].coordinates[1]}
          lng={ev.geometries[0].coordinates[0]}
          onClick={() => setLocationInfo({ id: ev.id, title: ev.title })}
        />
      );
    }
    return null;
  });

  return (
    <div className="map">
      {/* These things are built in  */}
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCvbOg9LJrKv8QAA2LGkbSeUNwboOf2yNw' }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers}
      </GoogleMapReact>
      {/* If LocationInfo is true then pass LocationInfoBox && set the info prop to LocationInfo */}
      {locationInfo && <LocationInfoBox info={locationInfo} />}
    </div>
  );
};

// Default props
Map.defaultProps = {
  // We using california as an example
  center: {
    lat: 42.3265,
    lng: -122.8756,
  },
  zoom: 6,
};

export default Map;
