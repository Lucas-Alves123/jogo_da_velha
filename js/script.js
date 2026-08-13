document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const cells = document.querySelectorAll('.cell');
    const boardElement = document.getElementById('board');
    const currentTurnEl = document.getElementById('current-turn');
    const gameOverMessage = document.getElementById('game-over-message');
    const resultText = document.getElementById('result-text');
    const newGameBtn = document.getElementById('new-game-btn');
    const resetScoreBtn = document.getElementById('reset-score-btn');
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    const scoreXEl = document.getElementById('score-x');
    const scoreOEl = document.getElementById('score-o');
    const scoreDrawsEl = document.getElementById('score-draws');
    
    // Game State
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    
    // Scores
    let scores = {
        X: 0,
        O: 0,
        Draws: 0
    };
    
    // Winning Combinations
    const winConditions = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left col
        [1, 4, 7], // Middle col
        [2, 5, 8], // Right col
        [0, 4, 8], // Diagonal 1
        [2, 4, 6]  // Diagonal 2
    ];

    // Initialize Game
    init();

    function init() {
        loadPreferences();
        updateScoreDisplay();
        setupEventListeners();
        updateTurnIndicator();
    }

    function setupEventListeners() {
        cells.forEach(cell => {
            cell.addEventListener('click', () => handleCellClick(cell));
            cell.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCellClick(cell);
                }
            });
        });

        newGameBtn.addEventListener('click', resetGame);
        resetScoreBtn.addEventListener('click', resetScores);
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    function handleCellClick(cell) {
        const index = cell.getAttribute('data-index');

        if (board[index] !== '' || !gameActive) {
            return;
        }

        placeSymbol(cell, index);
        checkWinOrDraw();
    }

    function placeSymbol(cell, index) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
        cell.setAttribute('aria-label', `Cell ${index}, ${currentPlayer}`);
    }

    function checkWinOrDraw() {
        let roundWon = false;
        let winningCells = [];

        for (let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                winningCells = [a, b, c];
                break;
            }
        }

        if (roundWon) {
            handleWin(winningCells);
            return;
        }

        if (!board.includes('')) {
            handleDraw();
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateTurnIndicator();
    }

    function handleWin(winningCells) {
        gameActive = false;
        scores[currentPlayer]++;
        saveScores();
        updateScoreDisplay();
        
        // Highlight winning cells
        winningCells.forEach(index => {
            cells[index].classList.add('win');
        });
        
        // Disable remaining empty cells
        cells.forEach(cell => {
            if (!cell.textContent) {
                cell.setAttribute('disabled', 'true');
            }
        });

        boardElement.removeAttribute('data-turn');

        // Show Result
        resultText.textContent = `${currentPlayer} VENCEU!`;
        resultText.className = '';
        resultText.classList.add(`win-${currentPlayer.toLowerCase()}`);
        gameOverMessage.classList.remove('hidden');
    }

    function handleDraw() {
        gameActive = false;
        scores.Draws++;
        saveScores();
        updateScoreDisplay();
        
        boardElement.classList.add('draw');
        boardElement.removeAttribute('data-turn');
        
        // Disable remaining empty cells (though none should exist)
        cells.forEach(cell => {
            if (!cell.textContent) {
                cell.setAttribute('disabled', 'true');
            }
        });
        
        resultText.textContent = 'EMPATE!';
        resultText.className = '';
        resultText.classList.add('draw-text');
        gameOverMessage.classList.remove('hidden');
    }

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        
        cells.forEach((cell, index) => {
            cell.textContent = '';
            cell.className = 'cell';
            cell.removeAttribute('disabled');
            cell.setAttribute('aria-label', `Cell ${index}, empty`);
        });
        
        boardElement.classList.remove('draw');
        gameOverMessage.classList.add('hidden');
        
        updateTurnIndicator();
    }

    function updateTurnIndicator() {
        currentTurnEl.textContent = currentPlayer;
        currentTurnEl.className = `turn-${currentPlayer.toLowerCase()}`;
        if (gameActive) {
            boardElement.setAttribute('data-turn', currentPlayer);
        }
    }

    function resetScores() {
        scores = { X: 0, O: 0, Draws: 0 };
        saveScores();
        updateScoreDisplay();
    }

    function updateScoreDisplay() {
        scoreXEl.textContent = scores.X;
        scoreOEl.textContent = scores.O;
        scoreDrawsEl.textContent = scores.Draws;
    }

    function saveScores() {
        localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
    }

    function loadPreferences() {
        // Load Scores
        const savedScores = localStorage.getItem('ticTacToeScores');
        if (savedScores) {
            scores = JSON.parse(savedScores);
        }
        
        // Load Theme
        const savedTheme = localStorage.getItem('ticTacToeTheme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }

    function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('ticTacToeTheme', newTheme);
    }
});
