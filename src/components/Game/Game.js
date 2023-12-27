import React from 'react';

import {sample} from '../../utils';
import {WORDS} from '../../data';
import Guess from '../Guess';
import {NUM_OF_GUESSES_ALLOWED} from "../../constants";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({answer});

function Happy({nbrGuesses}) {
  return (
    <div className="happy banner">
      <p>
        <strong>Congratulations!</strong> Got it in
        {' '}
        <strong>{nbrGuesses} guesses</strong>.
      </p>
    </div>
  )
}

function Sad({answer}) {
  return (
    <div className="sad banner">
      <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
    </div>
  )
}

function GuessForm({addGuess}) {
  const [guess, setGuess] = React.useState("")
  console.log(guess)

  const formHandler = e => {
    e.preventDefault();
    addGuess(guess)
    setGuess("")
  }

  return <form className="guess-input-wrapper"
               onSubmit={formHandler}
  >
    <label htmlFor="guess-input">Enter guess:</label>
    <input id="guess-input" type="text"
           value={guess}
           minLength="5"
           maxLength="5"
           onChange={e => setGuess(e.target.value.toUpperCase())}
    />
  </form>;
}

function Game() {

  const [guesses, setGuesses] = React.useState([])
  const [won, setWon] = React.useState()

  function addGuess(guess) {
    setGuesses([...guesses, guess])
  }


  if (won === undefined && guesses.length >= NUM_OF_GUESSES_ALLOWED) {
    setWon(false)
  }

  const display = () => {
    if (won === true) return <Happy nbrGuesses={guesses.length}/>
    if (won === false) return <Sad answer={answer}/>
    return
  }
  return (
    <>
      <Guess guesses={guesses} answer={answer} hasWon={(resp) => setWon(resp)}/>
      <GuessForm addGuess={addGuess} />
      {display()}
    </>
  );
}

export default Game;
