document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusDisplay = document.getElementById("status");
    const restartButton = document.getElementById("restart");

    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

        if (board[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        handleResultValidation();
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] === "" || board[b] === "" || board[c] === "") {
                continue;
            }
            if (board[a] === board[b] && board[b] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusDisplay.textContent = `Gracz ${currentPlayer} wygrywa!`;
            gameActive = false;
            return;
        }

        if (!board.includes("")) {
            statusDisplay.textContent = "Remis!";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    function handleRestartGame() {
        currentPlayer = "X";
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        statusDisplay.textContent = "";
        cells.forEach(cell => (cell.textContent = ""));
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartButton.addEventListener("click", handleRestartGame);

    let gameActive = true;
});
