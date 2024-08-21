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
        const colDif = Math.abs(endPos.col - startPos.col)
        const endFigure = this.board.getFigure(endPos.row, endPos.col).pieceObj

        if (this.board.isFreeBetween(startPos, endPos)) {
            if (endPos.col != startPos.col) {
                if (endFigure != null && rowDif == 1 && colDif == 1) {
                    this.board.commentMove("Piece captured with Pawn");
                    return true
                } else {
                    this.board.commentMove("The Pawn cannot switch columns, except when attacking");
                    return false
                }
            } else if (endFigure == null) {
                if (rowDif == 1) {
                   return true
                } else if (startPos.row == this.startRow && startPos.col == this.startCol && rowDif <= 2) {
                   return true
                }
            }
        }
        this.board.commentMove("Invalid Pawn move. Try again")
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
                this.board.commentMove("The Rook can only move straight")
                return false
            }
        }
        this.board.commentMove("Invalid Rook move. Try again")
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
        const rowDif = Math.abs(endPos.row - startPos.row)
        const colDif = Math.abs(endPos.col - startPos.col)
        const endFigure = this.board.getFigure(endPos.row, endPos.col).pieceObj
        if (endFigure == null) {
            if ((rowDif == 2 && colDif == 1) || (rowDif == 1 && colDif == 2)) {
                return true
            } else {
                this.board.commentMove("The Knight can only move in L form. Try again")
                return false
            }
        }
        this.board.commentMove("Invalid Knight move. Try again")
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
        const rowDif = Math.abs(endPos.row - startPos.row)
        const colDif = Math.abs(endPos.col - startPos.col)
        if (this.board.isFreeBetween(startPos, endPos)) {
            if (rowDif != 0 && colDif != 0) {
                return true
            } else {
                this.board.commentMove("The Bishop can only move diagonal. Try again")
                return false
            }
        }
        this.board.commentMove("Invalid Bishop move. Try again")
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
        const rowDif = Math.abs(endPos.row - startPos.row)
        const colDif = Math.abs(endPos.col - startPos.col)
        if (this.board.isFreeBetween(startPos, endPos)) {
            if (rowDif == 0 || colDif == 0 || rowDif == colDif) {
                return true
            } else {
                this.board.commentMove("The Queen can only move straight or diagonal. Try again")
                return false
            }
        }
        this.board.commentMove("Invalid Queen move. Try again")
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
        const endFigure = this.board.getFigure(endPos.row, endPos.col).pieceObj
        const rowDif = Math.abs(endPos.row - startPos.row)
        const colDif = Math.abs(endPos.col - startPos.col)
        if (endFigure != null) {
            if (rowDif <= 1 && colDif <= 1) {
                return true
            } else {
                this.board.commentMove("The King can only move to a field directly next to him. Try again")
                return false
            }
        }
        this.board.commentMove("Invalid King move. Try again")
        return false
    }
}