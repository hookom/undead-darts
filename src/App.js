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
import 'typeface-roboto';
import ReactTooltip from 'react-tooltip';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: [],
      season: '28',
      changelog: [],
      kingPoints: 0
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

    return (
      <div className="App">
        <Reboot />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Undead Darts</h1>
        </header>
        <Select value={this.state.season} onChange={(e) => this.getData(e.target.value)}>
          <MenuItem value='28'>28</MenuItem>
          <MenuItem value='27'>27</MenuItem>
        </Select>
        <Table>
            <TableHead className="headerStyle">
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
                  this.state.stats.sort(function(a, b) { return b.totalPoints - a.totalPoints; })
                    .map((row, playerIndex) => {
                      return (
                        <TableRow key={playerIndex}>
                        {
                          Object.keys(helpers.columns).map((columnName, columnIndex) => {
                            if (columnName === 'name') {
                        
                              let outOfFirst = (this.state.kingPoints - row['totalPoints']) * -1;

                              return (
                                <TableCell key={columnIndex} className="cellStyle">
                                  <TextField 
                                    type='text'
                                    value={row[columnName]}
                                    disabled
                                    style={{width: 75}}
                                    className={this.isDaKing(row['totalPoints']) && columnIndex === 0 ? 'king' : undefined}
                                    data-tip={outOfFirst}
                                  />
                                  <ReactTooltip />
                                </TableCell>
                              );
                            } else if ((columnName === 'season')
                              || (row['name'] !== 'ZOMBIES' && columnName === 'zombiewins')
                              || (row['name'] === 'ZOMBIES' && columnName !== 'zombiewins')) {

                              return (
                                <TableCell key={columnIndex} className="cellStyle">
                                  <TextField 
                                    type='number'
                                    value={row[columnName]}
                                    disabled
                                    style={{width: 40}}
                                  />
                                </TableCell>
                              );
                            } else {
                              return (
                                <TableCell key={columnIndex} className="cellStyle">
                                  <TextField
                                    type='number'
                                    value={row[columnName]}
                                    style={{width: 40}}
                                    onChange={(e) => this.onCellChange(playerIndex, columnName, row, e.target.value)}
                                  />
                                </TableCell>
                              );
                            }
                          })
                        }
                        </TableRow>
                      );
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

    // optimization: only update the changed player's totalPoints instead of all
    let newStatsWithTotals = helpers.setTotalPointsForAll(newStats);
    let highScore = helpers.getKingTotal(newStatsWithTotals);

    this.setState({stats: newStatsWithTotals, changelog: newLog, kingPoints: highScore});
  }

  getData(targetSeason) {
    helpers.getAllStats(targetSeason)
      .then(res => {
        let statsWithTotals = helpers.setTotalPointsForAll(res.data);
        let highScore = helpers.getKingTotal(statsWithTotals);
        this.setState({stats: statsWithTotals, season: targetSeason, kingPoints: highScore});
      });
  }

  isDaKing(playersPoints) {
    return this.state.kingPoints === playersPoints;
  }
}

export default App;
