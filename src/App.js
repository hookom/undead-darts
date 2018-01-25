import React, { Component } from 'react';
import logo from './images/friendly_zombie.jpg';
import './App.css';
import helpers from './helpers.js';

let champ = [];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: [],
      season: '28'
    };

    this.onCellChange = this.onCellChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData(this.state.season);
  }

  render() {
    champ = helpers.getDaChamp(this.state.stats);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Undead Darts</h1>
        </header>
        <select value={this.state.season} onChange={(e) => this.getData(e.target.value)}>
          <option value='28'>28</option>
          <option value='27'>27</option>
        </select>
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
                                onChange={(e) => this.onCellChange(playerIndex, columnName, row, e.target.value)}
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

  onCellChange(index, modifiedColumn, row, newValue) {
    let newStats = this.state.stats
    newStats[index][modifiedColumn] = newValue
    this.setState({stats: newStats})
    let obj = {
      name: row['name'],
      season: row['season'],
      field: modifiedColumn,
      value: newValue
    };
    let body = 'data=' + JSON.stringify(obj);
    helpers.updateStats(body);
  }

  getData(targetSeason) {
    helpers.getAllStats(targetSeason)
      .then(res => {
        this.setState({stats: res.data, season: targetSeason});
      });
  }

  isDaChamp(player) {
    return champ.includes(player);
  }
}

export default App;
