const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const resultElement = document.getElementById('result');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const currentPlayerElement = document.getElementById('currentPlayer');
let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', restartGame);

function handleClick(e) {
    const cell = e.target;
    cell.textContent = currentPlayer;
    cell.style.color = currentPlayer === 'X' ? '#ff7979' : '#f7d794';
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerElement.textContent = currentPlayer;
    }
}

function checkWin(currentPlayer) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

function endGame(draw) {
    gameActive = false;
    if (draw) {
        messageElement.textContent = "It's a draw!";
    } else {
        messageElement.textContent = `${currentPlayer} Wins!`;
    }
    resultElement.style.display = 'block';
}

function restartGame() {
    currentPlayer = 'X';
    currentPlayerElement.textContent = currentPlayer;
    gameActive = true;
    resultElement.style.display = 'none';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = '#fff';
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
}
