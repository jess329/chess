import { Board } from "./board.js"
import { Position } from "./position.js"

const posChars = ["a", "b", "c", "d", "e", "f", "g", "h"]
const posNums = ["1", "2", "3", "4", "5", "6", "7", "8"]

class Game {
    constructor() {
        this.gameBoard = new Board()
        this.blacktoMove = false
        this.form = document.getElementById("form")
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
        console.log("invalid input. try again")
        return null
    }

    // main method that expects input and controls the game
    start() {
        this.gameBoard.initializeBoard()

        
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
    
                self.gameBoard.move(posFrom, posTo)
            }
        })
    }
}

const game = new Game()
game.start()