

export class Pawn extends Piece {
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

export class Rook extends Piece {
    constructor () {

    }
}

export class Knight extends Piece {
    constructor () {

    }
}

export class Bishop extends Piece {
    constructor () {

    }
}

export class Queen extends Piece {
    constructor () {

    }
}

export class King extends Piece {
    constructor () {

    }
}