import React, { useState } from "react";
import { GoogleMap, InfoWindowF, LoadScript, MarkerF } from "@react-google-maps/api";

const MapComponent = () => {
    const initialMarkers = [
        {
            position: {
                lat: -6.966667,
                lng: 110.416664
            },
            label: { color: "white", text: "P1" },
            draggable: false
        },
        {
            position: {
                lat: -6.905977,
                lng: 107.613144
            },
            label: { color: "white", text: "P2" },
            draggable: true
        },
        {
            position: {
                lat: -8.739184,
                lng: 115.171127
            },
            label: { color: "white", text: "P3" },
            draggable: true
        },
    ];

    const [activeInfoWindow, setActiveInfoWindow] = useState("");
    const [markers, setMarkers] = useState(initialMarkers);

    const containerStyle = {
        width: "100%",
        height: "80vh",
    }

    const center = {
        lat: -6.200000,
        lng: 106.816666,
    }

    const mapClicked = (event) => {
        console.log(event.latLng.lat(), event.latLng.lng())
    }

    const markerClicked = (marker, index) => {
        setActiveInfoWindow(index)
        console.log(marker, index)
    }

    const markerDragEnd = (event, index) => {
        console.log(event.latLng.lat())
        console.log(event.latLng.lng())
    }

    return (
        <div className="container-box">
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
                <header className="card-header header-maps">
                    Lokasi Kontak
                </header>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={5}
                    onClick={mapClicked}
                >
                    {markers.map((marker, index) => (
                        <MarkerF
                            key={index}
                            position={marker.position}
                            label={marker.label}
                            draggable={marker.draggable}
                            onDragEnd={event => markerDragEnd(event, index)}
                            onClick={event => markerClicked(marker, index)}
                        >
                            {
                                (activeInfoWindow === index)
                                &&
                                <InfoWindowF position={marker.position}>
                                    <div>
                                        <h3>INDONESIA</h3>
                                        <hr />
                                        <p1> <b> Indonesia </b> (pengucapan bahasa Indonesia: [in.ˈdo.nɛ.sja]), 
                                            dengan nama resmi Republik Indonesia (RI), atau lengkapnya Negara 
                                            Kesatuan Republik Indonesia (NKRI), adalah sebuah negara kepulauan di Asia Tenggara 
                                            yang dilintasi garis khatulistiwa dan berada di antara daratan benua Asia dan Oseania, 
                                            sehingga Indonesia dikenal sebagai negara lintas benua, serta antara Samudra Pasifik dan 
                                            Samudra Hindia. </p1> <br /> {marker.position.lat}, {marker.position.lng}

                                    </div>
                                </InfoWindowF>
                            }
                        </MarkerF>
                    ))}
                </GoogleMap>
            </LoadScript>
            <br />
            <div>
                <a className="btn btn-danger btn-add" href={`/`}>
                    <i class="fa-solid fa-angle-left me-2"></i>
                    Kembali
                </a>
            </div>
        </div>
    );
};

export default MapComponent;
