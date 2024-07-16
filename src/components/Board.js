import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Square } from './Square';

export const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));

    const [winners, setWinners] = useState({ x: 0, o: 0 })
    const winnersRef = useRef(winners)

    const [isNextX, setIsNextX] = useState(true);

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
        const data = localStorage.getItem('winner')
        if(data) {
            setWinners(JSON.parse(data))
            winnersRef.current = JSON.parse(data)
        }
    }, [])

    useEffect(() => {
        const winner = winnerFunc();
        if (winner) {
            setWinners(prevWinners => {
                const updateWinners = {
                    ...prevWinners,
                    [winner]: prevWinners[winner] + 1
                }
                winnersRef.current = updateWinners
                return updateWinners
            });
            localStorage.setItem('winner', JSON.stringify(winnersRef.current))
        }
    }, [squares, winnerFunc]);

    winnerInfo = winnerFunc();
    if (winnerInfo) info = `Winner - ${winnerInfo}`;

    // следующий ход
    const setSquaresValue = (index) => {
        if (winnerInfo) {
            localStorage.setItem('winner', JSON.stringify(winnersRef.current))
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
            <div className='board'>
                {squares.map((square, index) => {
                    return (
                        <span key={index} className='span'>
                            <Square value={square} setSquaresValue={() => { setSquaresValue(index) }} />
                            {(index === 2 || index === 5) && <br />}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};
