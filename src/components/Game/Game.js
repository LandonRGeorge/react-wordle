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
  return <Banner status="happy">
    <p>
      <strong>Congratulations!</strong> Got it in
      {' '}
      <strong>{nbrGuesses} guesses</strong>.
    </p>
  </Banner>
}

function Sad({answer}) {
  return <Banner status="sad">
    <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
  </Banner>
}

function Banner({status, children}) {
  return (
    <div className={`banner ${status}`}>
      {children}
    </div>
  )
}

function GuessForm({addGuess}) {
  const [guess, setGuess] = React.useState("")

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
  // running | won | lost
  const [status, setStatus] = React.useState("running")

  function addGuess(guess) {
    const allGuesses = [...guesses, guess]
    setGuesses(allGuesses)
    if (status === "running" && allGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setStatus("lost")
    }
    if (status === "running" && guess === answer) {
      setStatus("won")
    }
  }

  return (
    <>
      <Guess guesses={guesses} answer={answer}/>
      <GuessForm addGuess={addGuess}/>
      {status === "won" && <Happy nbrGuesses={guesses.length}/>}
      {status === "lost" && <Sad answer={answer}/>}
    </>
  );
}

export default Game;
