import { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const MapChart = () => {

  const colorScale = {
    Alabama: "rgb(235, 29, 29)",
    Alaska: "rgb(241, 205, 81)",
    Arizona: "rgb(68, 150, 142)",
    Arkansas: "rgb(170, 24, 65)",
    California: "rgb(45, 214, 41)",
    Connecticut: "rgb(106, 14, 207)",
    Idaho: "rgb(101, 78, 51)",
  }

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
                fill={geo.properties.name in colorScale
                  ? colorScale[geo.properties.name]
                  : "#FFFFFF"}
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
