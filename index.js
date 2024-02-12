// https://www.geeksforgeeks.org/gaussian-elimination/

// This program solves a system of linear equations using Gaussian Elimination with partial pivoting
const MAXN = 100;
 
// Function to perform partial pivoting on the matrix A
function partial_pivot(A, n) {
    for (let i = 0; i < n; i++) {
        let pivot_row = i;
        // Find the row with the largest absolute value in the ith column
        for (let j = i + 1; j < n; j++) {
            if (Math.abs(A[j][i]) > Math.abs(A[pivot_row][i])) {
                pivot_row = j;
            }
        }
        // Swap rows if necessary
        if (pivot_row != i) {
            for (let j = i; j <= n; j++) {
                [A[i][j], A[pivot_row][j]] = [A[pivot_row][j], A[i][j]];
            }
        }
        // Perform Gaussian Elimination on the matrix
        for (let j = i + 1; j < n; j++) {
            let factor = A[j][i] / A[i][i];
            for (let k = i; k <= n; k++) {
                A[j][k] -= factor * A[i][k];
            }
        }
    }
}
 
// Function to perform back substitution on the matrix A to find the solution vector x
function back_substitute(A, n, x) {
    for (let i = n - 1; i >= 0; i--) {
        let sum = 0;
        for (let j = i + 1; j < n; j++) {
            sum += A[i][j] * x[j];
        }
        x[i] = (A[i][n] - sum) / A[i][i];
    }
}

document.getElementById("RowsSlider").addEventListener("input", () => {
    document.getElementById("RowsText").textContent = document.getElementById("RowsSlider").value;
});

document.getElementById("ColsSlider").addEventListener("input", () => {
    document.getElementById("ColsText").textContent = document.getElementById("ColsSlider").value;
});

let m = 2;
let n = 3;

function createMatrix() {
    m = document.getElementById("RowsText").textContent;
    n = document.getElementById("ColsText").textContent;
    const MatrixHolder = document.getElementById("MatrixHolder");
    MatrixHolder.innerHTML = '';
    for (let i = 0; i < m; ++i) {
        const row = document.createElement("div");
        for (let j = 0; j < n; ++j) {
            const box = document.createElement("span");
            box.innerHTML = `
                <input type="number" value="0" size="4" autocomplete="off" id="${i*n+j}"/>
            `;
            row.appendChild(box);
        }
        MatrixHolder.appendChild(row);
    }
    document.getElementById("SolveButton").classList.remove("invisible");
}

// Calls the relevant functions by Geeksforgeeks.
function solve() {
    const SolutionHolder = document.getElementById("SolutionHolder");
    SolutionHolder.innerHTML = `
        <h3> Solution to the given ${m}x${n} matrix: </h3>
    `;
    let A = [];
    for (let i = 0; i < m; ++i) {
        A[i] = [];
        for (let j = 0; j < n; ++j) {
            A[i][j] = Number(document.getElementById(`${i*n+j}`).value);
            console.log(Number.isInteger(A[i][j]))
        }
    }
    let x = Array(m);
    partial_pivot(A, m);
    back_substitute(A, m, x);
    for (let i = 0; i < m; ++i) {
        const box = document.createElement("div");
        box.innerHTML = `
            <input type="text" value="${x[i]}" size="6" autocomplete="off" disabled/>
        `;
        SolutionHolder.appendChild(box);
    }
    console.log(x);
    SolutionHolder.classList.remove("invisible");
}

