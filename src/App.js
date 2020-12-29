import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapChart from './Components/MapChart';
import MapSettings from './Components/MapSettings';

function App() {
  const [type, setType] = useState("pos");
  const [date, setDate] = useState(new Date(Date.now()))

  return (
    <div className="App">
      <header className="App-header">
        <h1> Hated in the Nation </h1>
      </header>
      <div className="App-body">
        <MapSettings
          date={date}
          type={type}
          updateMap={(dt, tp) => {
            setDate(dt);
            setType(tp);
          }}
        />
        <div className="Map-container">
          <MapChart tweet_type={type} tweet_date={date}/>
        </div>
        <p>
          The current time is UNKNOWN. The prior text was just to test out
          the API. In this section, I will be providing a description of how this
          site works (once I finish writing it) and I will probably talk about the
          Twitter import system and how all this data is organized.
        </p>
      </div>
    </div>
  );
}

export default App;
