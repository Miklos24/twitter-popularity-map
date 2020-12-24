import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapChart from './Components/MapChart';
import MapSettings from './Components/MapSettings';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/api/time')
      .then(res => res.json())
      .then(data => {
        setCurrentTime(data.time)
      });
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1> Hated in the Nation </h1>
      </header>
      <div className="App-body">
        <MapSettings />
        <div className="Map-container">
          <MapChart />
        </div>
        <p>
          The current time is {currentTime}. The prior text was just to test out
          the API. In this section, I will be providing a description of how this
          site works (once I finish writing it) and I will probably talk about the
          Twitter import system and how all this data is organized.
        </p>
      </div>
    </div>
  );
}

export default App;
