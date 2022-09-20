import '../App.css';
import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { CREATE_USER, GET_USERS } from '../utils/queries';
import { GoogleMap, InfoWindowF, LoadScript, MarkerF } from "@react-google-maps/api";

export default function PhonebookForm(props) {
    const [activeInfoWindow, setActiveInfoWindow] = useState("");
    const [markers, setMarkers] = useState([{
        position: {
            lat: -6.966667,
            lng: 110.416664
        },
        draggable: true
    }]);

    const containerStyle = {
        width: "100%",
        height: "50vh",
    }

    const center = {
        lat: -6.2000000,
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
        setUser({
            latitude: event.latLng.lat(),
            longitude: event.latLng.lng(),
        })
    }

    //=============================================

    const [createPhonebook, { loading, error }] = useMutation(CREATE_USER, {
        refetchQueries: [{ query: GET_USERS }],
    });


    const [user, setUser] = useState({
        name: '',
        phone: '',
        latitude: '',
        longitude: '',
        alamat: ''
    })

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setUser({
            ...user,
            [name]: value
        });
        if (target.name === 'latitude' || 'longitude') {
            setMarkers([{
                position: {
                    lat: parseFloat(target.name === 'latitude' ? target.value : markers[0].position.lat),
                    lng: parseFloat(target.name === 'longitude' ? target.value : markers[0].position.lng),
                },
                draggable: true
            }]);
            console.log(markers)
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (user.name !== "" && user.phone !== "") {
            createPhonebook({ variables: { user } });
            console.log('add', user)
            setUser({
                name: '',
                phone: '',
                latitude: '',
                longitude: '',
                alamat: ''
            })
        }
    }

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div className="card form-card">
            <div className="card-header" style={{ "padding": "15px 20px" }}>
                Adding Form
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-md-6'>
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
                                                        <p className="mb-1"> <i class="fa-solid fa-phone me-1"></i> {user.phone} </p>
                                                        <p className="mb-1">
                                                            <i className="fa-solid fa-location-dot me-1"></i>
                                                            <i> {marker.position.lat}, {marker.position.lng} </i>
                                                        </p>
                                                        <hr />
                                                        <p1> {user.alamat} </p1>

                                                    </div>
                                                </InfoWindowF>
                                            }
                                        </MarkerF>
                                    ))}
                                </GoogleMap>
                            </LoadScript>
                        </div>
                        <div className="col-md-6">
                            <div className="row mb-3">
                                <div className="col-sm-2">
                                    <label className="fw-bold">
                                        Name
                                    </label>
                                </div>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={handleChange} placeholder="Name. . . " required />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-2">
                                    <label className="fw-bold">
                                        Phone
                                    </label>
                                </div>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="phone" name="phone" value={user.phone} onChange={handleChange} placeholder="Phone. . ." required />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-2">
                                    <label className="fw-bold">
                                        Latitude
                                    </label>
                                </div>
                                <div className="col-sm-10">
                                    <input type="number" step="any" className="form-control" id="latitude" name="latitude" value={user.latitude} onChange={handleChange} placeholder="Latitude. . ." required />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-2">
                                    <label className="fw-bold">
                                        Longitude
                                    </label>
                                </div>
                                <div className="col-sm-10">
                                    <input type="number" step="any" className="form-control" id="longitude" name="longitude" value={user.longitude} onChange={handleChange} placeholder="Longitude. . ." required />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-2">
                                    <label className="fw-bold">
                                        Alamat
                                    </label>
                                </div>
                                <div className="col-sm-10">
                                    <textarea type="text" className="form-control" rows="3" id="alamat" name="alamat" value={user.alamat} onChange={handleChange} placeholder="Alamat. . ." required />
                                </div>
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-success me-2">
                                    <i className="far fa-check-circle me-2"></i>
                                    Save
                                </button>
                                <button type="button" className="btn btn-warning" style={{ "color": "white" }} onClick={() => props.setOnAdd(false)}>
                                    <i className="fas fa-ban me-2"></i>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
