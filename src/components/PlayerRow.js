import React from 'react';
import '../App.css';
import TextField from 'material-ui/TextField';
import { TableCell, TableRow } from 'material-ui/Table';
import ReactTooltip from 'react-tooltip';
import TrackedStats from '../lib/TrackedStats.js';

export default ({playerIndex, isDaKing, kingPoints, row, onCellChange}) => { 
  let outOfFirst = (kingPoints - row['totalPoints']) * -1;
  return (
        <TableRow key={playerIndex}>
          <TableCell className="cellStyle">
            <TextField 
              type='text'
              value={row.name}
              disabled
              style={{width: 75}}
              className={isDaKing === true ? 'king' : undefined}
              data-tip={outOfFirst}
            />
            <ReactTooltip />
          </TableCell>
        {
          Object.keys(TrackedStats).map((columnName, index) => {
            return (
              <TableCell key={index} className="cellStyle">
                <TextField
                  type='number'
                  value={row[columnName]}
                  style={{width: 40}}
                  onChange={(e) => onCellChange(columnName, row, e.target.value)}
                />
              </TableCell>
            );
          })
        }
        </TableRow>

  )
}

