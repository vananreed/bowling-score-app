import React, { Component } from 'react';
import Frame from '../Frame/Frame';
import TenthFrame from '../Frame/TenthFrame';

class Game extends Component {
  state = {
    first_throw: true,
    current_frame: 1,
    buttons: [...Array(11).keys()],
    throws: [],
    frame_totals: [],
    game_over: false
  }

  toggleButtons = (score, throws) => {
    if (this.lastThrowWasStrike(throws) || this.state.first_throw === false) {
      this.setState({buttons: [...Array(11).keys()]})
    } else {
      this.setState({buttons: [...Array(11).keys()].slice(0, (11 - score))});
    }
  }

  resetGame = () => {
    this.setState({
      first_throw: true,
      current_frame: 1,
      buttons: [...Array(11).keys()],
      throws: [],
      frame_totals: [],
      game_over: false
    })
  }

  addThrowHandler = (score) => {
    var throws = [...this.state.throws];
    throws.push(score);
    this.handleStrikesAndSpares(score, throws);
    this.toggleButtons(score, throws);
}

  handleStrikesAndSpares = (score, throws) => {
    var frame_totals = [...this.state.frame_totals]
    if (this.state.first_throw === true) {
      if (this.lastFrameWasSpare(this.lastFrame(throws))) {
        frame_totals.push(score + this.lastFrame(throws).reduce((a, b) => a + b, 0))
        this.setState({frame_totals: frame_totals})
      } else if (this.lastFrameWasStrike(this.lastFrame(throws))) {
        if (this.pendingStrike(throws)) {
          // two strikes in a row
          frame_totals.push(score + 20);
          this.setState({ frame_totals: frame_totals})
        }
      }
    } else {
      if (this.lastFrameWasStrike(this.lastFrame(throws))) {
        frame_totals.push(10 + this.lastThrow(throws, -1) + score);
        this.setState({frame_totals: frame_totals})
      }
    }
    this.updateScore(score, throws, frame_totals);
  }

  updateScore = (score, throws, frame_totals) => {
    if (this.state.first_throw === true) {
      if (score === 10) {
        throws.push(null)
        if (this.state.current_frame > 11) { this.setState({game_over: true}) }
        this.setState({
          throws: throws,
          current_frame: this.state.current_frame + 1
        });
      } else {
        this.setState({
          first_throw: false,
          throws: throws
        });
      }
    } else if (score + this.lastThrow(throws, -1) === 10) {
      // this is a spare
      if (this.state.current_frame > 10) { this.setState({game_over: true}) }
      this.setState({
        first_throw: true,
        current_frame: this.state.current_frame + 1,
        throws: throws
      })
    } else {
      frame_totals.push(score + throws[throws.length - 2]);
      if (this.state.current_frame >= 10) { this.setState({game_over: true}) }
      this.setState({
        frame_totals: frame_totals,
        first_throw: true,
        current_frame: this.state.current_frame + 1,
        throws: throws
      })
    }
  }

  lastThrow = (throws, step=0) => { return throws[throws.length - 1 + step] }

  lastThrowWasStrike = (throws) => { return (this.lastThrow(throws) === null) }

  lastFrameWasStrike = (frame) => { return frame[0] === 10 && frame[1] === null }

  lastFrameWasSpare = (frame) => { return !this.lastFrameWasStrike(frame) && frame[0] + frame[1] === 10}

  lastFrame = (throws) => { return (this.state.first_throw === true) ? throws.slice(throws.length -3, throws.length -1) : throws.slice(throws.length -4, throws.length -2) }

  pendingStrike = (throws) => {
    let compact = throws.filter(function (el) {return el != null});

    return this.lastThrow(compact, -2) === 10
   }

  subTotal = (frame) => {
    if (this.state.frame_totals.length > frame || frame === 9) {
      return this.state.frame_totals.slice(0, frame + 1).reduce((a, b) => a + b, 0)
    } else {
      return null
    }
  }

  tenthFrameValues = () => {
    let lastFrame = this.state.throws.slice(18)
    return lastFrame.filter(function (el) {return el != null});
  }


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
        {this.state.game_over === true ? (
          <div>
            <h1>Game Over</h1>
            <button style={style} onClick={this.resetGame.bind(this)}>Reset Score</button>
          </div>) : null}
        <h1>Total: {this.subTotal(9)}</h1>
        {this.state.buttons.map((num) => <button key={num} style={style} onClick={this.addThrowHandler.bind(this, num)}>{num}</button>)}
        <div>
          <Frame number="1" firstThrow={this.state.throws[0]} secondThrow={this.state.throws[1]} frameTotal={this.subTotal(0)} />
          <Frame number="2" firstThrow={this.state.throws[2]} secondThrow={this.state.throws[3]} frameTotal={this.subTotal(1)}/>
          <Frame number="3" firstThrow={this.state.throws[4]} secondThrow={this.state.throws[5]} frameTotal={this.subTotal(2)}/>
          <Frame number="4" firstThrow={this.state.throws[6]} secondThrow={this.state.throws[7]} frameTotal={this.subTotal(3)}/>
          <Frame number="5" firstThrow={this.state.throws[8]} secondThrow={this.state.throws[9]} frameTotal={this.subTotal(4)}/>
          <Frame number="6" firstThrow={this.state.throws[10]} secondThrow={this.state.throws[11]} frameTotal={this.subTotal(5)}/>
          <Frame number="7" firstThrow={this.state.throws[12]} secondThrow={this.state.throws[13]} frameTotal={this.subTotal(6)}/>
          <Frame number="8" firstThrow={this.state.throws[14]} secondThrow={this.state.throws[15]} frameTotal={this.subTotal(7)}/>
          <Frame number="9" firstThrow={this.state.throws[16]} secondThrow={this.state.throws[17]} frameTotal={this.subTotal(8)}/>
          <TenthFrame number="10" tenth="true" firstThrow={this.tenthFrameValues()[0]} secondThrow={this.tenthFrameValues()[1]} lastThrow={this.tenthFrameValues()[2]} frameTotal={this.subTotal(9)}/>
        </div>
      </div>
    );
  }
}

export default Game;
