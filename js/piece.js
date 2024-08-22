export class Piece {
    constructor (isBlack) {
        this.isBlack = isBlack
    }

    getColor() {
        const color = this.isBlack ? "Black" : "White"
        return color
    }

    getBlack() {
        return this.isBlack
    }
    setBlack(isBlack) {
        this.isBlack = isBlack
    }
}