
const allSquares = [...document.querySelectorAll(".white, .black")]
const pieces = [...document.querySelectorAll(".player-white, .player-black")]
let chessboardStarter = []
let chessboardState = []
let gameStarted = false

const rows = 8
const cols = 8
let boardState = []
for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= cols; col++) {
        boardState.push({
            row: row, 
            col: col,
        })

    }
}

const squares = allSquares.map((square) => {
    const index = allSquares.indexOf(square)
    const current = boardState[index]
    // every element is made to an object that holds the html element of the square, the color and the value
    // the values are generated in the boardState above
    square = {
        element: square, 
        squareColor: square.classList.value, 
        row: current.row, 
        col: current.col,
        occupied: false,
        piece: null,
        pieceElement: null,
        playerColor: null,
    }

    pieces.map((piece) => {
        if(piece.parentNode === square.element) {
            square.occupied = true
            square.piece = piece.classList[1].split("-")[2]
            square.pieceElement = piece
            square.playerColor = piece.classList[2].split("-")[1]
        }
    })

    return square
})
console.log(squares);

if(!gameStarted) chessboardStarter = squares

let clickedSquares = []

squares.forEach(square => {
    // console.log(square.element)
    square.element.addEventListener("click", () => {

        // saving history of clicked squares in an array
        clickedSquares.push(square)
        console.log(clickedSquares)

        // updating class of the active square
        squares.forEach(square => {
            square.element.classList.remove("active")
        })
        square.element.classList.add("active")

        // move piece to current square if there is a piece on the last square
        let lastClickedSquare = clickedSquares[clickedSquares.length - 2]
        if(lastClickedSquare.piece) {
            movePiece(lastClickedSquare, square)
        }


        if(square.occupied) {
            console.log(`player: ${square.playerColor}, ${square.piece}`);
        }
    })
})

const movePiece = (currentSquare, nextSquare) => {
    console.log(currentSquare, nextSquare)
    if(!nextSquare.occupied) {
        nextSquare.element.appendChild(currentSquare.pieceElement)
    }
    updateSquareInfo(currentSquare, nextSquare)
}

const updateSquareInfo = (lastSquare, newSquare) => {
    newSquare.occupied = true
    newSquare.piece = current.piece
    newSquare.pieceElement = current.pieceElement
    newSquare.playerColor = current.playerColor

    lastSquare.occupied = false
    lastSquare.piece = null
    lastSquare.pieceElement = null
    lastSquare.playerColor = null
}

