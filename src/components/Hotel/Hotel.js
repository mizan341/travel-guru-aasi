import React, { useContext } from 'react';
import HotelDetail from '../HotelDetail/HotelDetail';
import './Hotel.css';
import Container from 'react-bootstrap/Container';
import { TravelContext } from '../../App';
import fakeData from '../../fakeData/fakeData';
import Location from '../Location/Location';

const Hotel = () => {
    const [selectedPlace, setSelectedPlace] = useContext(TravelContext);
    return (
        <Container className="hotel px-0 d-flex">
            <div className="col-md-7">
                {
                    fakeData.filter(item => item.place === selectedPlace).map(item => {
                        return (
                            <div key={item.place}>
                                <p className="sub-heading">{item.stays} stays {item.date}</p>
                                <h2 className="heading">Stays in {item.place}</h2>
                                {
                                    item.hotel.map(hotel => <HotelDetail key={hotel.name} hotel={hotel}></HotelDetail>)
                                }
                            </div>
                        );
                    })
                }
            </div>
            <Location className="col-md-3 ml-4"></Location>
        </Container>
    );
};

export default Hotel;