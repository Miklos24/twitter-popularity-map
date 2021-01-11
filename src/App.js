import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapChart from './Components/MapChart';
import MapSettings from './Components/MapSettings';

function App() {
  const [type, setType] = useState("pos");
  const [date, setDate] = useState(new Date(2020, 11, 29))

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
          Use the slider on the left to select a date to poll tweets from, and use the right toggle to get positive or negative tweets.
        </p>
        <p><em>
          Note: The map currently only shows two days worth of data because of monthly rate limits from the Twitter API. Once those limits expire, I will be updating the map to include more dates, ideally up to current day.
        </em></p>
      </div>
    </div>
  );
}

export default App;
