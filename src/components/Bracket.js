import React from 'react';
import './Bracket.css';

class Bracket extends React.Component {
  render() {
    return (
        <div>
            <main id="tournament">
                <ul className="round round-1">
                    <li className="spacer">&nbsp;</li>
                    
                    <li className="game game-top">{this.props.players[0]}</li>
                    <li className="game game-spacer">&nbsp;</li>
                    <li className="game game-bottom ">{this.props.players[7]}</li>

                    <li className="spacer">&nbsp;</li>
                    
                    <li className="game game-top">{this.props.players[3]}</li>
                    <li className="game game-spacer">&nbsp;</li>
                    <li className="game game-bottom ">{this.props.players[4]}</li>

                    <li className="spacer">&nbsp;</li>
                    
                    <li className="game game-top ">{this.props.players[1]}</li>
                    <li className="game game-spacer">&nbsp;</li>
                    <li className="game game-bottom">{this.props.players[6]}</li>

                    <li className="spacer">&nbsp;</li>
                    
                    <li className="game game-top">{this.props.players[2]}</li>
                    <li className="game game-spacer">&nbsp;</li>
                    <li className="game game-bottom ">{this.props.players[5]}</li>

                    <li className="spacer">&nbsp;</li>
                </ul>
            </main>
        </div>
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
    );
  }
};

export default Bracket;
