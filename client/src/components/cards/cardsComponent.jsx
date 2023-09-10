import React from 'react';
import "./cardsStyles.css";
import Card from "../card/cardComponent";

const Cards = ({breed}) => {
 
  return (
    <div className='card-list'>
    
      {breed?.map((dog) => 
        <Card  key={dog.id} id={dog.id} image={dog?.image} name={dog?.name}  weight={dog?.weight} temperament={dog?.temperament} /> )}
    </div>
  ) 
}

export default Cards;