const gameBoard = (() =>{
    let gameStatus = ['X','O','X','O','X','O','X','O','X'];
    
    const renderGame = (gameStatus) =>{
        
        for (let i=0; i<9; i++){
            document.querySelector(`#cell${i+1}`).textContent = gameStatus[i];
        }
        return 'test';
    };
    renderGame(gameStatus);
    
    return {
        renderGame,
        gameStatus,
    }
})();
// gameBoard.gameStatus = [1,1,1,1,1,1,1,1,1]
gameBoard.renderGame([1,1,1,1,1,1,1,1,1]);