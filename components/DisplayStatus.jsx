import { languages } from '../public/languages.js'

export default function DisplayStatus(props){

    const wrongLettersCounter = props.wrongLettersCounter

    const languageElements = languages.map((x, index) => {
        return (
            <span
                key={x.name}
                className={`languageElements ${index < wrongLettersCounter ? 'dimmed' : ''}`}
                style={{
                    backgroundColor: x.backgroundColor,
                    color: x.color
                }}
            >
                <span>{x.name}</span>
                {index < wrongLettersCounter && (
                    <section>💀</section>
                )}
            </span>
        )
    })

    let displayStatus 

    if(props.gameStatus === "gameOver"){
        displayStatus = <section className="gameStatus gameLost">
            <h2>Game Over...</h2>
            <p>You lose! Better start learning Assembly</p>
        </section>
    }else if(props.gameStatus === "won"){
        displayStatus = <section className="gameStatus gameWon">
            <h2>Game Won!</h2>
            <p>Well done! </p>
        </section>
    }else if(props.gameStatus === "started"){
        displayStatus = <section className="gameStatus gameStarted">
            <h2>Good Luck!</h2>
        </section>
    }else if(props.gameStatus === "pending"){
        const languageToDelete = languages[wrongLettersCounter - 1].name
        displayStatus = <section className="gameStatus gamePending">
            <h2>{getFarewellText(languageToDelete)} </h2>
        </section>
    }else{
        displayStatus = <section className="gameStatus gameStarted">
            <h2>Getting closer!</h2>
        </section>
    }

    function getFarewellText(language) {
        const options = [
            `Farewell, ${language}`,
            `Adios, ${language}`,
            `R.I.P., ${language}`,
            `We'll miss you, ${language}`,
            `Oh no, not ${language}!`,
            `${language} bites the dust`,
            `Gone but not forgotten, ${language}`,
            `The end of ${language} as we know it`,
            `Off into the sunset, ${language}`,
            `${language}, it's been real`,
            `${language}, your watch has ended`,
            `${language} has left the building`
        ];

        const randomIndex = Math.floor(Math.random() * options.length);
        return options[randomIndex];
    }

    return(
        <>
            {displayStatus}

            <section className="languagesContainer">
                {languageElements}
            </section>
        </>
    )
}