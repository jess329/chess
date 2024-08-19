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
                    pieceObj: null
                }
                if (row == 1) {
                    squareObj.pieceObj = new Pawn(this, true)
                }
                if (row == 6) {
                    squareObj.pieceObj = new Pawn(this, false)
                }
                this.boardLayout[row][col] = squareObj
            }
        }
        // black pieces
        this.boardLayout[0][0].pieceObj = new Rook(this, true)
        this.boardLayout[0][1].pieceObj = new Knight(this, true)
        this.boardLayout[0][2].pieceObj = new Bishop(this, true)
        this.boardLayout[0][3].pieceObj = new Queen(this, true)
        this.boardLayout[0][4].pieceObj = new King(this, true)
        this.boardLayout[0][5].pieceObj = new Bishop(this, true)
        this.boardLayout[0][6].pieceObj = new Knight(this, true)
        this.boardLayout[0][7].pieceObj = new Rook(this, true)

        // white pieces
        this.boardLayout[7][0].pieceObj = new Rook(this, false)
        this.boardLayout[7][1].pieceObj = new Knight(this, false)
        this.boardLayout[7][2].pieceObj = new Bishop(this, false)
        this.boardLayout[7][3].pieceObj = new King(this, false)
        this.boardLayout[7][4].pieceObj = new Queen(this, false)
        this.boardLayout[7][5].pieceObj = new Bishop(this, false)
        this.boardLayout[7][6].pieceObj = new Knight(this, false)
        this.boardLayout[7][7].pieceObj = new Rook(this, false)

        console.log(this.boardLayout);
    }

    initializeBoard() {
        this.createBoardSquares()
        this.setPositionMarks()
        this.setInitialPieces()
        this.setBoardLayout()
    }

    getFigure(row, col) {
        if (row >= 1 && row <= 8 && col >= 1 && col <= 8) {
            return this.boardLayout[row - 1][col - 1]
        } else {
            console.log("input for row and column are not valid");
            return null
        } 
    }
    
}

class Piece {
    // #isBlack
    constructor (isBlack) {
        this.isBlack = isBlack
    }

    getBlack() {
        return this.isBlack
    }
    setBlack(isBlack) {
        this.isBlack = isBlack
    }
}

class Pawn extends Piece {
    constructor (board, isBlack) {
        super(isBlack)
        this.board = board
    }    
}
 
class Rook extends Piece {
    constructor (board, isBlack) {
        super(isBlack)
        this.board = board
    }
}

class Knight extends Piece {
    constructor (board, isBlack) {
        super(isBlack)
        this.board = board
    }
}

class Bishop extends Piece {
    constructor (board, isBlack) {
        super(isBlack)
        this.board = board
    }
}

class Queen extends Piece {
    constructor (board, isBlack) {
        super(isBlack)
        this.board = board
    }
}

class King extends Piece {
    constructor (board, isBlack) {
        super(isBlack)
        this.board = board
    }
}

class Position {
    constructor (str) {
        this.strArr = str.split("")
        this.getRow()
        this.getColumn()
    }

    getRow() {
        this.row = this.strArr[0].charCodeAt(0) - 96                
    }
    getColumn() {
        this.col = parseInt(this.strArr[1], 10)
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
        return inputArr
    }

    start() {
        this.gameBoard.initializeBoard()

        
        const self = this
        this.form.addEventListener("submit", function(event) {
            event.preventDefault()
            
            const inputStr = document.getElementById("move-input").value
            const inputArr = self.splitInput(inputStr)
            const posFrom = new Position(inputArr[0])
            const posTo = new Position(inputArr[1])
            console.log(inputArr, posFrom, posTo);

            const fig = self.gameBoard.getFigure(posFrom.row, posFrom.col)
            if (fig != null) {
                console.log(fig.pieceObj);
            }
        })
    }
}

const game = new Game()
game.start()

 

