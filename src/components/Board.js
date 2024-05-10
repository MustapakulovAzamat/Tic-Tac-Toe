import React, { useState } from 'react'
import { Square } from './Square'
export const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [isNextX, setIsNextX] = useState(true)

    let info = `Next - ${(isNextX) ? 'x' : 'x'}`
    let winnerInfo = null

    let isWinner = false

    const winnerFunc = () => {
        const winnerCombinations = [
            [0,1,2], //по горизонтали
            [3,4,5],
            [6,7,8],

            [0,3,6], //по вертикали
            [1,4,7],
            [2,5,8],

            [0,4,8], //по диоганали
            [6,4,2]
        ]
        for (let combinantion of winnerCombinations) {
            let [a, b, c] = combinantion
            if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
                isWinner = true
                return squares[a]
            }
        }
        return null
    }


    winnerInfo = winnerFunc()
    if(winnerInfo) info = `Winner - ${winnerInfo}`

    //следущий ход
    const setSquaresValue = (index) => {

        if(isWinner) {
            window.location.reload()
            return
        }

        if (squares[index]) return


        let newSquares = squares.slice()
        newSquares[index] = isNextX ? 'x' : 'o'
        setIsNextX(!isNextX)
        setSquares(newSquares)
    }
  return (
    <div>
        <h1>{info}</h1>
       {squares.map((square, index) => {
        return (
            <span key={index} className='span'>
            <Square value={square} setSquaresValue={() => {setSquaresValue(index)}}/>
            {(index === 2 || index === 5) && <br />}
            </span>
        )
       })}
    </div>
  )
}