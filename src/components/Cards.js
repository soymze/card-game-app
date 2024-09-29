import React from 'react';
import './Cards.css';

function Cards() {

  const cards = [
  'Hydrogen',
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium',
  'Boron',
  'Carbon',
  'Nitrogen',
  'Oxygen',
  'Fluorine',
  'Neon',
  'Sodium',
  'Magnesium',
  'Helium',
  'Lithium',
  'Beryllium',
  'Boron',
  'Carbon',
  'Nitrogen',
  'Oxygen',
  'Fluorine',
  'Neon',
  'Sodium',
  'Magnesium',
  'Joker'];

  return (
    <div className='cards'>
      {cards.map((card, index) => (
        <div className='card' key={index}>
          {card}
        </div>
      ))}
    </div>
  )
}

export default Cards