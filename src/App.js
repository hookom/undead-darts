import React, { Component } from 'react';
import moment from 'moment';
import logo from './images/friendly_zombie.jpg';
import './App.css';
import helpers from './helpers.js';
import TextField from 'material-ui/TextField';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Reboot from 'material-ui/Reboot';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import 'typeface-roboto'
import ReactTooltip from 'react-tooltip'

let champ = [];
let zombies = {};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: [],
      season: '28',
      changelog: []
    };

    this.onCellChange = this.onCellChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData(this.state.season);

    helpers.getChangelog()
      .then(res => {

        this.setState({changelog: res.data});
      });
  }

  render() {
    champ = helpers.getDaChamp(this.state.stats);
    zombies = this.state.stats.filter(stat => stat.name === "ZOMBIES")

    return (
      <div className="App">
        <Reboot />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title" data-tip="asdf">Undead Darts</h1>
          <ReactTooltip />
        </header>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Select value={this.state.season} onChange={(e) => this.getData(e.target.value)}>
                  <MenuItem value='28'>28</MenuItem>
                  <MenuItem value='27'>27</MenuItem>
                </Select>
              </TableCell>
                  <TableCell>
                    Zombies: &nbsp;&nbsp;
                    {
                      this.state.stats.map((row, playerIndex) => {
                        if (row['name'] === "ZOMBIES") {
                          return (row && <TextField
                            type={'number'}
                            value={row['zombiewins']}
                            onChange={(e) => this.onCellChange(playerIndex, 'zombiewins', row, e.target.value)}
                          />
                        )
                        }
                      })
                    }
                  </TableCell>
              </TableRow>
            </TableBody>
        </Table>
        <Table>
            <TableHead class="headerStyle">
                <TableRow>
                    {Object.values(helpers.columns).map((header, headerIndex) => {
                      return (
                        <TableCell key={headerIndex}>{header}</TableCell>
                      );
                    })}
                </TableRow>
            </TableHead>
            <TableBody>
                {
                  this.state.stats.map((row, playerIndex) => {
                    if (row['name'] != 'ZOMBIES') {
                      return (
                        <TableRow key={playerIndex}>
                        {
                          Object.keys(helpers.columns).map((columnName, columnIndex) => {
                            var inputType = columnName === 'name' ? 'text' : 'number';
                            var cellWidth = columnName === 'name' ? 75 : 50;
                            if ((columnName === 'name')
                              || (columnName === 'season')
                              || (row['name'] !== 'ZOMBIES' && columnName === 'zombiewins')
                              || (row['name'] === 'ZOMBIES' && columnName !== 'zombiewins')) {

                              var score = helpers.playerScore(this.state.stats, row['name']);
                              var champScore = helpers.playerScore(this.state.stats, champ[0]);
                              var backFromChamp = champScore - score;
                              var text = row['name'];
                              if (backFromChamp > 0 && row['name'] !== 'ZOMBIES') {
                                text += '  -' + backFromChamp;
                              }
                              return (
                                <TableCell key={columnIndex} class="cellStyle">
                                  <TextField
                                    type={inputType}
                                    value={text}
                                    disabled
                                    style={{width: cellWidth}}
                                    className={this.isDaChamp(row['name']) && columnIndex === 0 ? 'king' : undefined}
                                  />
                                </TableCell>
                              );
                            }
                            return (
                              <TableCell key={columnIndex}>
                                <TextField
                                  type={inputType}
                                  value={row[columnName]}
                                  style={{width: cellWidth}}
                                  onChange={(e) => this.onCellChange(playerIndex, columnName, row, e.target.value)}
                                />
                              </TableCell>
                            );
                          })
                        }
                        </TableRow>
                      );

                    }
                  })
                }
            </TableBody>
        </Table>
        <Table>
            <TableHead>
                <TableRow>
                  <TableCell>CHANGE</TableCell>
                  <TableCell>TIMESTAMP</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                  this.state.changelog.map((row, changeIndex) => {
                    return (
                      <TableRow key={changeIndex}>
                          <TableCell>
                            <div>{row['message']}</div>
                          </TableCell>
                          <TableCell>
                            <div>{row['timestamp']}</div>
                          </TableCell>
                      </TableRow>
                    );
                  })
                }
            </TableBody>
        </Table>
      </div>
    );
  }

  onCellChange(index, modifiedColumn, row, newValue) {
    let newStats = this.state.stats
    newStats[index][modifiedColumn] = newValue;

    let changeDescription = row['name'] + ':' + row['season'] + ':' + modifiedColumn + ':' + newValue;
    let ts = moment().format('YYYY-MM-DD HH:mm:ss');

    let obj = {
      name: row['name'],
      season: row['season'],
      field: modifiedColumn,
      value: newValue,
      timestamp: ts,
      change: changeDescription
    };
    let body = 'data=' + JSON.stringify(obj);
    helpers.updateStats(body);

    let newLog = this.state.changelog;
    newLog.unshift({message: changeDescription, timestamp: ts});

    this.setState({stats: newStats});
    this.setState({changelog: newLog});
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
