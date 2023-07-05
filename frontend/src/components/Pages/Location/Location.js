import React, { useEffect, useState } from "react";
import "./Location.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import icon from "../../../images/userloc.png";
import BusLocationIcon from "../../../images/busloc.png";
import { useDriverDetail } from "../../../Contexts/DriverContext";
import { useUserDetail } from "../../../Contexts/UserContext";

function Location() {
  const [position, setPosition] = useState(null);
  const { fetchlocDetails, driverlatlng } = useDriverDetail();
  const { values } = useUserDetail();

  useEffect(() => {
    const successHandler = function(pos) {
      setPosition([pos.coords.latitude,pos.coords.longitude])
    };
    const errorHandler = function (errorObj) {
      alert(errorObj.code + ": " + errorObj.message);
    };
    navigator.geolocation.getCurrentPosition(successHandler,errorHandler,{timeout:10000})
    fetchlocDetails(values?.busNumber);
  },);

  let UserIcon = L.icon({
    iconUrl: icon,
  });

  let BusIcon = L.icon({
    iconUrl: BusLocationIcon
  });




  const DriverLocationMarker = () => {
    return (
      driverlatlng !== null && (
        <Marker position={driverlatlng} icon={BusIcon}></Marker>
      )
    );
  };

  return (
    <MapContainer
      center={[10.0455999, 76.3291185]}
      zoom={10}
      scrollWheelZoom={false}
      className="map-container mb-32 z-10">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {position && <Marker position={position} icon={UserIcon}/>}
      <DriverLocationMarker />
    </MapContainer>
  );
}

export default Location;
