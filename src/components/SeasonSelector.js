import React from 'react';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import SeasonDialog from './SeasonDialog';
import Button from 'material-ui/Button';

class SeasonSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seasonOpen: false, 
      newSeason: null, 
      saveSeason: this.props.saveSeason}
  }

  handleSeasonClick = () => {
    this.setState({seasonOpen: true});
  }

  saveNewSeason = (value) => {
    this.setState({seasonOpen: false, newSeason: value});
    this.state.saveSeason(value);
  }


  render() {
    return (
      <span>
        <span className="headerStyle">Season: </span>
        <Select value={this.props.season} onChange={(e) => this.props.getData(e.target.value)}>
          <MenuItem value='28.3'>28.3</MenuItem>
          <MenuItem value='28.2'>28.2</MenuItem>
          <MenuItem value='27'>27</MenuItem>
        </Select>
      <Button onClick={this.handleSeasonClick}>+</Button>
      <SeasonDialog open={this.state.seasonOpen} onSave={this.saveNewSeason}/>
      </span>
    );
  }
}

export default SeasonSelector;

