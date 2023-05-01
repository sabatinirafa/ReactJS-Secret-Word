//CSS
import './App.css';

//REACT
import { useCallback, useEffect, useState } from 'react';

// Dados
import {wordsList} from './data/words.js'

//Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
]


function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(5)
  const [score, setScore] = useState(0)

  const pickedWordAndCategory = () => {
    // Pick random category
    const categories = Object.keys(words) // ['carro', 'fruta', ...]
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    console.log(category)

    // Pick random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    console.log(word)

    return {word, category}
  }


  // Starts the game
  const startGame = () => {

    const {word, category} = pickedWordAndCategory()

    // Create array of letters
    let wordLetters = word.split('')

    wordLetters = wordLetters.map((i) => (
      i.toLowerCase()
    ))

    console.log(word, category)
    console.log(wordLetters)

    // Fill state
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }

  // Process the letter input
  // ****** Colocar verificação de acentos aqui!!
  const verifyLetter = (letter) => {
    console.log(letter)
  }

  // Restarts the game
  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && (
        <Game 
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === 'end' && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
