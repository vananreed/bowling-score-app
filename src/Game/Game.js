import React, { Component } from 'react';
import Frame from '../Frame/Frame';

class Game extends Component {
  state = {
    total_score: 0,
    last_frame_score: 0,
    last_throw_score: 0,
    first_throw: true,
    current_frame: 1,
    buttons: [...Array(11).keys()],
    throws: []
  }

  toggleButtons = (score) => {
    if (this.state.first_throw === true) {
      this.setState({buttons: [...Array(11).keys()].slice(0, (11 - score))});
    } else {
      this.setState({buttons: [...Array(11).keys()]});
    }
  }

  addThrowHandler = (score) => {
    let throws = this.state.throws;
    throws.push(score);

    this.setState({
      total_score: this.state.total_score + score,
      last_frame_score: score,
      current_frame: this.state.current_frame + 1,
      first_throw: !this.state.first_throw,
      throws: throws,
    })
    this.updateScore(score);
    this.toggleButtons(score);
  }

  updateScore = (score) => {

  };


  render() {
    const style = {
      backgroundColor: 'white',
      font: 'Arial',
      fontWeight: 'bold',
      border: '1px solid blue',
      cursor: 'pointer',
      margin: 10,
    }
    return (
      <div className="Game">
        <h1>Total: {this.state.total_score}</h1>
        <h1>Last Frame: {this.state.last_frame_score}</h1>
        <h1>Current Frame: {this.state.current_frame}</h1>
        {this.state.buttons.map((num) => <button style={style} onClick={this.addThrowHandler.bind(this, num)}>{num}</button>)}
        <div>
          <Frame number="1" firstThrow={this.state.throws[0]} secondThrow={this.state.throws[1]} frameTotal=""/>
          <Frame number="2" firstThrow={this.state.throws[2]} secondThrow={this.state.throws[3]} frameTotal=""/>
          <Frame number="3" firstThrow={this.state.throws[4]} secondThrow={this.state.throws[5]} frameTotal=""/>
          <Frame number="4" firstThrow={this.state.throws[6]} secondThrow={this.state.throws[7]} frameTotal=""/>
          <Frame number="5" firstThrow={this.state.throws[8]} secondThrow={this.state.throws[9]} frameTotal=""/>
          <Frame number="6" firstThrow={this.state.throws[10]} secondThrow={this.state.throws[11]} frameTotal=""/>
          <Frame number="7" firstThrow={this.state.throws[12]} secondThrow={this.state.throws[13]} frameTotal=""/>
          <Frame number="8" firstThrow={this.state.throws[14]} secondThrow={this.state.throws[15]} frameTotal=""/>
          <Frame number="9" firstThrow={this.state.throws[16]} secondThrow={this.state.throws[17]} frameTotal=""/>
          <Frame number="10" firstThrow={this.state.throws[18]} secondThrow={this.state.throws[19]} frameTotal={this.state.total_score}/>
        </div>
      </div>
    );
  }
}

export default Game;
