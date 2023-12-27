import React from 'react';
import {NUM_OF_GUESSES_ALLOWED} from "../../constants";
import {checkGuess} from "../../game-helpers";

function Row({guess, answer, hasWon}) {
  console.log(answer)
  if (guess===undefined) {
    return (
      <p className="guess">
        {Array(5).fill(0).map((_, j) => j).map(j => (
          <span className="cell" key={j}></span>
        ))}
      </p>
    )
  }

  if (guess === answer) {
    hasWon(true)
  }

  const checked = checkGuess(guess, answer)
  return (
    <p className="guess">
      {checked.map((v, i)=> (
        <span className={`cell ${v.status}`} key={i}>{v.letter}</span>
      ))}
    </p>
  )
}

function Guess({guesses, answer, hasWon}) {
  return (
    <div className="guess-results">
      {Array(NUM_OF_GUESSES_ALLOWED).fill(0).map((_, i) => i).map(i => {
        let guess = guesses[i];
        return (
          <Row guess={guess} key={i} answer={answer} hasWon={hasWon}/>
          )
        })}
      </div>
  )
}

export default Guess;
