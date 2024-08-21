import { Piece } from "./piece.js"

export class Pawn extends Piece {
    constructor (board, isBlack, row, col) {
        super(isBlack)
        this.board = board
        this.row = row
        this.col = col
        this.startRow = row
        this.startCol = col
    }    

    getLabel() {
        return `${this.getColor()} pawn` 
    }

    canMoveTo(startPos, endPos) {
        const rowDif = Math.abs(endPos.row - startPos.row)
        if (this.board.isFreeBetween(startPos, endPos)) {
            if (endPos.col != startPos.col) {
                console.log("pawn cannot switch columns");
                return false
            } else if (rowDif == 1) {
                return true
            } else if (startPos.row == this.startRow && startPos.col == this.startCol && rowDif <= 2) {
                return true
            }
        }
        this.board.commentMove("Invalid move. Try again")
        return false
    }
}
 
export class Rook extends Piece {
    constructor (board, isBlack, row, col) {
        super(isBlack)
        this.board = board
        this.row = row
        this.col = col
    }

    getLabel() {
        return `${this.getColor()} rook` 
    }

    canMoveTo(startPos, endPos) {
        const rowDif = endPos.row - startPos.row
        const colDif = endPos.col - startPos.col
        if (this.board.isFreeBetween(startPos, endPos)) {
            if (rowDif == 0 || colDif == 0) {
                return true
            } else {
                this.board.commentMove("rook can only move straight")
                return false
            }
        }
        this.board.commentMove("Invalid move. Try again")
        return false
    }
}

export class Knight extends Piece {
    constructor (board, isBlack, row, col) {
        super(isBlack)
        this.board = board
        this.row = row
        this.col = col
    }

    getLabel() {
        return `${this.getColor()} knight` 
    }

    canMoveTo(startPos, endPos) {
        const endFigure = this.board.getFigure(endPos.row, endPos.col).pieceObj
        if (endFigure == null) {
            return true
        }
        return false
    }
}

export class Bishop extends Piece {
    constructor (board, isBlack, row, col) {
        super(isBlack)
        this.board = board
        this.row = row
        this.col = col
    }

    getLabel() {
        return `${this.getColor()} bishop` 
    }

    canMoveTo(startPos, endPos) {
        const rowDif = endPos.row - startPos.row
        const colDif = endPos.col - startPos.col
        if (this.board.isFreeBetween(startPos, endPos)) {
            if (rowDif != 0 && colDif != 0) {
                return true
            } else {
                this.board.commentMove("bishop can only move diagonal")
                return false
            }
        }
        this.board.commentMove("Invalid move. Try again")
        return false
    }
}

export class Queen extends Piece {
    constructor (board, isBlack, row, col) {
        super(isBlack)
        this.board = board
        this.row = row
        this.col = col
    }

    getLabel() {
        return `${this.getColor()} queen` 
    }

    canMoveTo(startPos, endPos) {
        if (this.board.isFreeBetween(startPos, endPos)) {
            return true
        }
        return false
    }
}

export class King extends Piece {
    constructor (board, isBlack, row, col) {
        super(isBlack)
        this.board = board
        this.row = row
        this.col = col
    }

    getLabel() {
        return `${this.getColor()} king` 
    }

    canMoveTo(startPos, endPos) {
        if (this.board.isFreeBetween(startPos, endPos)) {
            return true
        }
        return false
    }
}