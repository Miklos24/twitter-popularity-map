import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

const MapSettings = (props) => {
  const [minDate, setMinDate] = useState(new Date(2020, 11, 28))

  const updateFunc = props.updateMap
  const date = props.date
  const type = props.type

  return (
    <div className="Map-settings">
      <div className="Map-slider">
        <Form>
          <Form.Control
            type="range"
            min={0}
            max={Math.round((Date.now() - minDate) / (24 * 60 * 60 * 1000))}
            step={1}
            value={Math.round((date - minDate) / (24 * 60 * 60 * 1000))}
            onChange={(e) => {
              e.preventDefault();
              updateFunc(new Date(minDate.getTime() + (e.target.value * (24 * 60 * 60 * 1000))), type);
            }}
          />
        </Form>
        <p>{date.toDateString()}</p>
      </div>
      <div className="Map-toggle">
        <ToggleButtonGroup className="d-flex" type="radio" name="options" defaultValue={type === "neg" ? 1 : 2}>
          <ToggleButton
            value={1}
            variant="outline-danger"
            onClick={() => updateFunc(date, "neg")}
          > Bad </ToggleButton>
          <ToggleButton
            value={2}
            variant="outline-success"
            onClick={() => updateFunc(date, "pos")}
          > Good </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  )
}

export default MapSettings;
