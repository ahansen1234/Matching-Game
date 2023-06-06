import React from 'react';
import './App.css';
import shuffle from './utilities/shuffle';
import Card from './components/Card';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import useAppBadge from './hooks/useAppBadge';
import { clear } from '@testing-library/user-event/dist/clear';

function App() {
  const [cards, setCards] = useState(shuffle); 
  const [pickOne, setPickOne] = useState(null); 
  const [pickTwo, setPickTwo] = useState(null); 
  const [disabled, setDisabled] = useState(false); 
  const [wins, setWins] = useState(0); 
  const [setBadge, clearBadge] = useAppBadge(); 

  
  const handleClick = (card) => {
    if (!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };
  
  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

  
  useEffect(() => {
    let pickTimer;


    if (pickOne && pickTwo) {
      
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
             
              return { ...card, matched: true };
            } else {
              
              return card;
            }
          });
        });
        handleTurn();
      } else {
        
        setDisabled(true);
        
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
    }

    return () => {
      clearTimeout(pickTimer);
    };
  }, [cards, pickOne, pickTwo]);

 
  useEffect(() => {
    
    const checkWin = cards.filter((card) => !card.matched);

    
    if (cards.length && checkWin.length < 1) {
      console.log('You win!');
      setWins(wins + 1);
      handleTurn();
      setCards(shuffle);
    }
  }, [cards, setBadge, wins]);

  
  const handleNewGame = () => {
    setWins(0);
    clearBadge();
    handleTurn();
    setCards(shuffle);
  }

  return (
    <>
      <Header handleNewGame={handleNewGame} wins={wins} />
       <div className="grid">
        {cards.map((card) => {
          const { image, matched } = card;
          
          return (
            <Card
              key={image.id}
              card={card}
              image={image}
              onClick={() => handleClick(card)}
              selected={card === pickOne || card === pickTwo || matched}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
