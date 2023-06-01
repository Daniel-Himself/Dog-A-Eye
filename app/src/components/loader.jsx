import React from "react";

const Loader = (props) => {
  const pub = process.env.PUBLIC_URL;
  const img = pub + "/logo.png";

  const loaderStyles = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    },
    spinner: {
      width: "50px",
      height: "50px",
      border: "5px solid #f3f3f3",
      borderTop: "5px solid #3498db",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    text: {
      marginTop: "10px",
    },
  };

  return (
    <div style={loaderStyles.wrapper} {...props}>
            <div className="spinner">
              <img src={img} alt="Spinner" />
            </div>
      <div style={loaderStyles.spinner}></div>
      <p style={loaderStyles.text}>{props.children}</p>
    </div>
  );
};

export default Loader;


