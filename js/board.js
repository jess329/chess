const boardElem = document.getElementsByClassName("board")[0]
const allSquares = [...document.querySelectorAll(".white, .black")]
const pieces = [...document.querySelectorAll(".player-white, .player-black")]
const flipButton = document.getElementsByClassName("flip")[0]
const restartButton = document.getElementsByClassName("restart")[0]
const boardStarter = []



class Board {
    constructor() {
        this.board = boardElem
        this.squares = []
        this.rows = 8
        this.cols = 8
    }

    initializeBoard() {
        const boardLayout = []
        for (let row = 1; row <= this.rows; row++) {
            for (let col = 1; col <= this.cols; col++) {
                boardLayout.push({
                    row: row, 
                    col: col,
                })
            }
        }
        
        // an array that contains the information about all squares on the board
        this.squares = allSquares.map((square) => {
            const index = allSquares.indexOf(square)
            const current = boardLayout[index]
            // every element is made to an object that holds the properties of the square
            // the position of square (row & column) is generated in the boardLayout above
            square = {
                element: square, 
                squareColor: square.classList.value, 
                row: current.row, 
                col: current.col,
                rowFlipped: 9 - current.row,
                colFlipped: 9 - current.col,
                occupied: false,
                piece: null,
                pieceElement: null,
                playerColor: null,
            }
    
            pieces.map((piece) => {
                if(piece.parentNode === square.element) {
                    square.occupied = true
                    square.piece = piece.classList[1].split("-")[2]
                    square.pieceElement = piece
                    square.playerColor = piece.classList[2].split("-")[1]
                }
            })
    
            return square
        })
        boardStarter.push(this.squares)
    }  

    makeMove(fromSquare, toSquare) {

        // making copies from the old and new square
        const copyOfFromSquare = {...fromSquare}
        const copyOfToSquare = {...toSquare}

        // the array of all squares is mapped and the two squares modified
        this.squares.map(square => {
            if(square.row === fromSquare.row && square.col === fromSquare.col) {

                // the modifiable properties of the new square are copied to the old square
                square.occupied = copyOfToSquare.occupied
                square.piece = copyOfToSquare.piece
                square.pieceElement = copyOfToSquare.pieceElement
                square.playerColor = copyOfToSquare.playerColor
            } else if(square.row === toSquare.row && square.col === toSquare.col) {

                // the modifiable properties of the old square are copied to the new square
                square.occupied = copyOfFromSquare.occupied
                square.piece = copyOfFromSquare.piece
                square.pieceElement = copyOfFromSquare.pieceElement
                square.playerColor = copyOfFromSquare.playerColor
            }
            return square
        })

        this.updateUI()
        // console.log(this.squares)
    }

    updateUI() {
        // the whole html of the squares is removed and written new
        this.board.innerHTML = ""

        // the array of all squares is ran through and the square elements with the new positions of the pieces are generated
        this.squares.forEach(square => {
            const squareElement = square.element

            if(square.occupied) {
                const pieceElement = square.pieceElement

                squareElement.appendChild(pieceElement)
            }

            this.board.appendChild(squareElement)
        })

        console.log(this.squares);
    }
    
    flipBoard() {
        // all new positions of the pieces are generated and stored in a new array
        
        const flippedBoard = []
        for(let square of this.squares) {
            const copyOfSquare = {...square}
            
            const newSquare = this.squares.find(newSquare => {
                return newSquare.row == square.rowFlipped &&
                newSquare.col === square.colFlipped
            })
            
            copyOfSquare.occupied = newSquare.occupied
            copyOfSquare.piece = newSquare.piece
            copyOfSquare.pieceElement = newSquare.pieceElement
            copyOfSquare.playerColor = newSquare.playerColor
            
            flippedBoard.push(copyOfSquare)
        }
        
        // console.log(flippedBoard)
        this.squares = [...flippedBoard]
        this.updateUI()
    }
    
    restart() {
        this.squares = [...boardStarter[0]]
        this.updateUI()
    }   
    
}

class Square {
    constructor(squareElem, squareColor, row, col, rowFlipped, colFlipped, occupied, piece, pieceElement, playerColor) {
        this.squareElem = squareElem
        this.squareColor = squareColor 
        this.row = row
        this.col = col
        this.rowFlipped = rowFlipped
        this.colFlipped = colFlipped
        this.occupied = occupied
        this.piece = piece
        this.pieceElement = pieceElement
        this.playerColor = playerColor

    }
}

// export class Piece {
//     constructor() {

//     }
// }

const squares = []
let clickedSquares = [] 


class Game {
    constructor() {
        this.gameBoard = new Board()
        this.gameStarted = false
    }

    start() {
        const board = this.gameBoard
        board.initializeBoard()
        board.squares.forEach(square => {
            const {element, squareColor, row, col, rowFlipped, colFlipped, occupied, piece, pieceElement, playerColor} = square
            const squareInstance = new Square(element, squareColor, row, col, rowFlipped, colFlipped, occupied, piece, pieceElement, playerColor)
            squares.push(squareInstance)

            square.element.addEventListener("click", () => {
                board.squares.forEach(square => {
                    square.element.classList.remove("active")
                })
                square.element.classList.add("active")

                clickedSquares.push(square)

                const lastClickedSquare = clickedSquares[clickedSquares.length - 2]
                if(lastClickedSquare.occupied && !square.occupied) {
                    this.gameStarted = true
                    board.makeMove(lastClickedSquare, square)
                }
            })
        })

        flipButton.onclick = () => {
            board.flipBoard()
        }
        restartButton.onclick = () => {
            board.restart()
        }
    }

}

const game = new Game()
game.start()


// const board = new Board()
// board.initializeBoard()



 

