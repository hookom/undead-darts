import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import ReactTooltip from 'react-tooltip';
import Input from 'material-ui/Input';
import { DebounceInput } from 'react-debounce-input';

import TrackedStats from '../lib/TrackedStats.js';

import './PlayerRow.css';

class PlayerRow extends Component {
  state = {
    nameStyles: this.props.isDaKing === true ? ['playerName', 'king'] : ['playerName']
  }

  toggleParticipating = () => {
    let nameStyles = this.state.nameStyles;
    let alreadyParticipating = false;
    for (let i = 0; i < nameStyles.length; i++) {
      if (nameStyles[i] === 'participating') {
        alreadyParticipating = true;
        nameStyles.splice(i, 1);
      }
    }

    if (!alreadyParticipating) {
      nameStyles.push('participating');
    }

    this.setState({nameStyles});

    // TODO: 
    // this.props.toggleParticipant();
  }

  render() {
    let outOfFirst = (this.props.kingPoints - this.props.row['totalPoints']) * -1;

    return (
          <tr key={this.props.playerIndex}>
            <td>
              <div
                onClick={this.toggleParticipating}
                className={this.state.nameStyles.join(' ')}
                data-tip={outOfFirst}
              >{this.props.row.name}</div>
              <ReactTooltip />
            </td>
            <td>
              <TextField
                type='text'
                value={this.props.row['totalPoints']}
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
                    onChange={(e) => this.props.onCellChange(columnName, this.props.row, e.target.value)}
                  />
                </td>
              );
            })
          }
          </tr>)
  }
}

export default PlayerRow;