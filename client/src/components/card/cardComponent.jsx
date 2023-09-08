import React from 'react';
import "./cardStyles.css";
import { Link } from 'react-router-dom';

const Card = ({ id, image, name, temperament, weight }) => {
  return (
    <div className='card-container'>
      <img className='dogimage' src={image} alt={name} width='250px' />
      <Link to={`/dogs/${id}`}>
        <p className='NameDog'>{name}</p>
       
      
      <div className='nameTemp'>TEMPERAMENTS: {temperament}</div>
      <div className='styleWeight'>PESO: {weight}</div>
      </Link>
    </div>
  )
}
export default Card;