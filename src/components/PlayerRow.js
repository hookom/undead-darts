import React from 'react';
import '../App.css';
import TextField from 'material-ui/TextField';
import ReactTooltip from 'react-tooltip';
import Input from 'material-ui/Input';
import TrackedStats from '../lib/TrackedStats.js';
import { DebounceInput } from 'react-debounce-input';

export default ({playerIndex, isDaKing, kingPoints, row, onCellChange, seasonInProgress}) => {
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
          <td>
            <TextField
              type='text'
              value={row['totalPoints']}
              disabled
            />
          </td>
        {
          Object.keys(TrackedStats[row.statversion]).map((columnName, index) => {
            return (
              <td key={index}>
                <DebounceInput
                  element={Input}
                  type='number'
                  disabled={row.season !== seasonInProgress}
                  value={row[columnName]}
                  debounceTimeout={300}
                  onChange={(e) => onCellChange(columnName, row, e.target.value)}
                />
              </td>
            );
          })
        }
        </tr>
  )
}

