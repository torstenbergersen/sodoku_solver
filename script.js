const sudokuGrid = document.body.querySelector(".sudoku-grid");

// populate grid with empty cells
for (let i = 0; i < 81; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = "";
    sudokuGrid.appendChild(cell);
}

// checks for solvability and uniqueness
function solver() {}

const createGrid = () => {};

const newPuzzle = document.body.querySelector("#new-puzzle");
newPuzzle.addEventListener("click", () => {
    createGrid();
});

// visualizes solving algorithm within grid
function solverVisualizer() {}

createGrid();
