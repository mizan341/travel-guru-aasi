import React, { useContext } from 'react';
import PlaceDescription from '../PlaceDescription/PlaceDescription';
import Container from 'react-bootstrap/Container';
import './Home.css';
import PlaceImage from '../PlaceImage/PlaceImage';
import { BookingContext } from '../../App';
import Booking from '../Booking/Booking';

const Home = () => {
    const [proceedToBooking] = useContext(BookingContext);

    return (
        <div className="frontBody">
            <Container className="frontPage pl-0">
                <div className="row">
                    <div className="col-md-5">
                        <PlaceDescription></PlaceDescription>
                    </div>
                    <div className="col-md-7">
                        {
                            proceedToBooking ? <Booking></Booking> : <PlaceImage></PlaceImage>
                        }                        
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Home;