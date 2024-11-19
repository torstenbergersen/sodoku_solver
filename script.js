const sudokuGrid = document.body.querySelector(".sudoku-grid");

// checks for solvability and uniqueness
function solver() {}

const createGrid = () => {
    sudokuGrid.innerHTML = "";
    for (let i = 0; i < 81; i++) {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.textContent = "";
        sudokuGrid.appendChild(cellDiv);
    }
    let cells = sudokuGrid.children;

    for (let i = 0; i < 81; i++) {
        cells[i].textContent = "";
    }

    const rows = {};
    const columns = {};
    const subGrids = {};
    for (let i = 0; i < 9; i++) {
        rows[i] = new Set();
        columns[i] = new Set();
        subGrids[i] = new Set();
    }

    // backtrack to fill grid
    function fillGrid(i) {
        if (i === 81) {
            return true;
        }
        let cell = cells[i];
        let row = Math.floor(i / 9);
        let column = i % 9;
        let subGrid = Math.floor(row / 3) * 3 + Math.floor(column / 3);

        // fusher-yates shuffle
        const shuffle = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const randomIndex = Math.floor(Math.random() * (i + 1));
                [array[i], array[randomIndex]] = [array[randomIndex], array[i]]; // swap
            }
            return array;
        };

        let numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

        // trying 1-9
        for (let num of numbers) {
            if (
                !rows[row].has(num) &&
                !columns[column].has(num) &&
                !subGrids[subGrid].has(num)
            ) {
                rows[row].add(num);
                columns[column].add(num);
                subGrids[subGrid].add(num);
                cell.textContent = num;

                // recrusively fill next cell
                if (fillGrid(i + 1)) {
                    return true;
                }

                // backtrack
                rows[row].delete(num);
                columns[column].delete(num);
                subGrids[subGrid].delete(num);
                cell.textContent = "";
            }
        }

        // backtrack if no number works
        return false;
    }

    fillGrid(0);
};

const newPuzzle = document.body.querySelector("#new-puzzle");
newPuzzle.addEventListener("click", () => {
    createGrid();
});

// visualizes solving algorithm within grid
function solverVisualizer() {}

createGrid();
