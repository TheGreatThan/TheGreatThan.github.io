document.addEventListener('DOMContentLoaded', function () {
    const gridSize = 9;
    const solveButton = document.getElementById("solve-btn");
    const resetButton = document.getElementById("reset-btn");
    
    solveButton.addEventListener('click', solveSudoku);
    resetButton.addEventListener('click', resetSudokuGrid);

    const sudokuGrid = document.getElementById("sudoku-grid");
    // Create the sudoku grid and input cells
    for (let row = 0; row < gridSize; row++) {
        const newRow = document.createElement("tr");
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.className = "cell";
            input.id = `cell-${row}-${col}`;
            
            // Clear value on click
            input.addEventListener('click', () => {
                input.value = '';
            });

            // Input validation for numbers 1-9
            input.addEventListener('input', () => {
                if (input.value < 1 || input.value > 9) {
                    input.value = '';
                }
            });

            cell.appendChild(input);
            newRow.appendChild(cell);
        }
        sudokuGrid.appendChild(newRow);
    }
});

async function solveSudoku() {
    const gridSize = 9;
    const sudokuArray = [];

    // Fill the sudokuArray with input values from the grid
    for (let row = 0; row < gridSize; row++) {
        sudokuArray[row] = [];
        for (let col = 0; col < gridSize; col++) {
            const cellId = `cell-${row}-${col}`;
            const cellValue = document.getElementById(cellId).value;
            sudokuArray[row][col] = cellValue !== "" ? parseInt(cellValue) : 0;
        }
    }

    // Identify user-input cells and mark them
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cellId = `cell-${row}-${col}`;
            const cell = document.getElementById(cellId);

            if (sudokuArray[row][col] !== 0) {
                cell.classList.add("user-input");
            }
        }
    }

    // Solve the sudoku and display the solution
    if (solveSudokuHelper(sudokuArray)) {
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const cellId = `cell-${row}-${col}`;
                const cell = document.getElementById(cellId);

                // Fill in solved values and apply animation
                if (!cell.classList.contains("user-input")) {
                    cell.value = sudokuArray[row][col];
                    cell.classList.add("solved");
                    await sleep(20); // Add a delay for visualization
                }
            }
        }
    } else {
        alert("U so dumb can't even make a puzzle haiya.");
    }
}

function solveSudokuHelper(board) {
    const gridSize = 9;

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValidMove(board, row, col, num)) {
                        board[row][col] = num;

                        // Hack the game :super_cool_face:
                        if (solveSudokuHelper(board)) {
                            return true; // Mastered at the game
                        }

                        board[row][col] = 0; // Backtrack
                    }
                }
                return false; // Perhaps none are good
            }
        }
    }

    return true; // Good2go
}

function isValidMove(board, row, col, num) {
    const gridSize = 9;

    // Check row and column for the imposter
    for (let i = 0; i < gridSize; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false; // Conflict found
        }
    }

    // Check the 3*3 subgrid for any 'two-timers'
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === num) {
                return false; // That means we're f*k
            }
        }
    }

    return true; // We're good to go
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function resetSudokuGrid() {
    const gridSize = 9;
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cellId = `cell-${row}-${col}`;
            const cell = document.getElementById(cellId);
            cell.value = '';
            cell.classList.remove("user-input", "solved");
        }
    }
}

const curser = document.querySelector(".curser");
document.addEventListener('mousemove', function(e){
  let X = e.clientX;
  let Y = e.clientY;

  curser.style.left = X + "px";
  curser.style.top = Y + "px";
});

document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.createElement('div');
    cursor.id = 'cursor';
    document.body.appendChild(cursor);
  
    let timeoutId;
  
    const resetCursorTimeout = () => {
      cursor.style.opacity = '1'; // Show the cursor
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        cursor.style.opacity = '0'; // Hide the cursor
      }, 3000); // 3 seconds
    };
  
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.pageX}px`;
      cursor.style.top = `${e.pageY}px`;
      resetCursorTimeout();
    });
  
    const interactableClasses = ['interactable', 'toggle-btn', 'hidden'];
  
    interactableClasses.forEach(className => {
        const elements = document.querySelectorAll(`.${className}`);
  
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('interacting');
            });
  
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('interacting');
            });
        });
    });
});

const nav = document.querySelector("#navArea");
const btn = document.querySelector(".toggle-btn");
const mask = document.querySelector("#mask");

btn.onclick = () => {
    nav.classList.toggle("open");
};

mask.onclick = () => {
    nav.classList.toggle("open");
};