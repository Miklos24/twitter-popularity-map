import { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import * as d3 from 'd3';

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const MapChart = (props) => {
  const [data, setData] = useState({});
  const type = props.tweet_type;
  const date = props.tweet_date;
  const [curDate, setCurDate] = useState(new Date(date));


  useEffect(() => {
    if (Object.entries(data).length === 0 || date !== curDate) {
      fetch(`/api/tweets?date=${date.getTime()}`)
        .then(res => res.json())
        .then(data => {
          setData(data)
        })
      setCurDate(date);
    }
    console.log(data);
  }, [data, date, curDate]);

  const colorScale = d3.scaleQuantile()
    .domain(d3.extent(Object.values(data).map(({ [`${type}_score`] : score }) => (score))))
    .range(d3.schemePurples[9]);

  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => {
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={geo.properties.name in data
                  ? colorScale(data[geo.properties.name][`${type}_score`])
                  : "#FFFFFF"
                }
                stroke={"rgb(186, 186, 186)"}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  )
}

export default MapChart;
