import React, {useState} from 'react';
import './Cards.css';



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

  function Cards() {
    const [visibleCards, setVisibleCards] = useState(Array(cards.length).fill(false));
    const [selectedCards, setSelectedCards] = useState([]); // Seçilen kartları tutmak için state
    const [lock, setLock] = useState(false); // Tıklamaları kilitlemek için
  
    const handleCardClick = (index) => {
      if (visibleCards[index] || lock || selectedCards.length === 2) return; // Eğer kart görünüyorsa, kilitliyse veya 2 kart seçildiyse hiçbir şey yapma
  
      const newVisibleCards = [...visibleCards];
      newVisibleCards[index] = true; // Tıklanan kartı görünür yap
  
      const newSelectedCards = [...selectedCards, index]; // Seçilen kartları güncelle
      setVisibleCards(newVisibleCards);
      setSelectedCards(newSelectedCards);
  
      if (newSelectedCards.length === 2) { // Eğer iki kart seçildiyse
        setLock(true); // Tıklamaları kilitle
  
        const [firstCardIndex, secondCardIndex] = newSelectedCards;
  
        // Eşleşmeyi kontrol et
        if (cards[firstCardIndex] === cards[secondCardIndex]) {
          // Eşleşme varsa
          setSelectedCards([]); // Seçilen kartları sıfırla
          setLock(false); // Tıklama kilidini aç
        } else {
          // Eşleşme yoksa
          setTimeout(() => {
            const resetVisibleCards = [...newVisibleCards];
            resetVisibleCards[firstCardIndex] = false; // İlk kartı kapat
            resetVisibleCards[secondCardIndex] = false; // İkinci kartı kapat
            setVisibleCards(resetVisibleCards); // Kartları güncelle
            setSelectedCards([]); // Seçilen kartları sıfırla
            setLock(false); // Tıklama kilidini aç
          }, 1000); // 1 saniye bekledikten sonra kartları kapat
        }
      }
    };
  
    return (
      <div className='cards'>
        {cards.map((card, index) => (
          <div className='card' key={index} onClick={() => handleCardClick(index)}>
            {visibleCards[index] ? card : ''} {/* Kart görünmezse boş göster */}
          </div>
        ))}
      </div>
    );
  }
  
  export default Cards;