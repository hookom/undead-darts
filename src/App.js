import React, { Component } from 'react';
import logo from './images/friendly_zombie.jpg';
import './App.css';
import helpers from './helpers.js';

let champ = [];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    // console.log('STATE', this.state.stats)
    champ = helpers.getDaChamp(this.state.stats);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Undead Darts</h1>
        </header>
        <table className="table table-bordered collapseBorder">
            <thead>
                <tr>
                    {Object.values(helpers.columns).map((header, headerIndex) => {
                      return (
                        <th key={headerIndex}>{header}</th>
                      );
                    })}
                </tr>
            </thead>
            <tbody>
                {
                  this.state.stats.map((row, playerIndex) => {
                    return (
                      <tr key={playerIndex}>
                      {
                        Object.keys(helpers.columns).map((columnName, columnIndex) => {
                          var inputType = columnName === 'name' ? 'text' : 'number';
                          if ((columnName === 'name')
                            || (columnName === 'season')
                            || (row['name'] !== 'ZOMBIES' && columnName === 'zombiewins')
                            || (row['name'] === 'ZOMBIES' && columnName !== 'zombiewins')) {
                            return (
                              <td key={columnIndex}>
                                <input
                                  type={inputType}
                                  value={row[columnName]}
                                  readOnly
                                  className={this.isDaChamp(row['name']) && columnIndex === 0 ? 'king' : undefined}
                                />
                              </td>
                            );
                          }
                          return (
                            <td key={columnIndex}>
                              <input
                                type={inputType}
                                value={row[columnName]}
                                onChange={(e) => this.onAfterCellChange(playerIndex, columnName, row, e.target.value)}
                              />
                            </td>
                          );
                        })
                      }
                      </tr>
                    );
                  })
                }
            </tbody>
        </table>
      </div>
    );
  }

  onAfterCellChange(index, modifiedColumn, row, newValue) {
    let newState = this.state.stats
    newState[index][modifiedColumn] = newValue
    this.setState({stats: newState})
    let obj = {
      name: row['name'],
      season: row['season'],
      field: modifiedColumn,
      value: newValue
    };
    let body = 'data=' + JSON.stringify(obj);
    helpers.updateStats(body);
  }

  getData() {
    helpers.getAllStats()
      .then(res => {
        this.setState({stats: res.data});
      });
  }

  isDaChamp(player) {
    return champ.includes(player);
  }
}

export default App;
