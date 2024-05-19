// import React from "react";
// import GoogleMapReact from "google-map-react";

// const AccidentMap = ({ lat, lng }) => {
//   return (
//     <div style={{ height: "400px", width: "100%" }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: "" }} // Replace YOUR_API_KEY with your actual API key
//         defaultCenter={{
//           lat: 31.1048, // Default center latitude for Shimla
//           lng: 77.1734, // Default center longitude for Shimla
//         }}
//         defaultZoom={12} // Default zoom level
//       >
//         <Marker lat={lat} lng={lng} />
//       </GoogleMapReact>
//     </div>
//   );
// };

// const Marker = () => <div className="marker">Accident Location</div>;

// export default AccidentMap;


import React from "react";
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from "react-google-maps";

const AccidentMap = ({ latitude, longitude }) => {
  const defaultLat = 31.1048; // Default latitude for Shimla
  const defaultLng = 77.1734; // Default longitude for Shimla

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: parseFloat(latitude) || defaultLat, lng: parseFloat(longitude) || defaultLng }}
    >
      {/* Marker for the accident location */}
      {latitude && longitude ? (
        <Marker position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }} />
      ) : (
        <Marker position={{ lat: defaultLat, lng: defaultLng }} />
      )}
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(AccidentMap));

const WrappedAccidentMap = ({ latitude, longitude }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC1pl6OD_46WdyZLz57BJ2dcK1X2fn5d24`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "400px" }} />} // Adjust the height of the container element
        mapElement={<div style={{ height: "100%" }} />}
        latitude={latitude}
        longitude={longitude}
      />
    </div>
  );
};

export default WrappedAccidentMap;



