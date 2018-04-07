import React from 'react';
import './Bracket.css';

class Competitor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        isWinner: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
      if (this.props.round < 2) {
        this.props.updateNextRound(this.props.player, this.props.round, this.props.matchIndex);
      }

      this.setState({isWinner: !this.state.isWinner});
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