import React, { useState, useMemo, useContext } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import "./Map.css"
import { MyContext } from './MyProvider'

// import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"

function Map({ toggle, adventures }) {
  const center = useMemo(() => ({ lat: 34.4243, lng: -118.5973 }), [])
  const { attractions } = useContext(MyContext)
  
  return (
    <div className='mapbox'>
        <MapContainer center={center} zoom={16}>
            
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {toggle ? 
            adventures.map((a) => {
              if (!a.ridden) {
                return <Marker key={a.id} position={[a.attraction.latitude, a.attraction.longitude]}>
                  <Popup>
                    <div>
                      <h3>{a.attraction.name}</h3>
                      <p>Thrill Level: {a.attraction.thrill_level}</p>
                      <p>Ride Type: {a.attraction.type}</p>
                    </div>
                  </Popup>
                </Marker>
              }
            }) : attractions.map((a) => {
              return <Marker key={a.id} position={[a.latitude, a.longitude]}>
                <Popup>
                  <div>
                    <h3>{a.name}</h3>
                    <p>Thrill Level: {a.thrill_level}</p>
                    <p>Ride Type: {a.type}</p>
                  </div>
                </Popup>
              </Marker>
            })}

        </MapContainer>
    </div>
  )
}

export default Map


// ###### OLD GOOGLE MAPS REACT DATA ########

// const { isLoaded } = useLoadScript({
//   googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
// });

// const options = useMemo(() => ({
//   disableDefaultUI: true,
//   clickableIcons: false,
// }), [])

// return (
//   <div className="mapbox">
//     { !isLoaded ? (
//       <h1>Loading...</h1>
//     ) : (
//       <GoogleMap 
//         mapContainerClassName='map-container'
//         center = {center}
//         zoom = {15}
//         options = {options}
//       />
//     )}
//   </div>
// )