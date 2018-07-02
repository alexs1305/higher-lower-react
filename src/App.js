import React, { Component } from 'react';
import './App.css';

import Title from './Title/Title';
import GameEngine from './GameEngine/GameEngine';

function NumbersComponent(props) {

  return <div>{(() => props.numbers.map(n => <span>{n},</span>))()}</div>
}

function Button(props) {
  return <div className="col">
    <button disabled= {props.isDisabled} className="btn small-margin-right" onClick={() => props.action()}>
      {props.name}
    </button>
  </div>
}

function Win(props) {
  return <div>{props.message}</div>
}

class App extends Component {
  state = { numbers: [], guess: 0, winMessage: "" };

  gameEngine = new GameEngine(this.updateStateAction);

  componentDidMount() {
    this.setState(this.gameEngine.gameState);
    console.log("did mount")
    console.log(this.state);
  }

  nextNumber = () => {
    var number = this.gameEngine.revealNextNumber();
    var newNumbers = this.state.numbers.concat([number]);


    if (this.state.guess <= 0) { return; }

    var wascorrect = this.gameEngine.isCorrect(
      this.state.guess,
      newNumbers[newNumbers.length - 2],
      newNumbers[newNumbers.length - 1]);

    console.log("you were ")
    console.log(wascorrect);
    this.setState({ numbers: newNumbers, winMessage: "you were " + (wascorrect ? "right" : "wrong"), guess: 0 });
  }

  guessHigher = () => {
    var higherGuess = this.gameEngine.guessHigher();
    this.setState({ guess: higherGuess });
  }

  guessLower = () => {
    var lowerGuess = this.gameEngine.guessLower();
    this.setState({ guess: lowerGuess });
  }

  render() {
    return (
      <div className="App">
        <Title />
        <NumbersComponent numbers={this.state.numbers} /> 
        <div className="row">
          <Button isDisabled={this.state.guess===2} action={this.guessLower} name="Lower" />
          <Button isDisabled={this.state.guess===0} action={this.nextNumber} name="Reveal" />
          <Button isDisabled={this.state.guess===1} action={this.guessHigher} name="Higher" />
          <Win message={this.state.winMessage} />
        </div>
      </div>
    );
  }
}

export default App;
