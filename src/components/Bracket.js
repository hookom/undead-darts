import React from 'react';
import './Bracket.css';
import Competitor from './Competitor.js';

class Bracket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        players: [],
        count: 0
    };

    this.updateNextRound = this.updateNextRound.bind(this);
  }

  componentWillReceiveProps(props) {
    let players = [props.players, ['','','',''], ['','']];
    this.setState({players, count: props.players.length});
  }

  render() {
    let bracket = '';

    if(this.state.count === 8) {
        bracket = this.bracketForEight();
    }
    else if (this.state.count === 6 || this.state.count === 7) {
        bracket = this.bracketForSixOrSeven(this.state.count);
    } else if (this.state.count > 0) {
        bracket = 'Number of Players Not Supported';
    }

    return ( <div className="container"> { bracket } </div> );
  }

  bracketForSixOrSeven(size) {
    let twoSeedOpponent = size === 7 ? {name: this.state.players[0][6], seed: 7} : {name: 'BYE', seed: ''};

    return (
        <main id="tournament">
            <ul className="round round-1">
                <li className="spacer">&nbsp;</li>
                
                { this.match(
                    {name: this.state.players[0][0], seed: 1},
                    {name: 'BYE', seed: ''},
                    0,
                    0) }

                <li className="spacer">&nbsp;</li>
                
                { this.match(
                    {name: this.state.players[0][3], seed: 4},
                    {name: this.state.players[0][4], seed: 5},
                    0,
                    1) }

                <li className="spacer">&nbsp;</li>
                
                { this.match(
                    {name: this.state.players[0][1], seed: 2},
                    twoSeedOpponent,
                    0,
                    2) }

                <li className="spacer">&nbsp;</li>
                
                { this.match(
                    {name: this.state.players[0][2], seed: 3},
                    {name: this.state.players[0][5], seed: 6},
                    0,
                    3) }

                <li className="spacer">&nbsp;</li>
            </ul>
            <ul className="round round-2">
                <li className="spacer">&nbsp;</li>
                
                { this.match(
                    {name: this.state.players[1][0], seed: ''},
                    {name: this.state.players[1][1], seed: ''},
                    1,
                    0,
                    2) }

                <li className="spacer">&nbsp;</li>
                
                { this.match(
                    {name: this.state.players[1][2], seed: ''},
                    {name: this.state.players[1][3], seed: ''},
                    1,
                    1,
                    2) }

                <li className="spacer">&nbsp;</li>
            </ul>
            <ul className="round round-3">
                <li className="spacer">&nbsp;</li>
                
                { this.match(
                    {name: this.state.players[2][0], seed: ''},
                    {name: this.state.players[2][1], seed: ''},
                    2,
                    0,
                    5) }

                <li className="spacer">&nbsp;</li>
            </ul>
        </main>
    );
  }

  bracketForEight() {
    return (
        <main id="tournament">
            <ul className="round round-1">
                {this.spacers(6)}
                
                { this.match(
                    {name: this.state.players[0][6], seed: 7},
                    {name: this.state.players[0][7], seed: 8},
                    'play-in',
                    'play-in',
                    2) }

                {this.spacers(2)}
            </ul>
            <ul className="round round-2">
                <li className="spacer">&nbsp;</li>
                
                { this.match(
                    {name: this.state.players[0][0], seed: 1},
                    {name: 'BYE', seed: ''},
                    0,
                    0) }

                <li className="spacer">&nbsp;</li>
                
                { this.match(
                    {name: this.state.players[0][3], seed: 4},
                    {name: this.state.players[0][4], seed: 5},
                    0,
                    1) }

                <li className="spacer">&nbsp;</li>
                
                { this.match(
                    {name: this.state.players[0][1], seed: 2},
                    {name: this.state.players[0][8], seed: ''},
                    0,
                    2,
                    2) }

                <li className="spacer">&nbsp;</li>
                
                { this.match(
                    {name: this.state.players[0][2], seed: 3},
                    {name: this.state.players[0][5], seed: 6},
                    0,
                    3) }

                <li className="spacer">&nbsp;</li>
            </ul>
            <ul className="round round-3">
                <li className="spacer">&nbsp;</li>
                
                { this.match(
                    {name: this.state.players[1][0], seed: ''},
                    {name: this.state.players[1][1], seed: ''},
                    1,
                    0,
                    2) }

                <li className="spacer">&nbsp;</li>
                
                { this.match(
                    {name: this.state.players[1][2], seed: ''},
                    {name: this.state.players[1][3], seed: ''},
                    1,
                    1,
                    2) }

                <li className="spacer">&nbsp;</li>
            </ul>
            <ul className="round round-4">
                <li className="spacer">&nbsp;</li>
                
                { this.match(
                    {name: this.state.players[2][0], seed: ''},
                    {name: this.state.players[2][1], seed: ''},
                    2,
                    0,
                    5) }

                <li className="spacer">&nbsp;</li>
            </ul>
        </main>
    );
  }

  spacers(count) {
    let spacers = [];
    for (let i = 0; i < count; i++) {
        spacers.push(<li key={i} className="spacer">&nbsp;</li>);
    }
    return spacers;
  }

  matchSpacers(count) {
    let spacers = [];
    for (let i = 0; i < count; i++) {
        spacers.push(<li key={i} className="game game-spacer">&nbsp;</li>);
    }
    return spacers;
  }

  match(playerOne, playerTwo, round, matchIndex, spacers = 1) {
      return (
        <div>
            <Competitor
                player={playerOne.name}
                seed={playerOne.seed}
                top={true}
                updateNextRound={this.updateNextRound}
                round={round}
                matchIndex={matchIndex}
            />
            {this.matchSpacers(spacers)}
            <Competitor
                player={playerTwo.name}
                seed={playerTwo.seed}
                top={false}
                updateNextRound={this.updateNextRound}
                round={round}
                matchIndex={matchIndex}
            />
        </div>
    );
  }

  updateNextRound(player, currentRound, targetIndex) {
    let players = {...this.state.players}
    players[currentRound + 1][targetIndex] = player;
    this.setState({players});
  }
};

export default Bracket;
