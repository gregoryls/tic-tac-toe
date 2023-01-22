
//TODO add ai
 

const gameBoard = (() =>{
    const gameCells = document.querySelectorAll('.cell');
    //start the game with a whitespace character in every cell to keep formatting correct
    let gameStatus = ['\u00A0','\u00A0','\u00A0','\u00A0','\u00A0',
        '\u00A0','\u00A0','\u00A0','\u00A0'];

    let gameOver = false;

    const setGameOverStatus = (bool) =>{
        gameOver = bool;
    }
    
    const renderGame = () =>{
        //populate the board from gameStatus array.  Gets called on every cell being filled.
        for (let i=0; i<9; i++){
            document.querySelector(`#cell${i+1}`).textContent = gameStatus[i];
        }
        
    };
    renderGame();

    const updateGameStatus = (index,newValue) =>{
        //game cells count top left to bottom right, indexed at 0
        gameStatus[index] = newValue;
        renderGame();
        checkGameWin();
    }

    
    const getWinningPositions = () => {
        //returns the current symbols played for each of the 8 winning tictactoe positions
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

        return winningPositions;
    }
    
    
    
    const checkGameWin = () =>{
        //check if gameOver is true to avoid issues during reset
        if (gameOver === true) return;
        const winningPositions = getWinningPositions();
        for (let i =0;i<8;i++){
            //check if a set winning position is all 'X' or 'O' based on current game state, 
            //excluding the blank character
            const win = winningPositions[i].every(token => token === winningPositions[i][0] && token != '\u00A0');
            if (win) {
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
                        for (let j = 0;j<9;j+=3){
                            gameCells[j].classList.add('verticalWin');
                        } break;
                    case 4:
                        for (let j = 1;j<9;j+=3){
                            gameCells[j].classList.add('verticalWin');
                        } break;
                    case 5:
                        for (let j = 2;j<9;j+=3){
                            gameCells[j].classList.add('verticalWin');
                        } break;
                       //diagonal wins 6-7 
                    case 6:
                        for (let j = 0;j<9;j+=4){
                            gameCells[j].classList.add('diagonalWinRight');
                        } break;
                    case 7:
                        for (let j = 2;j<8;j+=2){
                            gameCells[j].classList.add('diagonalWinLeft');
                        } break;
                }                
                if (winningPositions[i][0] === 'X'){
                    player1.wins +=1;
                    document.querySelector('#player1Wins').textContent = player1.wins
                    gameplay.endGameMessage(`${player1.name} wins!`);
                } 
                if (winningPositions[i][0] === 'O'){
                    player2.wins +=1;
                    document.querySelector('#player2Wins').textContent = player2.wins
                    gameplay.endGameMessage(`${player2.name} wins!`);
                } 
                
                
                gameOver = true;
        }

        
    }
        
    }

    const getGameOverStatus = () => gameOver
    
    const restartGame = () => {
        //cells get reset to white space character first when reset button is clicked
        if (gameStatus === ['\u00A0','\u00A0','\u00A0','\u00A0','\u00A0',
        '\u00A0','\u00A0','\u00A0','\u00A0']) gameOver = false;
    }
    const removeVictoryLine = () =>{
        gameCells.forEach(cell => {
            cell.classList.remove('diagonalWinLeft','diagonalWinRight','verticalWin','horizontalWin')
        });
    }
    
    return {
        setGameOverStatus,
        updateGameStatus,
        getGameOverStatus,
        restartGame,
        removeVictoryLine,
    }
})();

const gameplay = (() => {
    let takenSquareTracker = [];
    let currentToken = 'X';
    const currentPlayer = () => {
        //returns the current token to fill in the game cell, then flips current token to the other value
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

    const deleteNode = (parentElementID,index) =>{ 
        //Deletes a child node at given index on the given parent node
        parentNode = document.getElementById(`${parentElementID}`);
        children = parentNode.childNodes;

        //loop removes text nodes, in this case empty whitespace
        for (let i = 0;i<children.length;i++){
            if (children[i].nodeType === 3) children[i].remove();
        }
        //end function if one thing (the reset button) remains in the div
        if (children.length < 2) return; 
        children[index].remove();

    }

    const endGameMessage = (text) => {
        //this function will insert a supplied text string above the reset button, below the game board.
        console.log(text);
        let p = document.createElement('p');
        let resetButton = document.querySelector('#resetGame');
        let parent = resetButton.parentNode;
        p.textContent = text;
        parent.insertBefore(p, resetButton);
    };
    
    //add gameplay-based event listeners to every game cell
    const gameCells = document.querySelectorAll('#board div');
    gameCells.forEach( (currentValue)=>{
    currentValue.addEventListener('click', () =>{
        let gameCell = currentValue.closest('div');

        switch (gameCell.id){
            //cells check if already occupied or if the game has been won before accepting token
            case 'cell1':
                if (takenSquareTracker.includes(0) || gameBoard.getGameOverStatus()) break;
                gameBoard.updateGameStatus(0,currentPlayer());
                takenSquareTracker.push(0);
                //if statement checks for a draw with full board and no win
                if (takenSquareTracker.length === 9 && !gameBoard.getGameOverStatus()) endGameMessage('draw');
                break;
            case 'cell2':
                if (takenSquareTracker.includes(1) || gameBoard.getGameOverStatus()) break;
                gameBoard.updateGameStatus(1,currentPlayer());
                takenSquareTracker.push(1);
                if (takenSquareTracker.length === 9 && !gameBoard.getGameOverStatus()) endGameMessage('draw');
                break;
            case 'cell3':
                if (takenSquareTracker.includes(2) || gameBoard.getGameOverStatus()) break;
                gameBoard.updateGameStatus(2,currentPlayer());
                takenSquareTracker.push(2);
                if (takenSquareTracker.length === 9 && !gameBoard.getGameOverStatus()) endGameMessage('draw');
                break;
            case 'cell4':
                if (takenSquareTracker.includes(3) || gameBoard.getGameOverStatus()) break;
                gameBoard.updateGameStatus(3,currentPlayer());
                takenSquareTracker.push(3);
                if (takenSquareTracker.length === 9 && !gameBoard.getGameOverStatus()) endGameMessage('draw');
                break;
            case 'cell5':
                if (takenSquareTracker.includes(4) || gameBoard.getGameOverStatus()) break;
                gameBoard.updateGameStatus(4,currentPlayer());
                takenSquareTracker.push(4);
                if (takenSquareTracker.length === 9 && !gameBoard.getGameOverStatus()) endGameMessage('draw');
                break;
            case 'cell6':
                if (takenSquareTracker.includes(5) || gameBoard.getGameOverStatus()) break;
                gameBoard.updateGameStatus(5,currentPlayer());
                takenSquareTracker.push(5);
                if (takenSquareTracker.length === 9 && !gameBoard.getGameOverStatus()) endGameMessage('draw');
                break;
            case 'cell7':
                if (takenSquareTracker.includes(6) || gameBoard.getGameOverStatus()) break;
                gameBoard.updateGameStatus(6,currentPlayer());
                takenSquareTracker.push(6);
                if (takenSquareTracker.length === 9 && !gameBoard.getGameOverStatus()) endGameMessage('draw');
                break;
            case 'cell8':
                if (takenSquareTracker.includes(7) || gameBoard.getGameOverStatus()) break;
                gameBoard.updateGameStatus(7,currentPlayer());
                takenSquareTracker.push(7);
                if (takenSquareTracker.length === 9 && !gameBoard.getGameOverStatus()) endGameMessage('draw');
                break;
            case 'cell9':
                if (takenSquareTracker.includes(8) || gameBoard.getGameOverStatus()) break;
                gameBoard.updateGameStatus(8,currentPlayer());
                takenSquareTracker.push(8);
                if (takenSquareTracker.length === 9 && !gameBoard.getGameOverStatus()) endGameMessage('draw');
                break;
        }
    });
})

    return{
        resetTakenSquareTraker,
        setCurrentToken,
        deleteNode,
        endGameMessage,
        
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
        gameplay.deleteNode('resetDiv',0);
        
       
        //TODO consider if there are less 'cheatable' ways to reset
        //the tracker and token.
    })
})();

//Factory for creating player objects, number is for player number, 1 or 2
const player = (name,number) =>{
    const setPlayerName = function (playerNumber) {
        document.querySelector(`#player${playerNumber}Name`).textContent = this.name;
        
    }
    let wins = 0;
    this.number = number;
return {name, number, wins, setPlayerName,};
}
//Initialize the two player objects
const player1 = player('Player 1',1);
const player2 = player('Player 2',2);

const playerSetup = (() => {
    //set default usernames
    player1.setPlayerName(1);
    player2.setPlayerName(2);
    //allow players to change their displayed name
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
    //create a modal that contains general help information on playing the game
    const openModalButton = document.querySelector('#helpModal');
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');

    const removeClass = (element,className) =>{
        element.classList.remove(className);
    }

    const addClass = (element,className) =>{
        element.classList.add(className);
    }
    //overlay provides a semi-transparent blur behind the modal to help focus attention on modal
    //when the overlay background is clicked anywhere, the modal regains the hidden class and disappears
    overlay.addEventListener('click', ()=>{
        addClass(modal,'hidden');
        addClass(overlay,'hidden');
    });

    openModalButton.addEventListener('click',()=> {
        removeClass(modal,'hidden');
        removeClass(overlay,'hidden');
    });
})();