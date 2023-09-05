import React from 'react';
import "./cardsStyles.css";
import Card from "../card/cardComponent";

const Cards = () => {
  return (
    <div className='card-list'>
      <h1>este es el Cards</h1>
      <Card/>
      <Card/>
      <Card/>
    </div>
  ) 
}

export default Cards;