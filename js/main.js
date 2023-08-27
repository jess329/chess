
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
    const allSquares = [...document.querySelectorAll(".white, .black")]
    
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
    // console.log(squares);
    return squares
}

let clickedSquares = []

// const updateBoard = (squaresArr) => {
    const squaresArr = createSquaresArr()
    squaresArr.forEach(square => {
        // console.log(square.element)
        square.element.addEventListener("click", () => {

            // saving history of clicked squares in an array
            clickedSquares.push(square)
            console.log(clickedSquares)
            
            // updating class of the active square
            squaresArr.forEach(square => {
                square.element.classList.remove("active")
            })
            square.element.classList.add("active")
            
            // move piece to current square if there is a piece on the last square
            let lastClickedSquare = clickedSquares[clickedSquares.length - 2]
            if(lastClickedSquare.piece && !square.occupied) {
                // console.log(lastClickedSquare);
                movePiece(lastClickedSquare, square)
            }
            
        })
            
    })
// }



const movePiece = (currentSquare, nextSquare) => {
    // console.log(currentSquare, nextSquare)
    gameStarted = true
    const squares = createSquaresArr()
    // if(!nextSquare.occupied) {
        const newBoard = []
        for(let square of squares) {
            let copyOfSquare = {...square}
            if(square.element === currentSquare.element) {
                copyOfSquare.occupied = false
                copyOfSquare.piece = null
                copyOfSquare.pieceElement = null
                copyOfSquare.playerColor = null
                console.log(copyOfSquare)

                newBoard.push(copyOfSquare)
            } else if(square.element === nextSquare.element) {
                copyOfSquare.occupied = true
                copyOfSquare.piece = currentSquare.piece
                copyOfSquare.pieceElement = currentSquare.pieceElement
                copyOfSquare.playerColor = currentSquare.playerColor
                console.log(copyOfSquare)

                newBoard.push(copyOfSquare)
            } else {
                newBoard.push(copyOfSquare)
            }
        }

        console.log(newBoard);
        boardStateHistory.push(newBoard)
        updateUI(newBoard)

    // }
        // nextSquare.element.appendChild(currentSquare.pieceElement)

        // nextSquare.occupied = true
        // nextSquare.piece = currentSquare.piece
        // nextSquare.pieceElement = currentSquare.pieceElement
        // nextSquare.playerColor = currentSquare.playerColor

        // currentSquare.occupied = false
        // currentSquare.piece = null
        // currentSquare.pieceElement = null
        // currentSquare.playerColor = null
        
        // const newBoardState = [...squares]
        // boardStateHistory.push(newBoardState)
        // console.log(squares)

        // return [currentSquare, nextSquare]
    // updateSquareInfo(currentSquare, nextSquare)
}

const flipBoard = () => {

    // array in which the data of the flipped board will be pushed into
    const squares = createSquaresArr()
    const flippedBoard = []
    console.log(squares)
    for (let square of squares) {
        let copyOfSquare = {...square}
        for (let newSquare of squares) {
            if(square.rowFlipped == newSquare.row && square.colFlipped == newSquare.col) {
                copyOfSquare.row = newSquare.rowFlipped
                copyOfSquare.col = newSquare.colFlipped
                copyOfSquare.rowFlipped = newSquare.row
                copyOfSquare.colFlipped = newSquare.col

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

