import '../App.css';
import React, { useState } from "react"
import { useMutation } from '@apollo/client';
import { UPDATE_USER, GET_USERS } from "../utils/queries";
import { useNavigate } from "react-router-dom";
import { GoogleMap, InfoWindowF, LoadScript, MarkerF } from "@react-google-maps/api";
import HashLoader from "react-spinners/HashLoader";


export default function PhonebookItem(props) {
    const [activeInfoWindow, setActiveInfoWindow] = useState("");
    const navigate = useNavigate();
    const [updatePhonebook, { loading, error }] = useMutation(UPDATE_USER, {
        refetchQueries: [{ query: GET_USERS }],
    });
    console.log('propsc', props)
    const [user, setUser] = useState({
        name: props.name,
        phone: props.phone,
        latitude: props.latitude,
        longitude: props.longitude,
        alamat: props.alamat,
    })

    const [markers, setMarkers] = useState([{
        position: {
            lat: user.latitude,
            lng: user.longitude
        },
        draggable: true
    }]);

    const containerStyle = {
        width: "100%",
        height: "50vh",
    }
    const center = {
        lat: markers[0].position.lat,
        lng: markers[0].position.lng,
    }

    const mapClicked = (event) => {
        console.log(event.latLng.lat(), event.latLng.lng())
        setMarkers([{
            position: {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            },
        }]);
        setUser({
            latitude: event.latLng.lat(),
            longitude: event.latLng.lng(),
        })
    }

    const markerClicked = (marker, index) => {
        setActiveInfoWindow(index)
        console.log(marker, index)
    }

    const markerDragEnd = (event, index) => {
        setUser({
            latitude: event.latLng.lat(),
            longitude: event.latLng.lng(),
        })
    }

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setUser({
            ...user,
            [name]: value
        });
    }
    const handleUpdate = () => {
        if (user.name !== "" && user.phone !== "") {
            updatePhonebook({ variables: { id: props.id, user } });
            // setOnEdit(false)
            props.searchReset()
        }
    }

    if (loading) return <p className="loading">
        <HashLoader size={150} />
    </p>;
    if (error) return `Submission error! ${error.message}`;

    return (
        <div className="card form-card">
            <div className="card-header" style={{ "padding": "15px 20px" }}>
                <b>Edit Form</b>
            </div>
            <div className="card-body">
                <div className='row'>
                    <div className='col-md-7'>
                        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
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
                                        draggable={marker.draggable}
                                        onDragEnd={event => markerDragEnd(event, index)}
                                        onClick={event => markerClicked(marker, index)}
                                    >
                                        {
                                            (activeInfoWindow === index)
                                            &&
                                            <InfoWindowF position={marker.position}>
                                                <div>
                                                    <h3> <b> {user.name} </b> </h3>
                                                    <p className="mb-1"> <i className="fa-solid fa-phone me-1"></i> {user.phone} </p>
                                                    <p className="mb-1">
                                                        <i className="fa-solid fa-location-dot me-1"></i>
                                                        <i> {marker.position.lat}, {marker.position.lng} </i>
                                                    </p>
                                                    <hr />
                                                    <p> {user.alamat} </p>

                                                </div>
                                            </InfoWindowF>
                                        }
                                    </MarkerF>
                                ))}
                            </GoogleMap>
                        </LoadScript>
                    </div>
                    <div className="col-md-5">
                        <div className="row mb-3">
                            <div className="col-sm-2">
                                <label className="fw-bold">
                                    Name
                                </label>
                            </div>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={handleInputChange} placeholder="Name. . . " required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-2">
                                <label className="fw-bold">
                                    Phone
                                </label>
                            </div>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="phone" name="phone" value={user.phone} onChange={handleInputChange} placeholder="Phone. . ." required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-2">
                                <label className="fw-bold">
                                    Latitude
                                </label>
                            </div>
                            <div className="col-sm-10">
                                <input type="number" step="any" className="form-control" id="latitude" name="latitude" value={user.latitude} onChange={handleInputChange} placeholder="Latitude. . ." required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-2">
                                <label className="fw-bold">
                                    Longitude
                                </label>
                            </div>
                            <div className="col-sm-10">
                                <input type="number" step="any" className="form-control" id="longitude" name="longitude" value={user.longitude} onChange={handleInputChange} placeholder="Longitude. . ." required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-2">
                                <label className="fw-bold">
                                    Alamat
                                </label>
                            </div>
                            <div className="col-sm-10">
                                <textarea type="text" className="form-control" rows="3" id="alamat" name="alamat" value={user.alamat} onChange={handleInputChange} placeholder="Alamat. . ." required />
                            </div>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary me-2" onClick={handleUpdate}>
                                <i className="far fa-check-circle me-2"></i>
                                Save
                            </button>
                            <button type="submit" className="btn btn-warning me-2" style={{ "color": "white" }} onClick={() => navigate("/")}>
                                <i className="fas fa-ban me-2"></i>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
