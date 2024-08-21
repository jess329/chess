import { Board } from "./board.js"
import { Position } from "./position.js"

const posChars = ["a", "b", "c", "d", "e", "f", "g", "h"]
const posNums = ["1", "2", "3", "4", "5", "6", "7", "8"]

class Game {
    constructor() {
        this.gameBoard = new Board()
        this.blackToMove = false
        this.form = document.getElementById("form")
        this.colorComment = document.getElementById("color-comment")
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
        this.gameBoard.commentMove("invalid input. try again (e.g. b2 b3)")
        return null
    }

    // main method that expects input and controls the game
    start() {
        this.gameBoard.initializeBoard()
        this.colorComment.innerText = "white to move"
        
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
    
                if (self.gameBoard.isMoveValid(posFrom, posTo, self.blackToMove)) {
                    self.gameBoard.move(posFrom, posTo)
                    self.blackToMove = !self.blackToMove

                    const colorToMoveStr = self.blackToMove ? "black to move" : "white to move"
                    self.colorComment.innerText = colorToMoveStr
                }
            }
        })
    }
}

const game = new Game()
game.start()