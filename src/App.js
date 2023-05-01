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

const guessesQty = 5

const specTable = [
  {normLetter: 'a', specLetter: 'ã'},
  {normLetter: 'a', specLetter: 'â'},
  {normLetter: 'a', specLetter: 'á'},
  {normLetter: 'e', specLetter: 'é'},
  {normLetter: 'e', specLetter: 'ê'},
  {normLetter: 'i', specLetter: 'í'},
  {normLetter: 'o', specLetter: 'ó'},
  {normLetter: 'o', specLetter: 'ô'},
  {normLetter: 'o', specLetter: 'õ'},
  {normLetter: 'u', specLetter: 'ú'},
  {normLetter: 'c', specLetter: 'ç'}
]


function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(0)

  const pickedWordAndCategory = () => {
    // Pick random category
    const categories = Object.keys(words) // ['carro', 'fruta', ...]
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    // Pick random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]

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

    // Fill state
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }

  // Process the letter input
  // ****** Colocar verificação de acentos aqui!!
  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase()

    // Check letter
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return
    }

    specTable.map((item) => {
      if(letters.includes(item.specLetter) && normalizedLetter === item.normLetter) {
        setGuessedLetters((actualGuessdLetter) => [
          ...actualGuessdLetter,
          item.specLetter
        ])
      }
    })

    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessdLetter) => [
        ...actualGuessdLetter,
        normalizedLetter
      ])
    } else {
      setWrongLetters((actualWrongLetter) => [
        ...actualWrongLetter,
        normalizedLetter
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {

    if(guesses <= 0) {

      clearLetterStates()

      setGameStage(stages[2].name)
    }

  }, [guesses])

  // Restarts the game
  const retry = () => {

    setScore(0)
    setGuesses(guessesQty)

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
