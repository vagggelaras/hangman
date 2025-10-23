import { useState } from 'react'
import StaticHeader from '/components/StaticHeader.jsx'
import DisplayStatus from '/components/DisplayStatus.jsx'
import Word from '/components/Word.jsx'
import Keyboard from '/components/Keyboard.jsx'
import { words } from '../public/words.js'

function App() {
  function getRandomWord() {
    let randomWord = words[Math.floor(Math.random() * words.length)]
    console.log("You found the easter egg!")
    console.log(randomWord)
    return randomWord
  }
  const [currentWord, setCurrentWord] = useState(getRandomWord)
  const [usedLetters, setUsedLetters] = useState([])

  const [wrongLettersCounter, setWrongLettersCounter] = useState(0)

  const [gameStatus, setgameStatus] = useState("started")

  function resetGame(){
    setgameStatus("started")
    setUsedLetters([])
    setWrongLettersCounter(0)
    setCurrentWord(getRandomWord)
  }

  function handleLetterGuessed(letter) {
    //updated array
    const updatedLetters = [...usedLetters, letter]
    setUsedLetters(updatedLetters)

    const uniqueLettersInWord = [...new Set(currentWord.split(""))]

    //every unique letter is guessed
    const isWon = uniqueLettersInWord.every(letter => updatedLetters.includes(letter))

    if (isWon) {
      setgameStatus('won')
      return
    }

    if (!currentWord.includes(letter)) {
      const newWrongCount = wrongLettersCounter + 1
      setWrongLettersCounter(newWrongCount)

      if (newWrongCount >= 8) {
        setgameStatus('gameOver')
        return
      }
      //game continues
      setgameStatus('pending')
    }else{
      setgameStatus('continue')
    }
  }

  return (
    <>
      <StaticHeader/>
      <DisplayStatus
        gameStatus={gameStatus}
        wrongLettersCounter={wrongLettersCounter}
      />
      <Word 
        word={currentWord}
        usedLetters={usedLetters}  
      />
      <Keyboard 
        gameStatus={gameStatus}
        word={currentWord}
        usedLetters={usedLetters}
        onLetterGuessed={handleLetterGuessed}  
        resetGame={resetGame}
      />
    </>
  )
}

export default App
