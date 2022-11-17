gameBoard = (() =>{
    let gameStatus = ['X','O','X','O','X','O','X','O','X'];
    
    const renderGame = () =>{
        
        for (let i=0; i<9; i++){
            document.querySelector(`#cell${i+1}`).textContent = gameStatus[i];
        }
    };
    renderGame();
    return {
        renderGame,
        gameStatus,
    }
})();