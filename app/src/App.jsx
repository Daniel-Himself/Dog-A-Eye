import React, { useState } from 'react';
import Loader from './components/loader';
import Model from './components/model';
import './style/App.css';
import Instructions from './components/instructions';

const App = () => {
  const [read, setRead] = useState(true);

  const handleButtonPress = (isRead) => {
    setRead(isRead);
  };

  if (read) {
    return (
      <Model/>
    );
  }

};

export default App;
