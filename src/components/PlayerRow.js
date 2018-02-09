import React, { Component } from 'react';
import '../App.css';
import helpers from '../lib/helpers.js';
import TextField from 'material-ui/TextField';
import { TableCell, TableRow } from 'material-ui/Table';
import ReactTooltip from 'react-tooltip';
import ColumnInfo from './ColumnInfo.js';

class PlayerRow extends Component {
  render() {
    return (
        <TableRow key={this.props.playerIndex}>
        {
          Object.keys(ColumnInfo).map((columnName, columnIndex) => {
            if (columnName === 'name') {
        
              let outOfFirst = (this.props.kingPoints - this.props.row['totalPoints']) * -1;

              return (
                <TableCell key={columnIndex} className="cellStyle">
                  <TextField 
                    type='text'
                    value={this.props.row[columnName]}
                    disabled
                    style={{width: 75}}
                    className={this.props.isDaKing === true && columnIndex === 0 ? 'king' : undefined}
                    data-tip={outOfFirst}
                  />
                  <ReactTooltip />
                </TableCell>
              );
            } else if (columnName !== 'zombiewins' && columnName !== 'season' )  {
              return (
                <TableCell key={columnIndex} className="cellStyle">
                  <TextField
                    type='number'
                    value={this.props.row[columnName]}
                    style={{width: 40}}
                    onChange={(e) => this.props.onCellChange(this.props.playerIndex, columnName, this.props.row, e.target.value)}
                  />
                </TableCell>
              );
            }
            return null;
          })
        }
        </TableRow>

    );
  }
}

export default PlayerRow;
