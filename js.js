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

        switch (x.id){
            case 'cell1':
                gameBoard.updateGameStatus(0,'X');
                break;
            case 'cell2':
                gameBoard.updateGameStatus(1,'X');
                break;
            case 'cell3':
                gameBoard.updateGameStatus(2,'X');
                break;
            case 'cell4':
                gameBoard.updateGameStatus(3,'X');
                break;
            case 'cell5':
                gameBoard.updateGameStatus(4,'X');
                break;
            case 'cell6':
                gameBoard.updateGameStatus(5,'X');
                break;
            case 'cell7':
                gameBoard.updateGameStatus(6,'X');
                break;
            case 'cell8':
                gameBoard.updateGameStatus(7,'X');
                break;
            case 'cell9':
                gameBoard.updateGameStatus(8,'X');
                break;
        }
        //switch statement to 
    });
})