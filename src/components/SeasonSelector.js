import React from 'react';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import SeasonDialog from './SeasonDialog';
import Button from 'material-ui/Button';

class SeasonSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seasonDialogOpen: false
    }
  }

  handleSeasonClick = () => {
    this.setState({seasonDialogOpen: true});
  }

  createNewSeason = (value) => {
    this.setState({seasonDialogOpen: false, newSeason: value});
    this.props.create(value);
  }

  render() {
    return (
      <span>
        <span className="headerStyle">Season: </span>
          <Select value={this.props.season} onChange={(e) => this.props.getData(e.target.value)}>
            {
              this.props.seasons.map((id, index) => {
                return (
                  <MenuItem key={index} value={id.season}>{id.season}</MenuItem>
                );
              })
            }
          </Select>
        <Button onClick={this.handleSeasonClick}>+</Button>
        <SeasonDialog open={this.state.seasonDialogOpen} onSave={this.createNewSeason}/>
      </span>
    );
  }
}

export default SeasonSelector;

