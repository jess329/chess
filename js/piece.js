export class Piece {
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