import React from 'react';
import "../style/model.css";
// import Carousel from 'react-bootstrap/Carousel';
// import { Carousel } from 'react-responsive-carousel';

// Carousel try
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';



const Instructions = () => {
  return (
    <div className="container">
      <h2 className="title">Instructions</h2>
      <Carousel className='carusel_style'>
        <Carousel.Item>
        <div className="carousel-item-wrapper">
            <img
              className="d-block w-100 image-instructions"
              src={`${process.env.PUBLIC_URL}/comfrtable_d.png`}
              alt="First slide"
            />
            <Carousel.Caption>
              <p>Make sure the dog is calm and comfortable.</p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 image-instructions"
            src={`${process.env.PUBLIC_URL}/well_lit_d.png`}
            alt="Second slide"
          />
          <Carousel.Caption>
            <p>Find a well-lit area, preferably with natural light.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 image-instructions"
            src={`${process.env.PUBLIC_URL}/no_flash_d.png`}
            alt="Third slide"
          />
          <Carousel.Caption>
            <p>Avoid using flash.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};



export default Instructions;
