import React from 'react';
import "./cardStyles.css";

const Card = ({id, image, name, temperament, weight}) => {
  return (
    <div className='card-container'>
       <p className='NameDog' >{name}</p>;
       <img className='dogimage' src= {image} alt = "dog.img" width='250px' />
       <div className='nameTemp'>TEMPERAMENTS: {temperament}</div>
       <div className='styleWeight'>PESO: {weight}kg</div>

    
    </div>
  )
}

export default Card;