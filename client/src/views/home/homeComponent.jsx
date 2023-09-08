import React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";


import {getAllBreedsOrDogs, } from "../../redux/action/index";

import "./homeStyles.css";

import Cards from "../../components/cards/cardsComponent";
import SearchDogsName from "../../components/searchbar/searchDogsName";


const Home = () => {
const dispatch = useDispatch();
const breed = useSelector((state) => state.breed);
// const breedTemperament = useSelector((state) => state.temperaments)

useEffect(()=>{
  dispatch(getAllBreedsOrDogs())
  // dispatch(getAllTemperaments())
},[dispatch])

  return (
    <div className='home'>
      <h2 className='home-title'>Home</h2>
      <SearchDogsName/>
      <Cards breed={breed} />
    </div>
  )
}

export default Home;
