export class Position {
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
