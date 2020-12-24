import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Form from 'react-bootstrap/Form'

const MapSettings = () => {
  return (
    <div className="Map-settings">
      <div className="Map-slider">
        <Form>
          <Form.Control type="range" />
        </Form>
      </div>
      <div className="Map-toggle">
        <ToggleButtonGroup className="d-flex" type="radio" name="options" defaultValue={1} block>
          <ToggleButton value={1} variant="outline-danger"> Bad </ToggleButton>
          <ToggleButton value={2} variant="outline-success"> Good </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  )
}

export default MapSettings;
