const gameBoard = (() =>{
    let gameStatus = ['X','O','X','O','X','O','X','O','X'];
    
    const renderGame = () =>{
        
        for (let i=0; i<9; i++){
            document.querySelector(`#cell${i+1}`).textContent = gameStatus[i];
        }
        return 'test';
    };
    renderGame();
    const updateGameStatus = (newArray) =>{
        gameStatus = newArray;
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