import { Pawn, Rook, Bishop, Knight, King, Queen } from "./pieces.js"

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

export class Board {
    constructor() {
        this.boardHTML = document.querySelector(".board")
        this.boardStringArr = this.splitLayoutStr() 
        this.boardLayout = []
        this.rows = ROWS
        this.cols = COLS
        this.moveComment = document.getElementById("move-comment")

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

    // update the boardLayout array after making a move on the board
    updateBoardLayout(startSquare, endSquare) {
        endSquare.pieceHTML = startSquare.pieceHTML
        endSquare.pieceObj = startSquare.pieceObj
        endSquare.pieceObj.row = endSquare.row + 1
        endSquare.pieceObj.col = endSquare.col + 1
        startSquare.pieceHTML = ""
        startSquare.pieceObj = null
    }
    
    // check if the move with the passed positions is valid 
    isMoveValid(posFrom, posTo, blackToMove) {
        this.moveComment.innerText = ""
        const startSquare = this.getFigure(posFrom.row, posFrom.col).pieceObj
        const endSquare = this.getFigure(posTo.row, posTo.col).pieceObj

        // return boolean for the validation of the passed move
        if (posFrom.equals(posTo)) {
            this.commentMove("Invalid move: start square and destination square cannot be the same")
            return false
        }
        if (startSquare == null) {
            this.commentMove("Invalid move: start square is empty")
            return false
        }
        if (blackToMove != startSquare.isBlack) {
            const colorToMove = blackToMove ? "black" : "white"
            this.commentMove(`Invalid move: ${colorToMove} has the move`)
            return false
        } 

        if (blackToMove == startSquare.isBlack) {
            if (endSquare == null) {
                return true
            } else {
                if (startSquare.isBlack != endSquare.isBlack) {
                    this.commentMove("piece captured")
                    return true
                } else {
                    this.commentMove("Invalid move: piece of the same color on the destination square")
                    return false
                }
            }
        }
    }

    commentMove(str) {
        this.moveComment.innerText = str
    }

    move(posFrom, posTo) {
        const allSquares = [...document.querySelectorAll(".white, .black")]
        const startSquare = this.getFigure(posFrom.row, posFrom.col)
        const endSquare = this.getFigure(posTo.row, posTo.col)

        const isFree = this.isFreeBetween(posFrom, posTo)
        console.log(isFree);

        // check if move is valid and move the starting piece to the new position
        console.log(`move ${posFrom.str} (${startSquare.pieceObj.getLabel()}) to ${posTo.str} is valid`);    
        allSquares[(startSquare.row * 8) + startSquare.col].innerHTML = ""
        allSquares[(endSquare.row * 8) + endSquare.col].innerHTML = startSquare.pieceHTML

        // update boardLayout array
        this.updateBoardLayout(startSquare, endSquare)    
    }

    getFieldsBetween(startPos, endPos) {
        let rowDif = endPos.row - startPos.row
        let colDif = endPos.col - startPos.col
        let fieldsBetween = []

        if (rowDif != 0 && colDif != 0 && Math.abs(rowDif) != Math.abs(colDif)) {
            console.log("direct move not possible");
            return null
        }

        if (rowDif != 0) {
            rowDif = rowDif / Math.abs(rowDif)
        }
        if (colDif != 0) {
            colDif = colDif / Math.abs(colDif)
        }
        let row = startPos.row + rowDif
        let col = startPos.col + colDif

        while (row != endPos.row || col != endPos.col) {
            fieldsBetween.push(this.getFigure(row, col))
            row += rowDif
            col += colDif
        }

        console.log(fieldsBetween);
        return fieldsBetween
    }

    isFreeBetween(startPos, endPos) {
        const fieldsBetween = this.getFieldsBetween(startPos, endPos)
        for (let square of fieldsBetween) {
            if (square.pieceObj != null) {
                return false
            }
        }
        return true
    }
}