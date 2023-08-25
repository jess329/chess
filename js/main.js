
const allSquares = [...document.querySelectorAll(".white, .black")]
const pieces = [...document.querySelectorAll(".player-white, .player-black")]
const flipButton = document.getElementsByClassName("flip")[0]
let chessboardStarter = []
let chessboardState = []
let boardStateHistory = []
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

let squares = allSquares.map((square) => {
    const index = allSquares.indexOf(square)
    const current = boardState[index]
    // every element is made to an object that holds the html element of the square, the color and the value
    // the values are generated in the boardState above
    square = {
        element: square, 
        squareColor: square.classList.value, 
        row: current.row, 
        col: current.col,
        rowFlipped: 9 - current.row,
        colFlipped: 9 - current.col,
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
chessboardState = squares


let clickedSquares = []

squares.forEach(square => {
    // console.log(square.element)
    square.element.addEventListener("click", () => {
        chessboardState = squares

        // saving history of clicked squares in an array
        clickedSquares.push(square)
        
        // updating class of the active square
        squares.forEach(square => {
            square.element.classList.remove("active")
        })
        square.element.classList.add("active")
        
        // move piece to current square if there is a piece on the last square
        let lastClickedSquare = clickedSquares[clickedSquares.length - 2]
        if(lastClickedSquare.piece) {
            const newState = movePiece(lastClickedSquare, square)
            // console.log(newState);
            square = newState[1]
            let oldSquare = squares.find(oldSquare => oldSquare === newState[0])
            
        }
        
        
        // if(square.occupied) {
            //     console.log(`player: ${square.playerColor}, ${square.piece}`);
            // }
    })
        flipButton.onclick = () => {
            const newState = flipBoard()
            squares = newState
        }
})

const movePiece = (currentSquare, nextSquare) => {
    console.log(currentSquare, nextSquare)
    gameStarted = true
    if(!nextSquare.occupied) {
        nextSquare.element.appendChild(currentSquare.pieceElement)

        nextSquare.occupied = true
        nextSquare.piece = currentSquare.piece
        nextSquare.pieceElement = currentSquare.pieceElement
        nextSquare.playerColor = currentSquare.playerColor

        currentSquare.occupied = false
        currentSquare.piece = null
        currentSquare.pieceElement = null
        currentSquare.playerColor = null
        
        const newBoardState = [squares]
        boardStateHistory.push(newBoardState)

        return [currentSquare, nextSquare]
    }
    // updateSquareInfo(currentSquare, nextSquare)
}




const flipBoard = () => {
    console.log(chessboardState);
    let newSquares = squares.map((square) => {
        let flippedSquare = chessboardState.find(newSquare => {
            return newSquare.row === square.rowFlipped && newSquare.col === square.colFlipped 
        })
        console.log(flippedSquare)
        square.element.appendChild(flippedSquare.pieceElement) 

        square.occupied = flippedSquare.occupied
        square.pieceElement = flippedSquare.pieceElement
        square.piece = flippedSquare.piece
        square.playerColor = flippedSquare.playerColor

        // square.row = flippedSquare.row
        // square.col = flippedSquare.col
        // square.rowFlipped = flippedSquare.rowFlipped
        // square.colFlipped = flippedSquare.colFlipped

        return square

        // console.log(`${square.row}, ${square.col} -> ${flippedSquare.row}, ${flippedSquare.col}`);
        // const flippedSquares = updateFlippedSquares(square, flippedSquare)

    })
    return newSquares
}

const updateFlippedSquares = (oldSquare, newSquare) => {
    newSquare.element.appendChild(oldSquare.pieceElement)
    oldSquare.element.appendChild(newSquare.pieceElement)

    newSquare.pieceElement = oldSquare.pieceElement
    oldSquare.pieceElement = newSquare.pieceElement

    newSquare.playerColor = oldSquare.playerColor
    oldSquare.playerColor = newSquare.playerColor

    newSquare.row = oldSquare.row
    newSquare.col = oldSquare.col
    oldSquare.row = newSquare.row
    oldSquare.col = newSquare.col

    newSquare.rowFlipped = oldSquare.rowFlipped
    newSquare.colFlipped = oldSquare.colFlipped
    oldSquare.rowFlipped = newSquare.rowFlipped
    oldSquare.colFlipped = newSquare.colFlipped

    return [oldSquare, newSquare]
}
