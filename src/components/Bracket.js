import React from 'react';
import './Bracket.css';

class Bracket extends React.Component {
    
  render() {
    let bracket = '';

    if(this.props.players.length === 8) {
        bracket = this.bracketForEight();
    }
    else if (this.props.players.length === 6 || this.props.players.length === 7) {
        bracket = this.bracketForSixOrSeven(this.props.players.length);
    } else if (this.props.players.length > 0) {
        bracket = 'Number of Players Not Supported';
    }

    return ( <div className="container"> { bracket } </div> );
  }

  bracketForSixOrSeven(size) {
    let twoSeedOpponent = size === 7 ? {name: this.props.players[6], seed: 7} : {name: 'BYE', seed: ''};

    return (
        <main id="tournament">
            <ul className="round round-1">
                <li className="spacer">&nbsp;</li>
                
                { this.match({name: this.props.players[0], seed: 1}, {name: 'BYE', seed: ''}) }

                <li className="spacer">&nbsp;</li>
                
                { this.match({name: this.props.players[3], seed: 4}, {name: this.props.players[4], seed: 5}) }

                <li className="spacer">&nbsp;</li>
                
                { this.match({name: this.props.players[1], seed: 2}, twoSeedOpponent) }

                <li className="spacer">&nbsp;</li>
                
                { this.match({name: this.props.players[2], seed: 3}, {name: this.props.players[5], seed: 6}) }

                <li className="spacer">&nbsp;</li>
            </ul>
            <ul className="round round-2">
                <li className="spacer">&nbsp;</li>
                
                <li className="game game-top"></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom "></li>

                <li className="spacer">&nbsp;</li>
                
                <li className="game game-top"></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom "></li>

                <li className="spacer">&nbsp;</li>
            </ul>
            <ul className="round round-3">
                <li className="spacer">&nbsp;</li>
                
                <li className="game game-top"></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom "></li>

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
                
                { this.match({name: this.props.players[6], seed: 7}, {name: this.props.players[7], seed: 8}, 2) }

                {this.spacers(2)}
            </ul>
            <ul className="round round-2">
                <li className="spacer">&nbsp;</li>
                
                { this.match({name: this.props.players[0], seed: 1}, {name: 'BYE', seed: ''}) }

                <li className="spacer">&nbsp;</li>
                
                { this.match({name: this.props.players[3], seed: 4}, {name: this.props.players[4], seed: 5}) }

                <li className="spacer">&nbsp;</li>
                
                { this.match({name: this.props.players[1], seed: 2}, {name: '', seed: ''}, 2) }

                <li className="spacer">&nbsp;</li>
                
                { this.match({name: this.props.players[2], seed: 3}, {name: this.props.players[5], seed: 6}) }

                <li className="spacer">&nbsp;</li>
            </ul>
            <ul className="round round-3">
                <li className="spacer">&nbsp;</li>
                
                <li className="game game-top"></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom "></li>

                <li className="spacer">&nbsp;</li>
                
                <li className="game game-top"></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom "></li>

                <li className="spacer">&nbsp;</li>
            </ul>
            <ul className="round round-4">
                <li className="spacer">&nbsp;</li>
                
                <li className="game game-top"></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom "></li>

                <li className="spacer">&nbsp;</li>
            </ul>
        </main>
    );
  }

  spacers(count) {
    let spacers = [];
    for (let i = 0; i < count; i++) {
        spacers.push(<li className="spacer">&nbsp;</li>);
    }
    return spacers;
  }

  gameSpacers(count) {
    let spacers = [];
    for (let i = 0; i < count; i++) {
        spacers.push(<li className="game game-spacer">&nbsp;</li>);
    }
    return spacers;
  }

  match(playerOne, playerTwo, spacers = 1) {
      return (
        <div>
            <li className="game game-top">{playerOne.name} <sup>{playerOne.seed}</sup></li>
            {this.gameSpacers(spacers)}
            <li className="game game-bottom ">{playerTwo.name} <sup>{playerTwo.seed}</sup></li>
        </div>
    );
  }
};

export default Bracket;

// <div>
//     <main id="tournament">
//         <ul className="round round-1">
//             <li className="spacer">&nbsp;</li>
            
//             <li className="game game-top winner">Lousville</li>
//             <li className="game game-spacer">&nbsp;</li>
//             <li className="game game-bottom ">NC AnT</li>

//             <li className="spacer">&nbsp;</li>
            
//             <li className="game game-top winner">Colo St</li>
//             <li className="game game-spacer">&nbsp;</li>
//             <li className="game game-bottom ">Missouri</li>

//             <li className="spacer">&nbsp;</li>
            
//             <li className="game game-top ">Oklahoma St</li>
//             <li className="game game-spacer">&nbsp;</li>
//             <li className="game game-bottom winner">Oregon</li>

//             <li className="spacer">&nbsp;</li>
            
//             <li className="game game-top winner">Saint Louis</li>
//             <li className="game game-spacer">&nbsp;</li>
//             <li className="game game-bottom ">New Mexico St</li>

//             <li className="spacer">&nbsp;</li>
            
//             <li className="game game-top winner">Memphis</li>
//             <li className="game game-spacer">&nbsp;</li>
//             <li className="game game-bottom ">St Mary's</li>

//             <li className="spacer">&nbsp;</li>
            
//             <li className="game game-top winner">Mich St</li>
//             <li className="game game-spacer">&nbsp;</li>
//             <li className="game game-bottom ">Valparaiso</li>

//             <li className="spacer">&nbsp;</li>
            
//             <li className="game game-top winner">Creighton</li>
//             <li className="game game-spacer">&nbsp;</li>
//             <li className="game game-bottom ">Cincinnati</li>

//             <li className="spacer">&nbsp;</li>
            
//             <li className="game game-top winner">Duke</li>
//             <li className="game game-spacer">&nbsp;</li>
//             <li className="game game-bottom ">Albany</li>

//             <li className="spacer">&nbsp;</li>
//         </ul>
//         <ul className="round round-2">
//             <li className="spacer">&nbsp;</li>
            
//             <li className="game game-top winner">Lousville</li>
//             <li className="game game-spacer">&nbsp;</li>
//             <li className="game game-bottom ">Colo St</li>

//             <li className="spacer">&nbsp;</li>
            
//             <li className="game game-top winner">Oregon</li>
//             <li className="game game-spacer">&nbsp;</li>
//             <li className="game game-bottom ">Saint Louis</li>

//             <li className="spacer">&nbsp;</li>
            
//             <li className="game game-top ">Memphis</li>
//             <li className="game game-spacer">&nbsp;</li>
//             <li className="game game-bottom winner">Mich St</li>

//             <li className="spacer">&nbsp;</li>
            
//             <li className="game game-top ">Creighton</li>
//             <li className="game game-spacer">&nbsp;</li>
//             <li className="game game-bottom winner">Duke</li>

//             <li className="spacer">&nbsp;</li>
//         </ul>
//         <ul className="round round-3">
//             <li className="spacer">&nbsp;</li>
            
//             <li className="game game-top winner">Lousville</li>
//             <li className="game game-spacer">&nbsp;</li>
//             <li className="game game-bottom ">Oregon</li>

//             <li className="spacer">&nbsp;</li>
            
//             <li className="game game-top ">Mich St</li>
//             <li className="game game-spacer">&nbsp;</li>
//             <li className="game game-bottom winner">Duke</li>

//             <li className="spacer">&nbsp;</li>
//         </ul>
//         <ul className="round round-4">
//             <li className="spacer">&nbsp;</li>
            
//             <li className="game game-top winner">Lousville</li>
//             <li className="game game-spacer">&nbsp;</li>
//             <li className="game game-bottom ">Duke</li>
            
//             <li className="spacer">&nbsp;</li>
//         </ul>		
//     </main>
// </div>