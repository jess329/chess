// import { Pawn, Rook, Bishop, Knight, King, Queen } from "./pieces.js"

const ROWS = 9
const COLS = 9
const colChars = ["A", "B", "C", "D", "E", "F", "G", "H"]
const posChars = ["a", "b", "c", "d", "e", "f", "g", "h"]
const posNums = ["1", "2", "3", "4", "5", "6", "7", "8"]
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
    
    // split the string START_LAYOUT into an array with 8 elements (rows) that each have 8 elements  
    splitLayoutStr() {
        let arr = START_LAYOUT.split("/")
        for (let i = 0; i < 8; i++) {
            const row = arr[i]
            arr[i] = row.split("")
        }
        return arr
    }

    // draw the marks the side of the board 
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
    
    // create the actual html elements for each square with the right class (9x9 for the marks on the side)
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

    // set the html elements for the chess pieces on the board
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

    // create a logical copy of the board in which the class objects for every piece
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
                    squareObj.pieceObj = new Pawn(this, true, 2, col + 1)
                }
                if (row == 6) {
                    squareObj.pieceObj = new Pawn(this, false, 7, col + 1)
                }
                this.boardLayout[row][col] = squareObj
            }
        }
        // black pieces
        this.boardLayout[0][0].pieceObj = new Rook(this, true, 1, 1)
        this.boardLayout[0][1].pieceObj = new Knight(this, true, 1, 2)
        this.boardLayout[0][2].pieceObj = new Bishop(this, true, 1, 3)
        this.boardLayout[0][3].pieceObj = new Queen(this, true, 1, 4)
        this.boardLayout[0][4].pieceObj = new King(this, true, 1, 5)
        this.boardLayout[0][5].pieceObj = new Bishop(this, true, 1, 6)
        this.boardLayout[0][6].pieceObj = new Knight(this, true, 1, 7)
        this.boardLayout[0][7].pieceObj = new Rook(this, true, 1, 8)

        // white pieces
        this.boardLayout[7][0].pieceObj = new Rook(this, false, 8, 1)
        this.boardLayout[7][1].pieceObj = new Knight(this, false, 8, 2)
        this.boardLayout[7][2].pieceObj = new Bishop(this, false, 8, 3)
        this.boardLayout[7][3].pieceObj = new King(this, false, 8, 4)
        this.boardLayout[7][4].pieceObj = new Queen(this, false, 8, 5)
        this.boardLayout[7][5].pieceObj = new Bishop(this, false, 8, 6)
        this.boardLayout[7][6].pieceObj = new Knight(this, false, 8, 7)
        this.boardLayout[7][7].pieceObj = new Rook(this, false, 8, 8)

        console.log(this.boardLayout);
    }

    // this method is called at the beginning of the game in  
    initializeBoard() {
        this.createBoardSquares()
        this.setPositionMarks()
        this.setInitialPieces()
        this.setBoardLayout()
    }

    // get Square with the passed row & column from the boardLayout array
    getFigure(row, col) {
        if (row >= 1 && row <= 8 && col >= 1 && col <= 8) {
            return this.boardLayout[row - 1][col - 1]
        } else {
            console.log("input for row and column are not valid");
            return null
        } 
    }

    updateBoardLayout(startSquare, endSquare) {
        endSquare.pieceHTML = startSquare.pieceHTML
        endSquare.pieceObj = startSquare.pieceObj
        startSquare.pieceHTML = ""
        startSquare.pieceObj = null
        // console.log(this.boardLayout);
    }
    
    isMoveValid(posFrom, posTo) {
        const startSquare = this.getFigure(posFrom.row, posFrom.col).pieceObj
        const endSquare = this.getFigure(posTo.row, posTo.col).pieceObj

        // return boolean for the validation of the passed move
        if (startSquare != null && endSquare == null) {
            return true
        } else if (startSquare == null) {
            console.log("there is no piece on the starting square");
            return false
        } else if (startSquare != null && endSquare != null) {
            console.log("the destination square is not free");
            return false
        }
        return false
    }

    move(posFrom, posTo) {
        const allSquares = [...document.querySelectorAll(".white, .black")]
        const startSquare = this.getFigure(posFrom.row, posFrom.col)
        const endSquare = this.getFigure(posTo.row, posTo.col)

        // check if move is valid and move the starting piece to the new position
        if (this.isMoveValid(posFrom, posTo)) {
            console.log(`move ${posFrom.str} to ${posTo.str} is valid`);
            allSquares[(startSquare.row * 8) + startSquare.col].innerHTML = ""
            allSquares[(endSquare.row * 8) + endSquare.col].innerHTML = startSquare.pieceHTML

            // update boardLayout array
            this.updateBoardLayout(startSquare, endSquare)
        }
    }
}

class Piece {
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
    constructor (board, isBlack, row, col) {
        super(isBlack)
        this.board = board
        this.row = row
        this.col = col
    }    
}
 
class Rook extends Piece {
    constructor (board, isBlack, row, col) {
        super(isBlack)
        this.board = board
        this.row = row
        this.col = col
    }
}

class Knight extends Piece {
    constructor (board, isBlack, row, col) {
        super(isBlack)
        this.board = board
        this.row = row
        this.col = col
    }
}

class Bishop extends Piece {
    constructor (board, isBlack, row, col) {
        super(isBlack)
        this.board = board
        this.row = row
        this.col = col
    }
}

class Queen extends Piece {
    constructor (board, isBlack, row, col) {
        super(isBlack)
        this.board = board
        this.row = row
        this.col = col
    }
}

class King extends Piece {
    constructor (board, isBlack, row, col) {
        super(isBlack)
        this.board = board
        this.row = row
        this.col = col
    }
}

class Position {
    constructor (str) {
        this.str = str
        this.strArr = str.split("")
        this.getRow()
        this.getColumn()
    }

    getColumn() {
        this.col = this.strArr[0].charCodeAt(0) - 96                
    }
    getRow() {
        this.row = parseInt(this.strArr[1], 10)
    }
}

class Game {
    constructor() {
        this.gameBoard = new Board()
        this.blacktoMove = false
        this.form = document.getElementById("form")
    }

    // split input string and check if it contains two valid positions otherwise return null
    splitInput(input) {
        const inputArr = input.split(/\s+/).filter(Boolean)
        const firstStr = inputArr[0].toLowerCase()
        const secondStr = inputArr[1].toLowerCase()

        if (inputArr.length == 2 && firstStr.length == 2 && secondStr.length == 2) {
            // console.log("length is correct");
            if (posChars.includes(firstStr[0]) && posNums.includes(firstStr[1]) && 
                posChars.includes(secondStr[0]) && posNums.includes(secondStr[1])) {
                    return inputArr
                }
        }
        console.log("invalid input. try again")
        return null
    }

    start() {
        this.gameBoard.initializeBoard()

        
        const self = this
        this.form.addEventListener("submit", function(event) {
            event.preventDefault()
            
            let inputField = document.getElementById("move-input")
            const inputStr = inputField.value
            inputField.value = ""
            const inputArr = self.splitInput(inputStr)
            if (inputArr != null) {
                const posFrom = new Position(inputArr[0])
                const posTo = new Position(inputArr[1])
    
                self.gameBoard.move(posFrom, posTo)
            }
        })
    }
}

const game = new Game()
game.start()

 

