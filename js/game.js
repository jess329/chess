

class Game {
    constructor() {
        this.gameBoard = new Board()
        this.gameStarted = false
        this.form = document.getElementById("form")
    }

    splitInput(input) {
        const inputArr = input.split(/\s+/).filter(Boolean)
        console.log(inputArr);
    }

    start() {
        this.gameBoard.initializeBoard()

        this.form.addEventListener("submit", function(event) {
            event.preventDefault()

            const inputStr = document.getElementById("move-input").value
            this.splitInput(inputStr)
        })
    }

}

const game = new Game()
game.start()