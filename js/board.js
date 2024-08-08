const ROWS = 9
const COLS = 9
const colChars = ["A", "B", "C", "D", "E", "F", "G", "H"]
const START_LAYOUT = "RNBQKBNR/PPPPPPPP/********/********/********/********/pppppppp/rnbkqbnr"
const PIECES_HTML = {
    "R": "♜",
    "N": "♞",
    "B": "♝",
    "K": "♚",
    "Q": "♛",
    "P": "♟",
    "r": "♖",
    "n": "♘",
    "b": "♗",
    "k": "♔",
    "q": "♕",
    "p": "♙",
    "*": ""
}
// upper case -> black figures
// lower case -> white figures

class Board {
    constructor() {
        this.board = document.querySelector(".board")
        this.boardLayout = []
        this.rows = ROWS
        this.cols = COLS
    }
    
    splitLayoutStr() {
        let arr = START_LAYOUT.split("/")
        for (let i = 0; i < 8; i++) {
            const row = arr[i]
            arr[i] = row.split("")
        }
        return arr
    }

    setPositionMarks() {
        const allSquares = [...document.querySelectorAll(".white, .black, .posMark")]
        for (let c = 1; c < this.cols; c++) {
            const square = allSquares[c]
            square.innerHTML = colChars[c - 1] 
        }
        for (let c = 9; c < 73; c += 9) {
            const square = allSquares[c]
            square.innerHTML = c / 9 
        }
    }
    
    createBoardLayout() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.boardLayout.push({
                    row: row, 
                    col: col,
                })
                
                const square = document.createElement("div")
                if (row != 0 && col != 0) {
                    square.className = (row + col) % 2 == 0 ? "black" : "white"
                } else {
                    square.className = "posMark"
                }
                this.board.appendChild(square)
            }
        }
    }

    setInitialPieces() {
        const boardArr = this.splitLayoutStr()  
        const allSquares = [...document.querySelectorAll(".white, .black")]
        for (let i = 0; i < 8; i++) {
            const blackPieceStr = boardArr[0][i]
            const whitePieceStr = boardArr[7][i]

            allSquares[i].innerHTML = PIECES_HTML[blackPieceStr]
            allSquares[8 + i].innerHTML = PIECES_HTML["P"]
            allSquares[48 + i].innerHTML = PIECES_HTML["p"]
            allSquares[56 + i].innerHTML = PIECES_HTML[whitePieceStr]
        }
    }

    initializeBoard() {
        this.createBoardLayout()
        this.setPositionMarks()
        this.setInitialPieces()
    }



    makeMove(fromSquare, toSquare) {

        // making copies from the old and new square
        const copyOfFromSquare = {...fromSquare}
        const copyOfToSquare = {...toSquare}
        // const newBoard = []

        // the array of all squares is mapped and the two squares modified
        const newBoard = this.squares.map(square => {
            if(square.row === fromSquare.row && square.col === fromSquare.col) {

                // the modifiable properties of the new square are copied to the old square
                square.occupied = copyOfToSquare.occupied
                square.piece = copyOfToSquare.piece
                square.pieceElement = copyOfToSquare.pieceElement
                square.playerColor = copyOfToSquare.playerColor
            } else if(square.row === toSquare.row && square.col === toSquare.col) {

                // the modifiable properties of the old square are copied to the new square
                square.occupied = copyOfFromSquare.occupied
                square.piece = copyOfFromSquare.piece
                square.pieceElement = copyOfFromSquare.pieceElement
                square.playerColor = copyOfFromSquare.playerColor
            }
            return square
        })
        this.squares = [...newBoard]


        this.updateUI()
        // console.log(this.squares)
    }

    updateUI() {
        // the whole html of the squares is removed and written new
        this.board.innerHTML = ""

        // the array of all squares is ran through and the square elements with the new positions of the pieces are generated
        this.squares.forEach(square => {
            const squareElement = square.element

            if(square.occupied) {
                const pieceElement = square.pieceElement

                squareElement.appendChild(pieceElement)
            }

            this.board.appendChild(squareElement)
        })

        // console.log(this.squares)
    }
    

    restart() {
        const initialBoard = []
        for (let initialSquare of this.squares) {
            const copyOfSquare = {...initialSquare}
            const square = this.squares.find(square => {
                return square.pieceElement == initialSquare.initial.pieceElement
            })

            copyOfSquare.occupied = square.occupied
            copyOfSquare.piece = square.piece
            copyOfSquare.pieceElement = square.pieceElement
            copyOfSquare.playerColor = square.playerColor

            initialBoard.push(copyOfSquare)
        }

        this.squares = [...initialBoard]
        this.updateUI()
    }   
    
}


class Game {
    constructor() {
        this.gameBoard = new Board()
        this.gameStarted = false
    }

    start() {
        this.gameBoard.initializeBoard()
    }

}

const game = new Game()
game.start()
 

