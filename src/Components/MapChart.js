import { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import * as d3 from 'd3';

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const MapChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/tweets')
      .then(res => res.json())
      .then(data => {
        setData(data)
      });
  });

  // const colorScale = d3.scaleLinear()
  //   .domain(d3.extent(this.data, f('neg_score')))

  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => {
            console.log(geo.properties.name);
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={"#FFFFFF"}
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
