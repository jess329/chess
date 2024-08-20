import { Piece } from "./piece.js"

export class Pawn extends Piece {
    constructor (board, isBlack, row, col) {
        super(isBlack)
        this.board = board
        this.row = row
        this.col = col
    }    

    getLabel() {
        return `${this.getColor()} pawn` 
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
}