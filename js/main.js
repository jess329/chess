
const allSquares = [...document.querySelectorAll(".white, .black")]
const pieces = [...document.querySelectorAll(".player-white, .player-black")]
const flipButton = document.getElementsByClassName("flip")[0]
const board = document.getElementsByClassName("board")[0]
let chessboardStarter = []
let chessboardState = []
let boardStateHistory = []
let gameStarted = false

const rows = 8
const cols = 8

const createRowsCols = () => {
    const boardLayout = []
    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= cols; col++) {
            boardLayout.push({
                row: row, 
                col: col,
            })
        }
    }
    return boardLayout
}
let boardState = createRowsCols()

const createSquaresArr = () => {
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
    boardStateHistory.push(squares)
    console.log(squares);
}

createSquaresArr()
console.log(boardStateHistory[boardStateHistory.length - 1]);
let squares = boardStateHistory[boardStateHistory.length - 1]
if(!gameStarted) chessboardStarter = squares
// chessboardState = squares


let clickedSquares = []

const updateBoard = (squaresArr) => {
    squaresArr.forEach(square => {
        // console.log(square.element)
        square.element.addEventListener("click", () => {

            // saving history of clicked squares in an array
            clickedSquares.push(square)
            
            // updating class of the active square
            squaresArr.forEach(square => {
                square.element.classList.remove("active")
            })
            square.element.classList.add("active")
            
            // move piece to current square if there is a piece on the last square
            let lastClickedSquare = clickedSquares[clickedSquares.length - 2]
            if(lastClickedSquare.piece) {
                const newState = movePiece(lastClickedSquare, square)
            }
            
        })
            
    })
}
updateBoard(squares)


const movePiece = (currentSquare, nextSquare) => {
    // console.log(currentSquare, nextSquare)
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
        
        const newBoardState = [...squares]
        boardStateHistory.push(newBoardState)
        console.log(squares)

        return [currentSquare, nextSquare]
    }
    // updateSquareInfo(currentSquare, nextSquare)
}

const flipBoard = () => {

    // array in which the data of the flipped board will be pushed into
    const flippedBoard = []
    console.log(squares)
    for (let square of squares) {
        let copyOfSquare = {...square}
        for (let newSquare of squares) {
            if(square.rowFlipped == newSquare.row && square.colFlipped == newSquare.col) {

                copyOfSquare.occupied = newSquare.occupied
                copyOfSquare.pieceElement = newSquare.pieceElement
                copyOfSquare.piece = newSquare.piece
                copyOfSquare.playerColor = newSquare.playerColor

                flippedBoard.push(copyOfSquare)
            }
        }
    }

    console.log(flippedBoard)
    boardStateHistory.push(flippedBoard)

    // call the updateUI function with the flippedBoard passed in, which then updates the cleares the UI and updates it
    updateUI(flippedBoard)

}

const updateUI = (newBoard) => {
    board.innerHTML = ""

    newBoard.forEach(square => {
        const squareElement = square.element

        if(square.occupied) {
            const pieceElement = square.pieceElement

            squareElement.appendChild(pieceElement)
        }

        board.appendChild(squareElement)
    })
}

flipButton.onclick = () => {
    flipBoard()
}

