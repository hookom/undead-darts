import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class ZombieInput extends React.Component {
  render() {
    return (
      <span>
        <span className="headerStyle">Zombie Wins: </span>
        {
          this.props.stats.map((row, playerIndex) => {
            if (row.name === 'ZOMBIES') {
               return (<TextField
                 type='number'
                 key={playerIndex}
                value={row['zombiewins']}
                style={{width: 40}}
                onChange={(e) => this.props.onCellChange(playerIndex, 'zombiewins', row, e.target.value)}                                                 
              />)
            }
            return null;
          })
      }
    </span>
    );
  }
}
export default ZombieInput;
