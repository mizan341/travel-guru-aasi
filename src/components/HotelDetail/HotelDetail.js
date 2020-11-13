import React from 'react';
import './HotelDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const HotelDetail = (props) => {
    const {imageUrl, name, guest, bed, bedroom, bath, kitchen, cancellationFlexibility, rating, review, costPerNight, total} = props.hotel;

    return (
        <div className="d-flex my-3">
           <img src={imageUrl} alt="hotelImage" style={{width: '270px', height: '188px', borderRadius: '10px'}}/>
           <div className="ml-4">
               <h5 className="hotel-name">{name}</h5>
                <p>
                    <span>{guest} guests</span>
                    <span className="ml-2">{bedroom} bedrooms</span>
                    <span className="ml-2">{bed} beds</span>
                    <span className="ml-2">{bath} baths</span>
                </p>
                <p>{kitchen}</p>
                <p>{`Cancellation Flexibility ${cancellationFlexibility ? 'Available' : 'Not Available'}`}</p>
                <p>
                    <FontAwesomeIcon style={{ color: 'var(--pri-color)',}} icon={faStar} />
                    <span className="ml-1">{rating}</span>
                    <span>({review})</span>
                    <span className="ml-3">${costPerNight}/night</span>
                    <span className="ml-3">${total} total</span>
                </p>
           </div>
        </div>
    );
};

export default HotelDetail;