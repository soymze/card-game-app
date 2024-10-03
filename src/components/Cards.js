import React, { useState, useEffect } from "react";
import "./Cards.css";
import Hydrogen from "../icons/Hydrogen.svg";
import Helium from "../icons/Helium.svg";
import Lithium from "../icons/Lithium.svg";
import Beryllium from "../icons/Beryllium.svg";
import Boron from "../icons/Boron.svg";
import Carbon from "../icons/Carbon.svg";
import Nitrogen from "../icons/Nitrogen.svg";
import Oxygen from "../icons/Oxygen.svg";
import Fluorine from "../icons/Fluorine.svg";
import Neon from "../icons/Neon.svg";
import Sodium from "../icons/Sodium.svg";
import Magnesium from "../icons/Magnesium.svg";
import Joker from "../icons/Joker.svg";
import Points from "./Point.js";

const initialCards = [
  { name: "Hydrogen", icon: Hydrogen },
  { name: "Helium", icon: Helium },
  { name: "Lithium", icon: Lithium },
  { name: "Beryllium", icon: Beryllium },
  { name: "Boron", icon: Boron },
  { name: "Carbon", icon: Carbon },
  { name: "Nitrogen", icon: Nitrogen },
  { name: "Oxygen", icon: Oxygen },
  { name: "Fluorine", icon: Fluorine },
  { name: "Neon", icon: Neon },
  { name: "Sodium", icon: Sodium },
  { name: "Magnesium", icon: Magnesium },
  { name: "Hydrogen", icon: Hydrogen },
  { name: "Helium", icon: Helium },
  { name: "Lithium", icon: Lithium },
  { name: "Beryllium", icon: Beryllium },
  { name: "Boron", icon: Boron },
  { name: "Carbon", icon: Carbon },
  { name: "Nitrogen", icon: Nitrogen },
  { name: "Oxygen", icon: Oxygen },
  { name: "Fluorine", icon: Fluorine },
  { name: "Neon", icon: Neon },
  { name: "Sodium", icon: Sodium },
  { name: "Magnesium", icon: Magnesium },
  { name: "Joker", icon: Joker },
];

const shuffleCards = (cardsArray) => {
  for (let i = cardsArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
  }
  return cardsArray;
};

function Cards() {
  const [visibleCards, setVisibleCards] = useState(
    Array(initialCards.length).fill(false)
  );
  const [cards, setCards] = useState(initialCards); // Burada initialCards'ı kullandık
  const [selectedCards, setSelectedCards] = useState([]);
  const [lock, setLock] = useState(false);
  const [points, setPoints] = useState(0);
  const [jokerRevealed, setJokerRevealed] = useState(false);

  useEffect(() => {
    const shuffledCards = shuffleCards([...initialCards]); // Kartları karıştır
    setCards(shuffledCards); // karıştırılan kartları state'e set et
  }, []);

  const handleCardClick = (index) => {
    if (visibleCards[index] || lock || selectedCards.length === 2) return;

    const newVisibleCards = [...visibleCards];
    newVisibleCards[index] = true;

    const newSelectedCards = [...selectedCards, index];
    setVisibleCards(newVisibleCards);

    // Eğer açılan kart Joker ise
    if (cards[index].name === 'Joker' && !jokerRevealed) {
      setJokerRevealed(true);

      const matchedPairIndexes = findMatchingPair();
      if (matchedPairIndexes.length === 2) {
        const [firstMatch, secondMatch] = matchedPairIndexes;
        newVisibleCards[firstMatch] = true;
        newVisibleCards[secondMatch] = true;

        setTimeout(() => {
          setVisibleCards(newVisibleCards);
          setPoints(points + 15); // Joker kartı ile eşleşen kartlar için puan ekle
        }, 500);
      }

      // Joker açık kaldığı için seçimi sıfırla ama jokeri açık bırak
      setSelectedCards([]);
      return; // Joker açıldığında diğer işlemler yapılmadan burada çıkılır.
    }

    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      setLock(true);

      const [firstCardIndex, secondCardIndex] = newSelectedCards;

      // Kartların isimlerine göre eşleşme kontrolü
      if (cards[firstCardIndex].name === cards[secondCardIndex].name) {
        setPoints(points + 15); // Eşleşirse puan ekle
        setSelectedCards([]);
        setLock(false);
      } else {
        setTimeout(() => {
          setPoints(points - 5); // Eşleşmezse puan çıkar
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

  // Aynı isimdeki iki kartı bulan fonksiyon
  const findMatchingPair = () => {
    const cardNames = cards.map((card) => card.name);
    for (let i = 0; i < cardNames.length; i++) {
      for (let j = i + 1; j < cardNames.length; j++) {
        if (cardNames[i] === cardNames[j] && !visibleCards[i] && !visibleCards[j]) {
          return [i, j]; // Aynı isimli ve açılmamış kartların indekslerini döndür
        }
      }
    }
    return [];
  };

  return (
    <div>
      <Points points={points} />
      <div className="cards">
        {cards.map((card, index) => (
          <div
            className={`card ${visibleCards[index] ? "flipped" : ""}`} // flipped sınıfı burada ekleniyor
            key={index}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-inner">
              <div className="card-front"></div>
              <div className="card-back">
                <img src={card.icon} alt={card.name} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
