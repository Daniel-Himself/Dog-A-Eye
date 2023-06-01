import React, { useState, useRef } from "react";
import Model from "./components/model";
import "./style/App.css";
import Instructions from "./components/instructions";

const App = () => {
  const [read, setRead] = useState(false)

  if(read === true)
    return (
      <Model/>
    );
  return (
    <Instructions/>
  );
};

export default App;
