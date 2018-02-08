import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
import helpers from './helpers.js';
import TextField from 'material-ui/TextField';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Reboot from 'material-ui/Reboot';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import 'typeface-roboto';
import ReactTooltip from 'react-tooltip';
import ChangeHistory from './ChangeHistory.js';
import SeasonSelector from './SeasonSelector.js';
import ZombieInput from './ZombieInput.js';
import AppHeader from './AppHeader.js';
import ColumnHeaders from './ColumnHeaders';

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
