import React, { Component } from 'react';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

class SeasonSelector extends React.Component {
  render() {
    return (
      <span>
        <span className="headerStyle">Season: </span>
        <Select value={this.props.season} onChange={(e) => this.props.getData(e.target.value)}>
          <MenuItem value='28'>28</MenuItem>
          <MenuItem value='27'>27</MenuItem>
        </Select>
      </span>
    );
  }
}

export default SeasonSelector;

