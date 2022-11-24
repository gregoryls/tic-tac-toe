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

    let winningPositions = [
        //rows
        [gameStatus[0],gameStatus[1],gameStatus[2]],
        [gameStatus[3],gameStatus[4],gameStatus[5]],
        [gameStatus[6],gameStatus[7],gameStatus[8]],

        //columns
        [gameStatus[0],gameStatus[3],gameStatus[6]],
        [gameStatus[1],gameStatus[4],gameStatus[7]],
        [gameStatus[2],gameStatus[5],gameStatus[8]],

        //diagonals
        [gameStatus[0],gameStatus[4],gameStatus[8]],
        [gameStatus[2],gameStatus[4],gameStatus[6]],
    ];
    console.log(winningPositions)

    // winningPositions.push([].push(gameStatus[0],gameStatus[1],gameStatus[2]));
    
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
    currentValue.addEventListener('click', () =>{
        let gameCell = currentValue.closest('div');
        console.log(gameCell.id);

        switch (gameCell.id){
            case 'cell1':
                if (takenSquareTracker.includes(0)) break;
                gameBoard.updateGameStatus(0,gameplay.currentPlayer());
                takenSquareTracker.push(0);
                break;
            case 'cell2':
                if (takenSquareTracker.includes(1)) break;
                gameBoard.updateGameStatus(1,gameplay.currentPlayer());
                takenSquareTracker.push(1);
                break;
            case 'cell3':
                if (takenSquareTracker.includes(2)) break;
                gameBoard.updateGameStatus(2,gameplay.currentPlayer());
                takenSquareTracker.push(2);
                break;
            case 'cell4':
                if (takenSquareTracker.includes(3)) break;
                gameBoard.updateGameStatus(3,gameplay.currentPlayer());
                takenSquareTracker.push(3);
                break;
            case 'cell5':
                if (takenSquareTracker.includes(4)) break;
                gameBoard.updateGameStatus(4,gameplay.currentPlayer());
                takenSquareTracker.push(4);
                break;
            case 'cell6':
                if (takenSquareTracker.includes(5)) break;
                gameBoard.updateGameStatus(5,gameplay.currentPlayer());
                takenSquareTracker.push(5);
                break;
            case 'cell7':
                if (takenSquareTracker.includes(6)) break;
                gameBoard.updateGameStatus(6,gameplay.currentPlayer());
                takenSquareTracker.push(6);
                break;
            case 'cell8':
                if (takenSquareTracker.includes(7)) break;
                gameBoard.updateGameStatus(7,gameplay.currentPlayer());
                takenSquareTracker.push(7);
                break;
            case 'cell9':
                if (takenSquareTracker.includes(8)) break;
                gameBoard.updateGameStatus(8,gameplay.currentPlayer());
                takenSquareTracker.push(8);
                break;
        }
    });
})

    return{
        currentPlayer,
    }

})();

const player = (name) =>{
    let wins = 0;
return {name, wins};
}
const player1 = player('john doe');
// gameBoard.gameStatus = [1,1,1,1,1,1,1,1,1]
// gameBoard.renderGame([1,1,1,1,1,1,1,1,1]);

// https://www.google.com/search?client=firefox-b-1-d&q=js+change+variable+inside+iife 
// read this ^^^

