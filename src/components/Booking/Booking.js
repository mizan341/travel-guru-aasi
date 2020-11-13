import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { BookingContext, TravelContext } from '../../App';
import './Booking.css';
import DatePicker from 'react-datepicker';

const Booking = () => {
    // const [proceedToBooking, setProceedToBooking] = useContext(BookingContext);
    const [selectedPlace, setSelectedPlace] = useContext(TravelContext);
    const [startDate, setStartDate] = useState(new Date());
    const [lastDate, setLastDate] = useState(new Date());
    const history = useHistory();

    const handleSubmit = () => {
        history.push('/hotel');
    }

    return (
        <div className="ml-auto booking">
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="origin">Origin</label>
                    <input className="form-control input-box" type="text" name="origin" id="origin" placeholder="Dhaka" required />
                </div>
                <div className="form-field">
                    <label htmlFor="destination">Destination</label>
                    <input className="form-control input-box" type="text" name="destination" id="destination" placeholder={selectedPlace} required />
                </div>
                <div className="d-flex align-items-space-between date-picker">
                    
                    <div className="form-field">
                        <label htmlFor="from">From</label>
                        <br />
                        <div className="input-box d-flex">
                            <DatePicker className="date-input" selected={startDate} onChange={date => setStartDate(date)} />
                            <img className="calender-icon" src="https://i.ibb.co/DWfL7zK/calender-icon.png" alt="calender-icon" />
                        </div>
                    </div>
                    <div className="form-field">
                        <label htmlFor="to">To</label>
                        <br />
                        <div className="input-box d-flex">
                            <DatePicker className="date-input" selected={lastDate} onChange={date => setLastDate(date)} />
                            <img className="calender-icon" src="https://i.ibb.co/DWfL7zK/calender-icon.png" alt="calender-icon" />
                        </div>
                    </div>
                </div>
                <input className="booking-btn" type="submit" value="Start Booking" />
            </form>
        </div>
    );
};

export default Booking;