import React, { Component } from 'react';
import '../App.css';
import TextField from 'material-ui/TextField';
import { TableCell, TableRow } from 'material-ui/Table';
import ReactTooltip from 'react-tooltip';
import TrackedStats from '../lib/TrackedStats.js';

class PlayerRow extends Component {
  render() {
    let outOfFirst = (this.props.kingPoints - this.props.row['totalPoints']) * -1;

    return (
        <TableRow key={this.props.playerIndex}>
          <TableCell className="cellStyle">
            <TextField 
              type='text'
              value={this.props.row.name}
              disabled
              style={{width: 75}}
              className={this.props.isDaKing === true ? 'king' : undefined}
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
                  value={this.props.row[columnName]}
                  style={{width: 40}}
                  onChange={(e) => this.props.onCellChange(columnName, this.props.row, e.target.value)}
                />
              </TableCell>
            );
          })
        }
        </TableRow>

    );
  }
}

export default PlayerRow;
