import React from "react";
import "../style/model.css";

const Loader = (props) => {
  return (
    <div className='wrapper' {...props}>
            <div className="spinner">
            </div>
      <div className='spinner'></div>
      <p className='textLoader'>{props.children}</p>
    </div>
  );
};

export default Loader;


