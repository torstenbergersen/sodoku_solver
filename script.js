const sudokuGrid = document.body.querySelector(".sudoku-grid");
for (let i = 0; i < 81; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = "";
    sudokuGrid.appendChild(cell);
}
// checks for solvability and uniqueness
function solver() {}

const createGrid = () => {
    // three sets for row column and square units, remove used number from each set at each step in creating grid (constraint propogation)
    // would need 9 sets for each row, column, and square
    // feasible to make 27 sets?

    // how to iterate throught he cells?

    let cells = sudokuGrid.children;
    for (let i = 0; i < cells.length; i++) {
        let cellInstance = cells[i];
        cellInstance.textContent = Math.floor(Math.random() * (9 - 1) + 1);
    }
};

const newPuzzle = document.body.querySelector("#new-puzzle");
newPuzzle.addEventListener("click", () => {
    createGrid();
});

// visualizes solving algorithm within grid
function solverVisualizer() {}

createGrid();
