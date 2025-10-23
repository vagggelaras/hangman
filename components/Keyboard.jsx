import { useEffect, useState } from "react"

export default function Keyboard(props) {

    const wordToGuess = props.word
    const usedLetters = props.usedLetters
    const onLetterGuessed = props.onLetterGuessed
    const resetGame = props.resetGame
    const gameStatus = props.gameStatus

    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const alphabetLst = alphabet.split("")

    const [letterStatus, setLetterStatus] = useState({})

    // Καθάρισε τα χρώματα όταν γίνεται reset (usedLetters = [])
    useEffect(() => {
        if (usedLetters.length === 0) {
            setLetterStatus({})
        }
    }, [usedLetters])

    const isGameOver = gameStatus === "gameOver" || gameStatus === "won"

    function handleLetterClicked(letter) {
        if (usedLetters.includes(letter) || isGameOver) {
            return
        }
        onLetterGuessed(letter)
        setLetterStatus({ ...letterStatus, [letter]: wordToGuess.includes(letter) ? "correctLetter" : "wrongLetter" })
    }

    const keyboardElements = alphabetLst.map(letter => {
        return (
            <button
                key={letter}
                onClick={() => handleLetterClicked(letter)}
                className={letterStatus[letter]}
                disabled={isGameOver}
            >
                {letter.toUpperCase()}
            </button>
        )
    })

    return (
        <>
            <section className="keyboard">
                {keyboardElements}
            </section>
            <section className="">
                <button onClick={resetGame} className="newGameBtn">
                    New Game
                </button>
            </section>
        </>
    )
}