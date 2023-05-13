import React, { useEffect, useState } from "react";
import "./Location.css";
import { MapContainer, TileLayer, Marker ,useMapEvents} from "react-leaflet";
import L from "leaflet";
import icon from "../../../images/userloc.png";
import { useDriverDetail } from "../../../Contexts/DriverContext";
import { useUserDetail } from "../../../Contexts/UserContext";

function Location() {
  const { fetchlocDetails, driverlatlng } = useDriverDetail();
    const { values } = useUserDetail();
    
     useEffect(() => {
      fetchlocDetails(values?.busNumber);
    },[]);


  let UserIcon = L.icon({
    iconUrl: icon,
  });

  const UserLocationMarker = () => {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, 15);
      },
    });
   

    return position === null ? (
      <Marker position={[10.0455999, 76.3291185]} icon={UserIcon}></Marker>
    ) : (
      <Marker position={position} icon={UserIcon}></Marker>
    );
  };

  const DriverLocationMarker = () => {
    
    return driverlatlng === null ? (
      <Marker position={[51.507351,-0.127758]} icon={UserIcon}></Marker>
    ) : (
      <Marker position={driverlatlng} icon={UserIcon}></Marker>
    );
  };

  return (
    <MapContainer
      center={[10.0455999, 76.3291185]}
      zoom={10}
      scrollWheelZoom={false}
      className="map-container mb-32">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <UserLocationMarker />
      <DriverLocationMarker />
    </MapContainer>
  );
}

export default Location;
