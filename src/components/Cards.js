import React, { useState } from 'react';
import './Cards.css';
import Hydrogen from '../icons/Hydrogen.svg';
import Helium from '../icons/Helium.svg';
import Lithium from '../icons/Lithium.svg';
import Beryllium from '../icons/Beryllium.svg';
import Boron from '../icons/Boron.svg';
import Carbon from '../icons/Carbon.svg';
import Nitrogen from '../icons/Nitrogen.svg';
import Oxygen from '../icons/Oxygen.svg';
import Fluorine from '../icons/Fluorine.svg';
import Neon from '../icons/Neon.svg';
import Sodium from '../icons/Sodium.svg';
import Magnesium from '../icons/Magnesium.svg';
import Joker from '../icons/Joker.svg';

const cards = [
  { name: 'Hydrogen', icon: Hydrogen },
  { name: 'Helium', icon: Helium },
  { name: 'Lithium', icon: Lithium },
  { name: 'Beryllium', icon: Beryllium },
  { name: 'Boron', icon: Boron },
  { name: 'Carbon', icon: Carbon },
  { name: 'Nitrogen', icon: Nitrogen },
  { name: 'Oxygen', icon: Oxygen },
  { name: 'Fluorine', icon: Fluorine },
  { name: 'Neon', icon: Neon },
  { name: 'Sodium', icon: Sodium },
  { name: 'Magnesium', icon: Magnesium },
  { name: 'Hydrogen', icon: Hydrogen },
  { name: 'Helium', icon: Helium },
  { name: 'Lithium', icon: Lithium },
  { name: 'Beryllium', icon: Beryllium },
  { name: 'Boron', icon: Boron },
  { name: 'Carbon', icon: Carbon },
  { name: 'Nitrogen', icon: Nitrogen },
  { name: 'Oxygen', icon: Oxygen },
  { name: 'Fluorine', icon: Fluorine },
  { name: 'Neon', icon: Neon },
  { name: 'Sodium', icon: Sodium },
  { name: 'Magnesium', icon: Magnesium },
  { name: 'Joker', icon: Joker }
];

function Cards() {
  const [visibleCards, setVisibleCards] = useState(Array(cards.length).fill(false));
  const [selectedCards, setSelectedCards] = useState([]);
  const [lock, setLock] = useState(false);

  const handleCardClick = (index) => {
    if (visibleCards[index] || lock || selectedCards.length === 2) return;

    const newVisibleCards = [...visibleCards];
    newVisibleCards[index] = true;

    const newSelectedCards = [...selectedCards, index];
    setVisibleCards(newVisibleCards);
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      setLock(true);

      const [firstCardIndex, secondCardIndex] = newSelectedCards;

      // Eşleşme kontrolünü name özelliği ile güncelle
      if (cards[firstCardIndex].name === cards[secondCardIndex].name) {
        setSelectedCards([]);
        setLock(false);
      } else {
        setTimeout(() => {
          const resetVisibleCards = [...newVisibleCards];
          resetVisibleCards[firstCardIndex] = false;
          resetVisibleCards[secondCardIndex] = false;
          setVisibleCards(resetVisibleCards);
          setSelectedCards([]);
          setLock(false);
        }, 1000);
      }
    }
  };

  return (
    <div className='cards'>
      {cards.map((card, index) => (
        <div className='card' key={index} onClick={() => handleCardClick(index)}>
          {visibleCards[index] ? (
            <img src={card.icon} alt={card.name} /> // SVG ikonunu göster
          ) : (
            ''
          )}
        </div>
      ))}
    </div>
  );
}

export default Cards;
