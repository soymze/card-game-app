import React from 'react'
import './Point.css';

function Point({points}) {
  return (
    <div className='point-container'>
<p className={`point ${points > 0 ? 'positive' : points < 0 ? 'negative' : ''}`}>{points}</p>
</div>
  )
}

export default Point