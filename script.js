const createSodokuGrid = () => {
    //   const sodoku = getElementById(sodokuGrid);

    let rows = Array.from({ length: 9 }, () => new Set());
    let cols = Array.from({ length: 9 }, () => new Set());
    let boxes = Array.from({ length: 9 }, () => new Set());

    let grid = Array.from({ length: 9 }, () => Array(9).fill(null));

    function fillGrid(row, col) {
        // base case
        if (row === 9) return true;

        // calculate next cell coordinates
        let nextRow = col === 8 ? row + 1 : row;
        let nextCol = (col + 1) % 9;

        // try placing numbers 1 through 9 in random order
        let numbers = Array.from({ length: 9 }, (_, i) => i + 1).sort(
            () => Math.random() - 0.5
        );
        for (let value of numbers) {
            if (isValid(value, row, col)) {
                let boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);

                // place value
                grid[row][col] = value;
                rows[row].add(value);
                cols[col].add(value);
                boxes[boxIndex].add(value);

                // recurse to next cell
                if (fillGrid(nextRow, nextCol)) return true;

                // backtrack if it fails
                grid[row][col] = null;
                rows[row].delete(value);
                cols[col].delete(value);
                boxes[boxIndex].delete(value);
            }
        }
        return false;
    }
    // helper function for ensuring validity
    function isValid(value, r, c) {
        let boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);
        return (
            !rows[r].has(value) &&
            !cols[c].has(value) &&
            !boxes[boxIndex].has(value)
        );
    }

    fillGrid(0, 0);

    for (let i = 0; i < 9; i++) {
        console.log(grid[i]);
    }
    return grid;
};

createSodokuGrid();
