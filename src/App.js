import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
import helpers from './lib/helpers.js';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import Reboot from 'material-ui/Reboot';
import 'typeface-roboto';
import ChangeHistory from './components/ChangeHistory.js';
import SeasonSelector from './components/SeasonSelector.js';
import ZombieInput from './components/ZombieInput.js';
import AppHeader from './components/AppHeader.js';
import ColumnHeaders from './components/ColumnHeaders';
import PlayerRow from './components/PlayerRow.js';

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
                        <PlayerRow key={playerIndex} row={row} playerIndex={playerIndex} isDaKing={this.isDaKing(row['totalPoints'])} onCellChange={this.onCellChange} />
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
