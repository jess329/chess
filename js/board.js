// import { Pawn, Rook, Bishop, Knight, King, Queen } from "./pieces.js"

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
        this.boardHTML = document.querySelector(".board")
        this.boardStringArr = this.splitLayoutStr() 
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
    
    createBoardSquares() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const square = document.createElement("div")
                if (row != 0 && col != 0) {
                    square.className = (row + col) % 2 == 0 ? "black" : "white"
                } else {
                    square.className = "posMark"
                }
                this.boardHTML.appendChild(square)
            }
        }
    }

    setInitialPieces() {
        const allSquares = [...document.querySelectorAll(".white, .black")]
        for (let i = 0; i < 8; i++) {
            const blackPieceStr = this.boardStringArr[0][i]
            const whitePieceStr = this.boardStringArr[7][i]

            allSquares[i].innerHTML = PIECES_HTML[blackPieceStr]
            allSquares[8 + i].innerHTML = PIECES_HTML["P"]
            allSquares[48 + i].innerHTML = PIECES_HTML["p"]
            allSquares[56 + i].innerHTML = PIECES_HTML[whitePieceStr]
        }
    }

    setBoardLayout() {
        for (let row = 0; row < 8; row++) {
            this.boardLayout[row] = []
            for (let col = 0; col < 8; col++) {
                let squareObj = {
                    row: row,
                    col: col,
                    pieceHTML: PIECES_HTML[this.boardStringArr[row][col]],
                }
                if (row == 1) {
                    squareObj[pieceObj] = new Pawn(this, true)
                }
                if (row == 7) {
                    squareObj[pieceObj] = new Pawn(this, false)
                }
                this.boardLayout[row][col] = squareObj
            }
        }


        console.log(this.boardLayout);
    }

    initializeBoard() {
        this.createBoardSquares()
        this.setPositionMarks()
        this.setInitialPieces()
        this.setBoardLayout()
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

class Piece {
    
}

class Pawn extends Piece {
    #isBlack
    constructor (board, isBlack) {
        this.#isBlack = setBlack(isBlack);
        this.board = board
    }

    getBlack() {
        return this.#isBlack
    }
    setBlack(isBlack) {
        this.#isBlack = isBlack
    }
}
 
class Rook extends Piece {
    constructor () {

    }
}

class Knight extends Piece {
    constructor () {

    }
}

class Bishop extends Piece {
    constructor () {

    }
}

class Queen extends Piece {
    constructor () {

    }
}

class King extends Piece {
    constructor () {

    }
}

class Game {
    constructor() {
        this.gameBoard = new Board()
        this.gameStarted = false
        this.form = document.getElementById("form")
    }

    splitInput(input) {
        const inputArr = input.split(/\s+/).filter(Boolean)
        console.log(inputArr);
    }

    start() {
        this.gameBoard.initializeBoard()

        this.form.addEventListener("submit", function(event) {
            event.preventDefault()

            const inputStr = document.getElementById("move-input").value
            this.splitInput(inputStr)
        })
    }
}

const game = new Game()
game.start()

 

