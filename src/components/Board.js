import React, { useState, useEffect, useCallback } from 'react';
import { Square } from './Square';

export const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));

    const [isNextX, setIsNextX] = useState(true);

    const [winners, setWinners] = useState({ x: 0, o: 0 });

    let info = `Next - ${(isNextX) ? 'x' : 'o'}`;
    let winnerInfo = null;

    const winnerFunc = useCallback(() => {
        const winnerCombinations = [
            [0, 1, 2], // по горизонтали
            [3, 4, 5],
            [6, 7, 8],

            [0, 3, 6], // по вертикали
            [1, 4, 7],
            [2, 5, 8],

            [0, 4, 8], // по диагонали
            [6, 4, 2]
        ];

        for (let combination of winnerCombinations) {
            let [a, b, c] = combination;
            if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
                return squares[c];
            }
        }
        const fullBoard = squares.every(squares => squares)
        if (fullBoard) {
            window.location.reload()
            return
        }

        return null;
    }, [squares])



    useEffect(() => {
        const winner = winnerFunc();
        if (winner) {
            setWinners(prevWinners => {
                return {
                    ...prevWinners,
                    [winner]: prevWinners[winner] + 1
                };
            });
        }
    }, [squares, winnerFunc]);

    winnerInfo = winnerFunc();
    if (winnerInfo) info = `Winner - ${winnerInfo}`;

    // следующий ход
    const setSquaresValue = (index) => {
        if (winnerInfo) {
            window.location.reload()
            return
        } 
        if(squares[index]) return

        let newSquares = squares.slice();
        newSquares[index] = isNextX ? 'x' : 'o';
        setIsNextX(!isNextX);
        setSquares(newSquares);
    };

    return (
        <div>
            <h1>{info}</h1>
            <div>
                <h2>X win - {winners.x}</h2>
                <h2>O win - {winners.o}</h2>
            </div>
            {squares.map((square, index) => {
                return (
                    <span key={index} className='span'>
                        <Square value={square} setSquaresValue={() => { setSquaresValue(index) }} />
                        {(index === 2 || index === 5) && <br />}
                    </span>
                );
            })}
        </div>
    );
};
