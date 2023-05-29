import React from "react";
import "../style/loader.css";

const Loader = (props) => {
  const pub = process.env.PUBLIC_URL;
  const img = pub + "/havi_logo.png";
  return (
    <div className="wrapper" {...props}>
      <div className="spinner">
      <img src={img} alt="Spinner" />
      </div>
      <p>{props.children}</p>
    </div>
  );
};

export default Loader;
