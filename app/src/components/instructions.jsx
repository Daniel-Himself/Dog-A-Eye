import React from 'react';
import "../style/model.css";

const Instructions = () => {

  return (
    <div className='container'>
      <h2 className='title'>Instructions</h2>
      <p className='text'>
        Here are some guidelines on how to take a qualitative dog eye picture
      </p>
      <ol className='list'>
        <li className='list-item'>
          <p>Make sure the dog is calm and comfortable.</p>
          <div className='instructions-container'>
            <img className='image-instructions' src={`${process.env.PUBLIC_URL}/comfrtable_d.png`} alt='dog' />
          </div>
        </li>
        <li  className='list-item'>
          <p>Find a well-lit area, preferably with natural light.</p>
          <div className='instructions-container'>
            <img className='image-instructions' src={`${process.env.PUBLIC_URL}/well_lit_d.png`} alt='dog' />
          </div>
        </li>
        <li className='list-item'>
          <p>Avoid using flash.</p>
          <div className='instructions-container'>
          <img className='image-instructions' src={`${process.env.PUBLIC_URL}/no_flash_d.png`} alt='dog'/>
          </div>
        </li>
        <li  className='list-item'>
          <p>Capture the image with steady hands to avoid blurriness.</p>
          <div className='instructions-container'>
          <img className='image-instructions' src={`${process.env.PUBLIC_URL}/no_blurry_d.png`} alt='dog'/>
          </div>
          
        </li>
      </ol>
    </div>
  );
};



export default Instructions;
