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
          To create this site, I ran a sentiment analysis on a random sample of 200
          tweets published in the last 7 days for each state in the United States.
          I determined if a particular tweet was about a particular US state by using the Twitter
          API's new <em>Annotations</em> feature, which uses AI to determine if
          a tweet is discussion a particular topic. Every day, I repeated this analysis to try to get an idea of how sentiment about states changed
          over time. You can observe this change by adjusting the date slider.
          I also decided to judge each state by tweets that showed a favorable
          bent, as well as an unfavorable one. I guessed that these two variables
          wouldn't be perfect correlated, and was interested to see the results.
          To see those results for yourself, you can toggle between the Favorable
          and Unfavorable Tweets.
        </p>
        <p>
          In the future, there are many features I'd like to add. I would list them,
          but I am tired. Apologies for the wall of text.
        </p>
      </div>
    </div>
  );
}

export default App;
