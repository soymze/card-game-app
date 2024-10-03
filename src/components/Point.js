import React from 'react'
import './Point.css';

function Point({points}) {
  return (
    <div className='point-container'>
      <p className='point'>{points}</p>
    </div>
  )
}

export default Point