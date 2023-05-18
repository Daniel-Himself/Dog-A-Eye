import React, { } from "react";
import Camera from './components/camera'
import Model from "./components/model";
import "./style/App.css";

const App = () => {

  return (
    <div className="App">
      <Camera/>
      <Model/>
    </div>
  );
};

export default App;
