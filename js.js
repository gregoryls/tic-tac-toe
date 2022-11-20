const gameBoard = (() =>{
    let gameStatus = ['\u00A0','\u00A0','\u00A0','\u00A0','\u00A0',
        '\u00A0','\u00A0','\u00A0','\u00A0'];
    
    const renderGame = () =>{
        
        for (let i=0; i<9; i++){
            document.querySelector(`#cell${i+1}`).textContent = gameStatus[i];
        }
        
    };
    renderGame();
    const updateGameStatus = (index,newValue) =>{
        gameStatus[index] = newValue;
        renderGame();
    }
    return {
        renderGame,
        updateGameStatus,
        
    }
})();
// gameBoard.gameStatus = [1,1,1,1,1,1,1,1,1]
// gameBoard.renderGame([1,1,1,1,1,1,1,1,1]);

// https://www.google.com/search?client=firefox-b-1-d&q=js+change+variable+inside+iife 
// read this ^^^

const gametest = document.querySelectorAll('#board div');

gametest.forEach( (currentValue)=>{
    // console.log(currentValue)
    currentValue.addEventListener('click', () =>{
        let x = currentValue.closest('div');
        console.log(x.id);
        //switch statement to 
    });
})