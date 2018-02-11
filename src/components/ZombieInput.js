import React from 'react';
import TextField from 'material-ui/TextField';

export default ({zombiewins, onCellChange, season}) => ( 
  <span>
    <span className="headerStyle">Zombie Wins: </span>
    <TextField
      type='number'
    value={zombiewins}
    style={{width: 40}}
    onChange={(e) => onCellChange('zombiewins', {name: 'ZOMBIES', season: season}, e.target.value)}
    />
  </span>
)

