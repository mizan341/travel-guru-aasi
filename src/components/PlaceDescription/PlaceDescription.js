import React, { useContext } from 'react';
import './PlaceDescription.css';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { BookingContext, JourneyContext } from '../../App';
import fakeData from '../../fakeData/fakeData';

const PlaceDescription = () => {
    const [selectedPlace, setSelectedPlace] = useContext(JourneyContext);
    const [proceedToBooking, setProceedToBooking] = useContext(BookingContext);
    return (
        <div className="place-info">
            {
                fakeData.filter(item => item.place === selectedPlace).map(item =>
                    <div key={item.place}>
                        <h1 className="place-title">{item.place}</h1>
                        <p className="place-description">{proceedToBooking ? item.longDescription : item.shortDescription}</p>
                        {
                            !proceedToBooking &&
                            <Button 
                                onClick={() => setProceedToBooking(!proceedToBooking)}
                                style={{ marginLeft: '0', marginTop: '15px' }} className="main-button"  variant="warning"
                                >
                                Booking<FontAwesomeIcon style={{ color: '#222', marginLeft: '10px' }} icon={faArrowRight} />
                            </Button>
                        }
                    </div>
                )
            }
        </div>
    );
};

export default PlaceDescription;