
import TeamPreviewCard from "./TeamPreviewCard";
import OpponentGen from './OpponentGen';

function Home({ cohort, activeUser, handleOpponentTeam, opponentTeam}) {
    function randomNumberInRange(min, max) {
        //get number between min (inclusive) and max (inclusive)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function recurRandArr(l = 0, randArr = ['', '', ''], eleA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]) {
        if (l === 3) return randArr;
        let ioEl = randomNumberInRange(0, eleA.length - 1);
        randArr[l] = eleA[ioEl];
        eleA.splice(ioEl, 1);
        return recurRandArr(l + 1, randArr, eleA)
    }

    
    const handleClick = () => {
        const randomNum = recurRandArr();
        const enemyTeam = cohort.filter(opponent => (randomNum[0] === opponent.id || randomNum[1] === opponent.id || randomNum[2] === opponent.id))
        handleOpponentTeam(enemyTeam);
    };

    const displayACard = activeUser.name ? <TeamPreviewCard player={activeUser} /> : <p>No Player Selected</p>

    return (
        <div>
            {displayACard}
            <span>VS</span>
            <OpponentGen enemyTeam={opponentTeam} handleClick={handleClick} />

        </div>
    )
}

export default Home