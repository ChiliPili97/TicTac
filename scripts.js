const PLAYER_X_CLASS = 'x'
const PLAYER_0_CLASS = 'circle'
const WINNING_COMBINATIONS = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], 
[0, 3, 6], [1, 4, 7], [2, 5, 8],
[0, 4, 8], [2, 4, 6] ]

const cellElemnts = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
const valueXTextElement = document.getElementById('valueX')
const value0TextElement = document.getElementById('value0')
let player0Score = 0
let playerXScore = 0

let isPlayer_0_Turn = false
 
startGame()

restartButton.addEventListener('click', startGame)

function startGame () {
    isPlayer_0_Turn = false
    cellElemnts.forEach(cell => {
        cell.classList.remove(PLAYER_X_CLASS)
        cell.classList.remove(PLAYER_0_CLASS)
        cell.removeEventListener('click', handleCellClick)
        cell.addEventListener('click', handleCellClick ,{once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleCellClick(e){
    const currentPlayer = isPlayer_0_Turn ? PLAYER_0_CLASS : PLAYER_X_CLASS
    const cell = e.target
    placeMark(cell, currentPlayer)
    if(checkWin(currentPlayer)){
        updateScore()
        endGame(false)
    }
    else if (isDraw()){
        endGame(true)
    }
    else{
        swapTurns()
        setBoardHoverClass()
    }   
}

function placeMark(cell, currentPlayer){
    cell.classList.add(currentPlayer)
}

function checkWin(currentPlayer){
    return WINNING_COMBINATIONS.some(combination =>{
        return combination.every(index =>{
            return cellElemnts[index].classList.contains(currentPlayer)
        })
    })
}

function isDraw(){
    return [...cellElemnts].every(cell => {
        return cell.classList.contains(PLAYER_0_CLASS) || cell.classList.contains(PLAYER_X_CLASS)
    })
}

function endGame(draw){
    draw ? winningMessageTextElement.innerText = "It's a draw" 
    : winningMessageTextElement.innerText = `Player with ${isPlayer_0_Turn ? "0" : "X" } wins!`
    winningMessageElement.classList.add('show')
}

function updateScore(){
    if(isPlayer_0_Turn){
        player0Score++
        value0TextElement.innerText = `${player0Score}`
    } 
    else{
        playerXScore++
        valueXTextElement.innerText = `${playerXScore}`
    }
    console.log(player0Score)
    console.log(playerXScore)
}

function swapTurns(){
    isPlayer_0_Turn = !isPlayer_0_Turn
}

function setBoardHoverClass(){
    boardElement.classList.remove(PLAYER_X_CLASS)
    boardElement.classList.remove(PLAYER_0_CLASS)
    if (isPlayer_0_Turn){
        boardElement.classList.add(PLAYER_0_CLASS)
    }
    else{
        boardElement.classList.add(PLAYER_X_CLASS)
    }
}
