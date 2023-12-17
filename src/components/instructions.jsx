import React from 'react';
import "../style/model.css";
// import Carousel from 'react-bootstrap/Carousel';
// import { Carousel } from 'react-responsive-carousel';

// Carousel try
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';



const Instructions = ({attempts}) => {
  const imageInstructions = "d-block w-100 img-fluid image-instructions"
  let instructions = [
    { src: `${process.env.PUBLIC_URL}/comfortable.png`, alt: "First slide" },
    { src: `${process.env.PUBLIC_URL}/well_lit.png`, alt: "Second slide" },
    { src: `${process.env.PUBLIC_URL}/no_blurry.png`, alt: "Third slide" },
    { src: `${process.env.PUBLIC_URL}/no_flash.png`, alt: "Fourth slide" }
  ];
  if (attempts > 0){
    instructions.pop()
  }
  console.log(attempts)
  return (
    <div className="container">
      <h2 className="title carousel-title">Instructions</h2>
      <Carousel className='carusel-style'>
        {instructions.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className={imageInstructions}
              src={image.src}
              alt={image.alt}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};



export default Instructions;
