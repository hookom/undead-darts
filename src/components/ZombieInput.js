import React from 'react';
import TextField from 'material-ui/TextField';

class ZombieInput extends React.Component {
  render() {
    return (
      <span>
        <span className="headerStyle">Zombie Wins: </span>
        <TextField
          type='number'
          value={this.props.zombiewins}
          style={{width: 40}}
          onChange={(e) => this.props.onCellChange('zombiewins', {name: 'ZOMBIES', season: this.props.season}, e.target.value)}                                                 
        />
    </span>
    );
  }
}
export default ZombieInput;
