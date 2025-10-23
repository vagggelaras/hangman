export default function Word(props) {
    const wordLst = props.word.split("")
    const usedLetters = props.usedLetters

    const wordElements = wordLst.map((x, index) => {
        const isRevealed = usedLetters.includes(x)
        return (
            <span
                className={`wordToFind ${isRevealed ? 'revealed' : 'hidden'}`}
                key={index}
            >
                {isRevealed ? x.toUpperCase() : ''}
            </span>
        )
    })

    return (
        <section className="wordContainer">
            {wordElements}
        </section>
    )
}