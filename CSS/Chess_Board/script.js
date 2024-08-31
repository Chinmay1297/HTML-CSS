const chessboard = document.querySelector(".chessboard");


for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
        let cell = document.createElement("div");
        if ((row + col) % 2 == 0) {
            cell.classList.add("white");
        }
        else {
            cell.classList.add("black");
        }

        if (row == 7) {
            let span = document.createElement("span");
            span.textContent = col + 1;
            cell.appendChild(span);
        }
        chessboard.appendChild(cell);
    }
}