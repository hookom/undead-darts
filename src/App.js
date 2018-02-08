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

class ChangeHistory extends React.Component {
  render() {
    return (
        <Table>
            <TableHead>
                <TableRow>
                  <TableCell>CHANGE</TableCell>
                  <TableCell>TIMESTAMP</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {
                  this.props.changelog.map((row, changeIndex) => {
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
    );
  }
}

class ColumnHeaders extends React.Component {
  render() {
    return (
        <TableHead className="headerStyle">
        <TableRow>
            {Object.values(helpers.columns).map((header, headerIndex) => {
              if (header.header !== 'Season' && header.header !== 'Zombie Wins') {
                  tooltipText = header.header === 'Name' ? 
                    tooltipText = header.tooltip :
                    tooltipText = header.tooltip + '<br />Value:  ' + header.value
                  return (
                    <TableCell 
                      key={headerIndex}
                      data-multiline={true}
                      data-tip={tooltipText}
                    >{header.header}
                      <ReactTooltip />
                    </TableCell>
                  );
                }
              return null;
            })}
        </TableRow>
        </TableHead>
    );
  }
}
class SeasonSelector extends React.Component {
  render() {
    return (
      <span>
        <span className="headerStyle">Season: </span>
        <Select value={this.props.season} onChange={(e) => this.props.getData(e.target.value)}>
          <MenuItem value='28'>28</MenuItem>
          <MenuItem value='27'>27</MenuItem>
        </Select>
      </span>
    );
  }
}

class ZombieInput extends React.Component {
  render() {
    return (
      <span>
        <span className="headerStyle">Zombie Wins: </span>
        {
          this.props.stats.map((row, playerIndex) => {
            if (row.name === 'ZOMBIES') {
               return (<TextField
                 type='number'
                 key={playerIndex}
                value={row['zombiewins']}
                style={{width: 40}}
                onChange={(e) => this.props.onCellChange(playerIndex, 'zombiewins', row, e.target.value)}                                                 
              />)
            }
            return null;
          })
      }
    </span>
    );
  }
}

class AppHeader extends React.Component {
  render() {
    return (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Undead Darts</h1>
        </header>
    );
  }
}

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
    let tooltipText = ''

    return (
      <div className="App">
        <Reboot />
        <AppHeader/>
        <Table>
           <TableBody>
             <TableRow>
               <TableCell>
                 <ZombieInput stats={this.state.stats} onCellChange={this.onCellChange}/>
               </TableCell>
               <TableCell>
                 <SeasonSelector season={this.state.season} getData={this.getData} />
               </TableCell>
          </TableRow>
        </TableBody>
      </Table>
        <Table>
            <ColumnHeaders />
            <TableBody>
                {
                  this.state.stats.sort(function(a, b) { return b.totalPoints - a.totalPoints; })
                    .map((row, playerIndex) => {
                    if (row.name && row.name !== 'ZOMBIES') {
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
                            } else if (columnName !== 'zombiewins' && columnName !== 'season' )  {
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
                            return null;
                          })
                        }
                        </TableRow>
                      );
                    }
                    return null;

                  })
                }
            </TableBody>
        </Table>
        <ChangeHistory changelog={this.state.changelog}/>
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
