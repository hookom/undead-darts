import React from 'react';
import './Bracket.css';

class Bracket extends React.Component {
  render() {
    return (
        <div className="container">
            { this.optionOne() }
            { this.optionTwo() }
        </div>
    );
  }

  optionOne() {
    return (
        <main id="tournament">
            <ul className="round round-1">
                <li className="spacer">&nbsp;</li>
                <li className="spacer">&nbsp;</li>
                <li className="spacer">&nbsp;</li>
                <li className="spacer">&nbsp;</li>
                <li className="spacer">&nbsp;</li>
                <li className="spacer">&nbsp;</li>
                
                <li className="game game-top">{this.props.players[6]} <sup>7</sup></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom ">{this.props.players[7]} <sup>{8}</sup></li>

                <li className="spacer">&nbsp;</li>
                <li className="spacer">&nbsp;</li>
            </ul>
            <ul className="round round-2">
                <li className="spacer">&nbsp;</li>
                
                <li className="game game-top">{this.props.players[0]} <sup>1</sup></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom ">BYE</li>

                <li className="spacer">&nbsp;</li>
                
                <li className="game game-top">{this.props.players[3]} <sup>4</sup></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom ">{this.props.players[4]} <sup>5</sup></li>

                <li className="spacer">&nbsp;</li>
                
                <li className="game game-top ">{this.props.players[1]} <sup>2</sup></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom"></li>

                <li className="spacer">&nbsp;</li>
                
                <li className="game game-top ">{this.props.players[2]} <sup>3</sup></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom">{this.props.players[5]} <sup>6</sup></li>

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

  optionTwo() {
    return (
        <main id="tournament">
            <ul className="round round-1">
                <li className="spacer">&nbsp;</li>
                { this.optionTwoMatches() }
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

  optionTwoMatches() {
    let matches = [];
    let count = this.props.players.length;
    for (let i = 0; i < (count / 2); i++) {
        matches.splice(1, 0, 
            <div>
                <li className="game game-top">{this.props.players[i]} <sup>{i+1}</sup></li>
                <li className="game game-spacer">&nbsp;</li>
                <li className="game game-bottom ">{this.props.players[count - (1 + i)]} <sup>{count - i}</sup></li>

                <li className="spacer">&nbsp;</li>
            </div>
        );
    }
    return matches;
  }
};
// 1
// bye

// 2
// 7/8

// 3
// 6

// 4
// 5
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