import React from 'react'
import '../core.sass'
export const Square = ({value, setSquaresValue}) => {
  return (
    <button className='button' onClick={setSquaresValue} style={{color: value ? 'white' : '282c34'}}>
        {value || '-'}
    </button>
  )
}
