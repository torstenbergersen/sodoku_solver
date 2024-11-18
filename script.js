const sudokuGrid = document.body.querySelector(".sudoku-grid");

for (let i = 0; i < 81; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = "#";
    sudokuGrid.appendChild(cell);
}
