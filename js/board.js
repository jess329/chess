const ROWS = 8
const COLS = 8
const START_LAYOUT = "RNBKQBNR/PPPPPPPP/********/********/********/********/pppppppp/rnbqkbnr"
const PIECES_HTML = {
    "R": "♜",
    "N": "♞",
    "B": "♝",
    "K": "♚",
    "Q": "♛",
    "P": "♟",
    "r": "♖",
    "n": "♘",
    "b": "♗",
    "k": "♔",
    "q": "♕",
    "p": "♙",
    "*": ""
}
// upper case -> black figures
// lower case -> white figures

class Board {
    constructor() {
        this.board = document.querySelector(".board")
        this.bottomPlayerWhite = true
        this.rows = ROWS
        this.cols = COLS
    }

    createBoardLayout() {
        const boardLayout = []
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                boardLayout.push({
                    row: row, 
                    col: col,
                })

                const square = document.createElement("div")
                square.className = (row + col) % 2 == 0 ? "black" : "white"
                this.board.appendChild(square)
            }
        }

        return boardLayout
    }
    
    createBoard() {
        const boardLayout = this.createBoardLayout()
        
        // an array that contains the information about all squares on the board
        const board = allSquares.map((square) => {
            const index = allSquares.indexOf(square)
            const current = boardLayout[index]
            // every element is made to an object that holds the properties of the square
            // the position of square (row & column) is generated in the boardLayout above
            square = {
                element: square, 
                squareColor: square.classList.value, 
                row: current.row, 
                col: current.col,
                initial: {
                    occupied: false,
                    piece: null,
                    pieceElement: null,
                    playerColor: null
                },
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
                    square.initial = {
                        occupied: true,
                        piece: piece.classList[1].split("-")[2],
                        pieceElement: piece,
                        playerColor: piece.classList[2].split("-")[1]
                    }
                }
            })
    
            return square
        })
        return board

    }  

    splitLayoutStr() {
        let arr = START_LAYOUT.split("/")
        for (let i = 0; i < ROWS; i++) {
            const row = arr[i]
            arr[i] = row.split("")
        }
        return arr
    }

    createPieces() {
        const allSquares = [...document.querySelectorAll(".white, .black")]
        const boardArr = this.splitLayoutStr()   
        // for (let i = 0; i < ROWS; i++) {
        //     for (let j = 0; j < COLS; j++) {
        //         const pieceStr = boardArr[i][j]
        //         const piece_html = PIECES_HTML[pieceStr]

        //         let square = allSquares[squareIndex]
        //         square.innerHTML = piece_html
        //     }
        // }     
        // console.log(boardArr);

        const boardLayout = this.createBoardLayout() 

        allSquares.map((square) => {
            const index = allSquares.indexOf(square)
            const current = boardLayout[index]

            const pieceStr = boardArr[current.row][current.col]
            const piece_html = PIECES_HTML[pieceStr]
            square.innerHTML = piece_html
        })   
        console.log(boardArr);
    }

    initializeBoard() {
        this.createBoardLayout()
        this.createPieces()
    }



    makeMove(fromSquare, toSquare) {

        // making copies from the old and new square
        const copyOfFromSquare = {...fromSquare}
        const copyOfToSquare = {...toSquare}
        // const newBoard = []

        // the array of all squares is mapped and the two squares modified
        const newBoard = this.squares.map(square => {
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
        this.squares = [...newBoard]


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

        // console.log(this.squares)
    }
    

    restart() {
        const initialBoard = []
        for (let initialSquare of this.squares) {
            const copyOfSquare = {...initialSquare}
            const square = this.squares.find(square => {
                return square.pieceElement == initialSquare.initial.pieceElement
            })

            copyOfSquare.occupied = square.occupied
            copyOfSquare.piece = square.piece
            copyOfSquare.pieceElement = square.pieceElement
            copyOfSquare.playerColor = square.playerColor

            initialBoard.push(copyOfSquare)
        }

        this.squares = [...initialBoard]
        this.updateUI()
    }   
    
}


class Game {
    constructor() {
        this.gameBoard = new Board()
        this.gameStarted = false
    }

    start() {
        const board = this.gameBoard
        board.initializeBoard()
        board.squares.forEach(square => {

            square.element.addEventListener("click", () => {
                
                board.squares.forEach(square => {
                    square.element.classList.remove("active")

                })
                square.element.classList.add("active")

                clickedSquares.push(square)

                const lastClickedSquare = {...clickedSquares[clickedSquares.length - 2]}
                if(lastClickedSquare.occupied && !square.occupied) {
                    this.gameStarted = true
                    board.makeMove(lastClickedSquare, square)
                }
            })
        })

        restartButton.onclick = () => {
            board.restart()
        }
    }

}

const game = new Game()
game.start()
 

