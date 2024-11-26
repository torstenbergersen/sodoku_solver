const sudokuGrid = document.body.querySelector(".sudoku-grid");

// fisher-yates shuffle
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]]; // swap
    }
    return array;
};

const solveVisualizer = async () => {
    const cells = sudokuGrid.children;
    // convert grid into a 2D array
    const newGrid = [];
    for (let i = 0; i < cells.length; i += 9) {
        newGrid.push(
            Array.from({ length: 9 }, (_, j) => cells[i + j].textContent || "")
        );
    }

    // utility function for delay
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // backtracking function with animation
    const backtrack = async (r, c) => {
        if (r === 9) {
            return true; // solved
        }

        const nextR = c === 8 ? r + 1 : r;
        const nextC = (c + 1) % 9;

        if (newGrid[r][c] !== "") {
            return await backtrack(nextR, nextC); // skip filled cells
        }

        for (let num = 1; num <= 9; num++) {
            if (isValid(r, c, num)) {
                // visualize placing the number
                newGrid[r][c] = num;
                cells[r * 9 + c].textContent = num;
                cells[r * 9 + c].classList.add("active");
                await delay(100); // pause for 100ms
                cells[r * 9 + c].classList.remove("active");

                if (await backtrack(nextR, nextC)) {
                    return true;
                }

                // visualize backtracking
                newGrid[r][c] = "";
                cells[r * 9 + c].textContent = "";
                cells[r * 9 + c].classList.add("backtracking");
                await delay(100); // pause for 100ms
                cells[r * 9 + c].classList.remove("backtracking");
            }
        }

        return false; // no solution
    };

    const isValid = (r, c, num) => {
        for (let i = 0; i < 9; i++) {
            if (
                newGrid[r][i] == num || // row
                newGrid[i][c] == num || // column
                newGrid[Math.floor(r / 3) * 3 + Math.floor(i / 3)][
                    Math.floor(c / 3) * 3 + (i % 3)
                ] == num // sub-grid
            ) {
                return false;
            }
        }
        return true;
    };

    await backtrack(0, 0);
};

const sudokuSolver = (grid) => {
    const newGrid = [];
    for (let i = 0; i < grid.length; i += 9) {
        newGrid.push(grid.slice(i, i + 9));
    }

    let solutions = 0;

    const backtrack = (r, c) => {
        if (r === 9) {
            solutions++;
            return;
        }

        const nextR = c === 8 ? r + 1 : r;
        const nextC = (c + 1) % 9;

        if (newGrid[r][c] !== "") {
            backtrack(nextR, nextC);
        } else {
            for (let num = 1; num <= 9; num++) {
                if (isValid(r, c, num)) {
                    newGrid[r][c] = num;
                    backtrack(nextR, nextC);
                    newGrid[r][c] = ""; // backtrack
                }

                if (solutions > 1) return; // stop early if more than one solution
            }
        }
    };

    const isValid = (r, c, num) => {
        for (let i = 0; i < 9; i++) {
            if (
                newGrid[r][i] == num || // row
                newGrid[i][c] == num || // column
                newGrid[Math.floor(r / 3) * 3 + Math.floor(i / 3)][
                    Math.floor(c / 3) * 3 + (i % 3)
                ] == num // sub-grid
            ) {
                return false;
            }
        }
        return true;
    };

    backtrack(0, 0);
    return solutions;
};

const createPuzzle = () => {
    const rows = {};
    const columns = {};
    const subGrids = {};
    for (let i = 0; i < 9; i++) {
        rows[i] = new Set();
        columns[i] = new Set();
        subGrids[i] = new Set();
    }

    sudokuGrid.innerHTML = "";
    for (let i = 0; i < 81; i++) {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.textContent = "";
        sudokuGrid.appendChild(cellDiv);
    }
    const cells = sudokuGrid.children;

    // generate full grid
    const fillGrid = (i) => {
        if (i === 81) {
            return true;
        }
        let cell = cells[i];
        let row = Math.floor(i / 9);
        let column = i % 9;
        let subGrid = Math.floor(row / 3) * 3 + Math.floor(column / 3);

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

        return false;
    };

    fillGrid(0);

    const cluesCount = 36;
    let cellsToRemove = 81 - cluesCount;

    // remove cells to create puzzle
    let indices = shuffle(Array.from({ length: 81 }, (_, i) => i));
    while (cellsToRemove > 0 && indices.length > 0) {
        let i = indices.pop();
        let cell = cells[i];
        let num = parseInt(cell.textContent);
        if (isNaN(num)) {
            continue;
        }
        let row = Math.floor(i / 9);
        let column = i % 9;
        let subGrid = Math.floor(row / 3) * 3 + Math.floor(column / 3);

        rows[row].delete(num);
        columns[column].delete(num);
        subGrids[subGrid].delete(num);
        cell.textContent = "";
        const currentGrid = Array.from(
            sudokuGrid.children,
            (cell) => cell.textContent
        );

        if (sudokuSolver(currentGrid) !== 1) {
            rows[row].add(num);
            columns[column].add(num);
            subGrids[subGrid].add(num);
            cell.textContent = num;
        } else {
            cellsToRemove--;
        }
    }
};

function refreshPage() {
    window.location.reload();
}

const newPuzzle = document.body.querySelector("#new-puzzle");
newPuzzle.addEventListener("click", () => {
    createPuzzle();
});

const solve = document.body.querySelector("#solve-puzzle");
solve.addEventListener("click", () => {
    solveVisualizer();
});

const reset = document.body.querySelector("#reset");
reset.addEventListener("click", () => {
    refreshPage();
});

createPuzzle();
