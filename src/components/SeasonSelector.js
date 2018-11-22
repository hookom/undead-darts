import React, { Component } from 'react';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';

import InputDialog from './InputDialog';

class SeasonSelector extends Component {
  state = {
    seasonDialogOpen: false
  }

  handleSeasonClick = () => {
    this.setState({seasonDialogOpen: true});
  }

  createNewSeason = (value) => {
    this.setState({seasonDialogOpen: false});
    this.props.create(value);
  }

  render() {
    return (
      <span>
        <span className="headerStyle">Season: </span>
          <Select
            value={this.props.selectedSeason}
            onChange={(e) => this.props.setSelectedSeason(e.target.value)}
          >
            {
              this.props.seasons.map((id, index) => {
                return (
                  <MenuItem key={index} value={id}>{id}</MenuItem>
                );
              })
            }
          </Select>
        <Button onClick={this.handleSeasonClick}>+</Button>
        <InputDialog
          open={this.state.seasonDialogOpen}
          onSave={this.createNewSeason}
          title='Add Season'
        />
      </span>
    );
  }
}

export default SeasonSelector;

