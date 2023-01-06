//TODO button event listeners to open and close modal, probably in it's own iife
//TODO add logic for a drawn game!!!

const gameBoard = (() =>{
    const gameCells = document.querySelectorAll('.cell');
    console.log(gameCells)
    let gameStatus = ['\u00A0','\u00A0','\u00A0','\u00A0','\u00A0',
        '\u00A0','\u00A0','\u00A0','\u00A0'];

    let gameOver = false;

    const setGameOverStatus = (bool) =>{
        gameOver = bool;
    }
    
    const renderGame = () =>{
        
        for (let i=0; i<9; i++){
            document.querySelector(`#cell${i+1}`).textContent = gameStatus[i];
        }
        
    };
    renderGame();
    const updateGameStatus = (index,newValue) =>{
        gameStatus[index] = newValue;
        renderGame();
        //check if game is won function goes here
    }

    
    const getWinningPositions = () => {
        const winningPositions = [
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

        // console.log(gameStatus)
        // console.log(winningPositions);
        return winningPositions;
    }
    
    
    
    const checkGameWin = () =>{
        
        const winningPositions = getWinningPositions();
        for (let i =0;i<8;i++){
            //check if a set winning position is all 'X' or 'O' excluding the blank character
            const win2 = winningPositions[i].every(token => token === winningPositions[i][0] && token != '\u00A0');
            //change to 'win' when fully working
            if (win2) {
                 //switch statement adds css class to apply 'victory' line over appropriate cells.
                switch (i){
                    //horizontal wins 0-2
                    case 0:
                        for (let j = 0;j<3;j++){
                            gameCells[j].classList.add('horizontalWin');
                        } break;
                    case 1:
                        for (let j = 3;j<6;j++){
                            gameCells[j].classList.add('horizontalWin');
                        } break;
                    case 2:
                        for (let j = 6;j<9;j++){
                            gameCells[j].classList.add('horizontalWin');
                        } break;
                    //vertical wins 3-5
                    case 3:
                        for (let j = 0;j<8;j+=3){
                            gameCells[j].classList.add('verticalWin');
                        } break;
                    case 4:
                        for (let j = 1;j<8;j+=3){
                            gameCells[j].classList.add('verticalWin');
                        } break;
                    case 5:
                        for (let j = 2;j<8;j+=3){
                            gameCells[j].classList.add('verticalWin');
                        } break;
                       //diagonal wins 6-7 
                    case 6:
                        for (let j = 0;j<8;j+=4){
                            gameCells[j].classList.add('diagonalWin');
                        } break;
                    case 7:
                        for (let j = 2;j<8;j+=2){
                            gameCells[j].classList.add('diagonalWin');
                        } break;
                }                
                if (winningPositions[i][0] === 'X'){
                    player1.wins +=1;
                    document.querySelector('#player1Wins').textContent = player1.wins
                } 
                if (winningPositions[i][0] === 'O'){
                    player2.wins +=1;
                    document.querySelector('#player2Wins').textContent = player2.wins
                } 
                console.log('yay');
                // console.log(win);
                gameOver = true;
        }

        
    }
        
    }

    const getGameOverStatus = () => gameOver
    
    const restartGame = () => {
        if (gameStatus === ['\u00A0','\u00A0','\u00A0','\u00A0','\u00A0',
        '\u00A0','\u00A0','\u00A0','\u00A0']) gameOver = false;
    }
    const removeVictoryLine = () =>{
        gameCells.forEach(cell => {
            cell.classList.remove('diagonalWin','verticalWin','horizontalWin')
        });
    }
    
    return {
        setGameOverStatus,
        renderGame,
        updateGameStatus,
        getWinningPositions,
        checkGameWin,
        getGameOverStatus,
        restartGame,
        removeVictoryLine,
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
    const setCurrentToken = (token) =>{
        currentToken = token;
    }
    const resetTakenSquareTraker = () =>{
        takenSquareTracker = [];
    }
    const gametest = document.querySelectorAll('#board div');

    gametest.forEach( (currentValue)=>{
    currentValue.addEventListener('click', () =>{
        let gameCell = currentValue.closest('div');
        console.log(gameCell.id);

        switch (gameCell.id){
            //cells check if already occupied or if the game has been won before accepting token
            case 'cell1':
                if (takenSquareTracker.includes(0) || gameBoard.getGameOverStatus()) break;
                gameBoard.updateGameStatus(0,gameplay.currentPlayer());
                takenSquareTracker.push(0);
                gameBoard.checkGameWin();
                //if statement checks for a draw with full board and no win
                if (takenSquareTracker.length === 9 && !gameBoard.getGameOverStatus()) {
                    console.log('draw');
                    let drawP = document.createElement('p');
                    let resetButton = document.querySelector('#resetGame');
                    let parent = resetButton.parentNode;
                    drawP.textContent = 'Draw';
                    parent.insertBefore(drawP, resetButton);
// TODO change reset dive to flex/grid for vert alignment, 
//append draw text to p, remove p on reset

                };
                break;
            case 'cell2':
                if (takenSquareTracker.includes(1) || gameBoard.getGameOverStatus()) break;
                gameBoard.updateGameStatus(1,gameplay.currentPlayer());
                takenSquareTracker.push(1);
                gameBoard.checkGameWin();
                break;
            case 'cell3':
                if (takenSquareTracker.includes(2) || gameBoard.getGameOverStatus()) break;
                gameBoard.updateGameStatus(2,gameplay.currentPlayer());
                takenSquareTracker.push(2);
                gameBoard.checkGameWin();
                break;
            case 'cell4':
                if (takenSquareTracker.includes(3) || gameBoard.getGameOverStatus()) break;
                gameBoard.updateGameStatus(3,gameplay.currentPlayer());
                takenSquareTracker.push(3);
                gameBoard.checkGameWin();
                break;
            case 'cell5':
                if (takenSquareTracker.includes(4) || gameBoard.getGameOverStatus()) break;
                gameBoard.updateGameStatus(4,gameplay.currentPlayer());
                takenSquareTracker.push(4);
                gameBoard.checkGameWin();
                break;
            case 'cell6':
                if (takenSquareTracker.includes(5) || gameBoard.getGameOverStatus()) break;
                gameBoard.updateGameStatus(5,gameplay.currentPlayer());
                takenSquareTracker.push(5);
                gameBoard.checkGameWin();
                break;
            case 'cell7':
                if (takenSquareTracker.includes(6) || gameBoard.getGameOverStatus()) break;
                gameBoard.updateGameStatus(6,gameplay.currentPlayer());
                takenSquareTracker.push(6);
                gameBoard.checkGameWin();
                break;
            case 'cell8':
                if (takenSquareTracker.includes(7) || gameBoard.getGameOverStatus()) break;
                gameBoard.updateGameStatus(7,gameplay.currentPlayer());
                takenSquareTracker.push(7);
                gameBoard.checkGameWin();
                break;
            case 'cell9':
                if (takenSquareTracker.includes(8) || gameBoard.getGameOverStatus()) break;
                gameBoard.updateGameStatus(8,gameplay.currentPlayer());
                takenSquareTracker.push(8);
                gameBoard.checkGameWin();
                break;
        }
    });
})

    return{
        currentPlayer,
        resetTakenSquareTraker,
        setCurrentToken,
        takenSquareTracker, //testing, remove later;
    }

})();

const resetGame = (()=>{
    //resets the board with whitespace characters
    const resetCells = ()=>{
        for (let i = 0;i<9;i++){
            gameBoard.updateGameStatus(i,'\u00A0')
        }
    }
    document.querySelector('#resetGame').addEventListener('click',()=>{
        resetCells();
        gameplay.setCurrentToken('X');
        gameplay.resetTakenSquareTraker();
        gameBoard.removeVictoryLine();
        gameBoard.setGameOverStatus(false);
        gameBoard.restartGame();
       
        //TODO consider if there are less 'cheatable' ways to reset
        //the tracker and token.
    })
})();

const player = (name,number) =>{
    const setPlayerName = function (playerNumber) {
        document.querySelector(`#player${playerNumber}Name`).textContent = this.name;
        
    }
    let wins = 0;
    this.number = number;
return {name, number, wins, setPlayerName,};
}
//TODO consider wrapping this up inside somewhere else
const player1 = player('john doe',1);

const player2 = player('jane doe',2);

// gameBoard.gameStatus = [1,1,1,1,1,1,1,1,1]
// gameBoard.renderGame([1,1,1,1,1,1,1,1,1]);
const playerSetup = (() => {
    player1.setPlayerName(1);
    player2.setPlayerName(2);
    const userName = (player) =>{
        let tempName = player.name;
        player.name = prompt('Please Enter your name','Josh Gunson');
        //prevent player name from disappearing by using previous name
        if (player.name === null) player.name = tempName;
        player.setPlayerName(player.number);
    }
    document.querySelector('#player1Name').addEventListener('click',() =>{
        userName(player1)
    });
    document.querySelector('#player2Name').addEventListener('click',() =>{
        userName(player2)
    });
})();


const helpModal = (()=>{
    const openModalButton = document.querySelector('#helpModal');
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');

    const removeClass = (element,className) =>{
        element.classList.remove(className);
    }

    const addClass = (element,className) =>{
        element.classList.add(className);
    }

    overlay.addEventListener('click', ()=>{
        addClass(modal,'hidden');
        addClass(overlay,'hidden');
    });

    openModalButton.addEventListener('click',()=> {
        removeClass(modal,'hidden');
        removeClass(overlay,'hidden');
    });
})();