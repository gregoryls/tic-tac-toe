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

const gameplay = (() => {
    let takenSquareTracker = [];
    let currentToken = 'X';
    const currentPlayer = () => {
        if (currentToken === 'X'){
            currentToken = 'O';
            return 'X';
        }
        if (currentToken === 'O'){
            currentToken = 'X';
            return 'O';
        }
    }
    const gametest = document.querySelectorAll('#board div');

    gametest.forEach( (currentValue)=>{
    // console.log(currentValue)
    currentValue.addEventListener('click', () =>{
        let x = currentValue.closest('div');
        console.log(x.id);

        switch (x.id){
            case 'cell1':
                gameBoard.updateGameStatus(0,gameplay.currentPlayer());
                break;
            case 'cell2':
                gameBoard.updateGameStatus(1,gameplay.currentPlayer());
                break;
            case 'cell3':
                gameBoard.updateGameStatus(2,gameplay.currentPlayer());
                break;
            case 'cell4':
                gameBoard.updateGameStatus(3,gameplay.currentPlayer());
                break;
            case 'cell5':
                gameBoard.updateGameStatus(4,gameplay.currentPlayer());
                break;
            case 'cell6':
                gameBoard.updateGameStatus(5,gameplay.currentPlayer());
                break;
            case 'cell7':
                gameBoard.updateGameStatus(6,gameplay.currentPlayer());
                break;
            case 'cell8':
                gameBoard.updateGameStatus(7,gameplay.currentPlayer());
                break;
            case 'cell9':
                gameBoard.updateGameStatus(8,gameplay.currentPlayer());
                break;
        }
    });
})

    return{
        currentPlayer,
    }

})();
// gameBoard.gameStatus = [1,1,1,1,1,1,1,1,1]
// gameBoard.renderGame([1,1,1,1,1,1,1,1,1]);

// https://www.google.com/search?client=firefox-b-1-d&q=js+change+variable+inside+iife 
// read this ^^^

