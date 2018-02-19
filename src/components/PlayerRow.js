import React from 'react';
import '../App.css';
import TextField from 'material-ui/TextField';
import ReactTooltip from 'react-tooltip';
import TrackedStats from '../lib/TrackedStats.js';

export default ({playerIndex, isDaKing, kingPoints, row, onCellChange}) => { 
  let outOfFirst = (kingPoints - row['totalPoints']) * -1;
  return (
        <tr key={playerIndex}>
          <td>
            <TextField
              type='text'
              value={row.name}
              disabled
              className={isDaKing === true ? 'king' : undefined}
              data-tip={outOfFirst}
            />
            <ReactTooltip />
          </td>
        {
          Object.keys(TrackedStats).map((columnName, index) => {
            return (
              <td key={index}>
                <TextField
                  type='number'
                  value={row[columnName]}
                  onChange={(e) => onCellChange(columnName, row, e.target.value)}
                />
              </td>
            );
          })
        }
        </tr>

  )
}

