import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
import helpers from './lib/helpers.js';
import controller from './lib/controller.js';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import Reboot from 'material-ui/Reboot';
import 'typeface-roboto';
import ChangeHistory from './components/ChangeHistory.js';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import SeasonSelector from './components/SeasonSelector.js';
import ZombieInput from './components/ZombieInput.js';
import AppHeader from './components/AppHeader.js';
import PlayerStats from './components/PlayerStats.js'
import { withStyles } from 'material-ui/styles';
import Bracket from './components/Bracket.js'
import TrackedStats from './lib/TrackedStats.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allStatsWithTotals: [],
      selectedSeasonStats: [],
      selectedSeason: '',
      seasonInProgress: '',
      seasons: [],
      changelog: [],
      kingPoints: 0,
      zombiewins: 0,
      historyExpanded: false
    };

    this.handleExpandClick = () => {
      this.setState({ historyExpanded: !this.state.historyExpanded });
    };

    this.onCellChange = this.onCellChange.bind(this);
    this.isDaKing = this.isDaKing.bind(this);
    this.setSelectedSeason = this.setSelectedSeason.bind(this);
    this.createNewSeason = this.createNewSeason.bind(this);
    this.addNewPlayer = this.addNewPlayer.bind(this);
    this.getOrderedPlayerNames = this.getOrderedPlayerNames.bind(this);
  }

  componentDidMount() {
    controller.getAllStats()
      .then(res => {
        let allStatsWithTotals = helpers.setTotalPointsFor(res.data);
        // console.log('allStatsWithTotals: ', allStatsWithTotals)
        let seasons = res.data.filter(x => x.name === 'ZOMBIES').map(row => row.season);
        // console.log('seasons: ', seasons)
        let selectedSeason = seasons[seasons.length - 1];
        // console.log('selectedSeason: ', selectedSeason)
        let selectedSeasonStats = allStatsWithTotals.filter(x => x.season === selectedSeason);
        // console.log('selectedSeasonStats: ', selectedSeasonStats)
        let kingPoints = helpers.getKingTotal(selectedSeasonStats);
        // console.log('kingPoints: ', kingPoints)
        let zombiewins = selectedSeasonStats.filter(x => x.name === 'ZOMBIES')[0].zombiewins;
        // console.log('zombiewins: ', zombiewins)
        this.setState({
          allStatsWithTotals,
          selectedSeasonStats,
          selectedSeason,
          seasonInProgress: selectedSeason,
          kingPoints,
          zombiewins,
          seasons
        });
      });

    controller.getChangelog()
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
                <ZombieInput
                  zombiewins={this.state.zombiewins}
                  onCellChange={this.onCellChange}
                  season={this.state.selectedSeason}
                />
              </TableCell>
              <TableCell>
                <SeasonSelector 
                  selectedSeason={this.state.selectedSeason} 
                  seasons={this.state.seasons}
                  setSelectedSeason={this.setSelectedSeason}
                  create={this.createNewSeason}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <PlayerStats
          stats={this.state.selectedSeasonStats}
          kingPoints={this.state.kingPoints}
          isDaKing={this.isDaKing}
          onCellChange={this.onCellChange}
          seasonInProgress={this.state.seasonInProgress}
          addPlayer={this.addNewPlayer}
        />
        <IconButton onClick={this.handleExpandClick}>
          <h4>History</h4>
          <ExpandMoreIcon />
        </IconButton> 
        <Collapse in={this.state.historyExpanded} timeout="auto" unmountOnExit>
          <ChangeHistory changelog={this.state.changelog}/>
        </Collapse>
        <Bracket players={ this.getOrderedPlayerNames() }/>
      </div>
    );
  }

  onCellChange(modifiedColumn, modifiedRow, newValue) {
    let newStats = this.state.allStatsWithTotals;
    newStats.filter(x => x.season === modifiedRow.season && x.name === modifiedRow.name)[0][modifiedColumn] = newValue;

    let changeDescription = modifiedRow.name
                            + ':' + modifiedRow.season
                            + ':' + modifiedColumn
                            + ':' + newValue;
    let ts = moment().format('YYYY-MM-DD HH:mm:ss');

    controller.updateStat(
      {
        stat: {
          field: modifiedColumn,
          value: newValue,
          name: modifiedRow.name,
          season: modifiedRow.season
        },
        changelog: {
          message: changeDescription,
          timestamp: ts
        }
      }
    );

    let newLog = this.state.changelog;
    newLog.unshift({message: changeDescription, timestamp: ts});

    let allStatsWithTotals = helpers.setTotalPointsFor(newStats, [modifiedRow.name]);
    let selectedSeasonStats = allStatsWithTotals.filter(x => x.season === this.state.selectedSeason);
    let kingPoints = helpers.getKingTotal(selectedSeasonStats);
    let zombiewins = selectedSeasonStats.filter(x => x.name === 'ZOMBIES')[0].zombiewins;
    
    this.setState({
      allStatsWithTotals,
      selectedSeasonStats,
      changelog: newLog,
      kingPoints,
      zombiewins});
  }

  setSelectedSeason(season) {
    let selectedSeason = season;
    let selectedSeasonStats = this.state.allStatsWithTotals.filter(x => x.season === selectedSeason);
    let kingPoints = helpers.getKingTotal(selectedSeasonStats);
    let zombiewins = selectedSeasonStats.filter(x => x.name === 'ZOMBIES')[0].zombiewins;
    this.setState({
      selectedSeasonStats,
      selectedSeason,
      kingPoints,
      zombiewins
    });
  }

  isDaKing(playersPoints) {
    return this.state.kingPoints === playersPoints;
  }

  createNewSeason(newSeasonId) {
    let playerNames = [];
    let newSeasonStats = this.state.selectedSeasonStats;
    let statVersion = this.state.selectedSeasonStats[0].statversion;
    let allStatsWithTotals = this.state.allStatsWithTotals;
    
    newSeasonStats.forEach(row => {
      playerNames.push(row.name);

      Object.keys(row).forEach(key => {
          if (key === 'season') {
            row[key] = newSeasonId;
          }
          else if (key !== 'name' && key !== 'statversion') {
            row[key] = 0;
          }
      });

      allStatsWithTotals.push(row);
    });

    let seasons = this.state.seasons;
    seasons.push(newSeasonId);

    controller.createNewSeason(newSeasonId, playerNames, statVersion, Object.keys(TrackedStats[statVersion]));

    this.setState({
      allStatsWithTotals,
      selectedSeasonStats: newSeasonStats,
      selectedSeason: newSeasonId,
      seasonInProgress: newSeasonId,
      seasons,
      kingPoints: 0,
      zombiewins: 0
    });
  }

  addNewPlayer(playerName) {
    let newRow = Object.assign({}, this.state.selectedSeasonStats[0]);
    Object.keys(newRow).forEach(key => {
      if (key === 'name') {
        newRow[key] = playerName;
      }
      else if (key === 'statversion' || key === 'season') {
        // keep copied value
      } else {
        newRow[key] = '0';
      }
      newRow.totalPoints = 0;
    });

    let selectedSeasonStats = this.state.selectedSeasonStats;
    selectedSeasonStats.push(newRow);
    let allStatsWithTotals = this.state.allStatsWithTotals;
    allStatsWithTotals.push(newRow);

    controller.addPlayer(newRow.season, [playerName], newRow.statversion, Object.keys(TrackedStats[newRow.statversion]));

    this.setState({
      allStatsWithTotals,
      selectedSeasonStats
    });
  }

  getOrderedPlayerNames() {
    let names = [];
    this.state.selectedSeasonStats
      .sort(function(a, b) { return b.totalPoints - a.totalPoints; })
      .forEach((player) => {
        if (player.name !== 'ZOMBIES') {
          names.push(player.name);
        }
      });
    return names;
  }
}

const styles = theme => ({
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
});

export default withStyles(styles)(App);
