import React, { useContext } from 'react';
import './PlaceImage.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import fakeData from '../../fakeData/fakeData';
import { JourneyContext } from '../../App';

const PlaceImage = () => {
    const [selectedPlace, setSelectedPlace] = useContext(JourneyContext);

    return (
        <Row className="ml-auto">
            {
                fakeData.map(item => {
                    const imageStyle = {
                        backgroundImage: `url(${item.placeImage})`,
                        width: '270px',
                        height: '416px',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        borderRadius: '20px',
                        boxShadow: '5px 5px 10px gray',
                        position: 'relative',
                    }

                    return (
                        <Col key={item.place} onClick={() => setSelectedPlace(`${item.place}`)} className={`image-holder ml-3 ${selectedPlace === item.place ? 'image-outline' : ''}`} style={imageStyle}>
                            <p className="image-title">{item.place}</p>
                        </Col>
                    );
                })
            }
        </Row>
    );
};

export default PlaceImage;