import React, { useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import { TravelContext } from '../../App';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function Location() {
    const [selectedPlace, setSelectedPlace] = useContext(TravelContext);
    const property = {
        placeOne: {
            lat: 21.433920,
            lng: 91.987030
        },
        placeTwo: {
            lat: 24.310577,
            lng: 91.725136
        },
        placeThree: {
            lat: 22.841930,
            lng: 89.558060
        },
        zoom: 11
    };
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCpu5a_7uaRGFBlYX33hUhH67FoqJfb_TM' }}
                defaultCenter={
                    selectedPlace === "COX'S BAZAR" ? property.placeOne 
                    : selectedPlace === "SREEMANGAL" ? property.placeTwo
                    : property.placeThree
                }
                defaultZoom={property.zoom}
            >
                <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );
}

export default Location;