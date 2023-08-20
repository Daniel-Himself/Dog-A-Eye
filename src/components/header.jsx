import React from "react";
import Instructions from "./instructions";

function Header({ img, image }) {
    return (
        <div className="header">
            <img src={img} alt="Logo" className="logo" />
            <h1>Dog-A-Eye Assistant</h1>
            {!image ? <Instructions /> : ""}
            <p>Please upload an image of your dog's eye</p>
        </div>
    );
}

export default Header;