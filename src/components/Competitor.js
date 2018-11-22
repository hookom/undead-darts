import React, { Component } from 'react';

import './Bracket.css';

class Competitor extends Component {
  state = {
    isWinner: false
  };

  handleClick = () => {
    if (this.props.player !== 'BYE') {
      if (this.props.round < 3) {
        this.props.updateNextRound(this.props.player, this.props.round, this.props.matchIndex);
      }

      this.setState({isWinner: !this.state.isWinner});
    }
  }

  render() {
      let style = 'game game-';
      this.props.top ? style += 'top' : style += 'bottom';
      this.state.isWinner ? style += ' winner' : style += '';

      return (
        <li className={style} onClick={this.handleClick} >{this.props.player} <sup>{this.props.seed}</sup></li>
      );
  }

}

export default Competitor;