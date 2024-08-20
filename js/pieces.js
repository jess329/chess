import { Piece } from "./piece.js"

export class Pawn extends Piece {
    constructor (board, isBlack, row, col) {
        super(isBlack)
        this.board = board
        this.row = row
        this.col = col
    }    
}
 
export class Rook extends Piece {
    constructor (board, isBlack, row, col) {
        super(isBlack)
        this.board = board
        this.row = row
        this.col = col
    }
}

export class Knight extends Piece {
    constructor (board, isBlack, row, col) {
        super(isBlack)
        this.board = board
        this.row = row
        this.col = col
    }
}

export class Bishop extends Piece {
    constructor (board, isBlack, row, col) {
        super(isBlack)
        this.board = board
        this.row = row
        this.col = col
    }
}

export class Queen extends Piece {
    constructor (board, isBlack, row, col) {
        super(isBlack)
        this.board = board
        this.row = row
        this.col = col
    }
}

export class King extends Piece {
    constructor (board, isBlack, row, col) {
        super(isBlack)
        this.board = board
        this.row = row
        this.col = col
    }
}