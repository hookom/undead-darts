import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import ReactTooltip from 'react-tooltip';
import Input from 'material-ui/Input';
import { DebounceInput } from 'react-debounce-input';

import TrackedStats from '../lib/TrackedStats.js';

import './PlayerRow.css';

class PlayerRow extends Component {

  determineStyles = () => {
    let styles = ['playerName'];

    if (this.props.kingPoints === this.props.row.totalPoints) {
      styles.push('king');
    }

    if (this.props.participating) {
      styles.push('participating');
    }

    return styles;
  }

  render() {
    let renderStyles = this.determineStyles();
    let outOfFirst = (this.props.kingPoints - this.props.row.totalPoints) * -1;
    let renderedRow = Object.assign({}, this.props.row);

    return (
          <tr key={this.props.playerIndex}>
            <td>
              <div
                onClick={() => this.props.toggleParticipating(this.props.row.name)}
                className={renderStyles.join(' ')}
                data-tip={outOfFirst}
              >{this.props.row.name}</div>
              <ReactTooltip />
            </td>
            <td>
              <TextField
                type='text'
                value={this.props.row.totalPoints}
                disabled
              />
            </td>
          {
            Object.keys(TrackedStats[this.props.row.statversion]).map((columnName, index) => {
              return (
                <td key={index}>
                  <DebounceInput
                    element={Input}
                    type='number'
                    disabled={this.props.row.season !== this.props.seasonInProgress}
                    value={this.props.row[columnName]}
                    debounceTimeout={300}
                    onChange={(e) => this.props.onCellChange(columnName, this.props.row, e.target.value, renderedRow[columnName])}
                  />
                </td>
              );
            })
          }
          </tr>)
  }
}

export default PlayerRow;