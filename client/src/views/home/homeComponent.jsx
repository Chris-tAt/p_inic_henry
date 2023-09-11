import React, { useRef } from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";



import {getAllBreedsOrDogs,
   getAllTemperaments,
   getOrderAsceding,
   getOrderDescending,
   getWightMin,
   getWightMax, 
   orderByTempe } from "../../redux/action/index";

import "./homeStyles.css";

import Cards from "../../components/cards/cardsComponent";
import SearchDogsName from "../../components/searchbar/searchDogsName";


const Home = () => {
const dispatch = useDispatch();
const breed = useSelector((state) => state.breed);
const breedTemperament = useSelector((state) => state.temperaments)
const OrderWhitRef = useRef();

useEffect(()=>{
  dispatch(getAllBreedsOrDogs())
  dispatch(getAllTemperaments())
},[dispatch])


//logica del paginado
//____________________________


const handleClick = (event) => {
  event.preventDefault();
  dispatch(getAllBreedsOrDogs())
}



const handleByName = (event) => {
  const valorName = event.target.value;
  if (valorName === 'A-Z') {
    dispatch(getOrderAsceding(valorName, breed));
  } else if (valorName === 'Z-A') {
    dispatch(getOrderDescending(valorName, breed));
  }
}

const handleByWeight = (event) => {
  const valorWeight = event.target.value;
  if (valorWeight === 'weightMin') {
    dispatch(getWightMin(valorWeight, breed));
  } else if (valorWeight === 'weightMax') {
    dispatch(getWightMax(valorWeight, breed));
  }
}

const handleOrderTempe = (event) => {
  const valorTempe = event.target.value;
  dispatch(orderByTempe(valorTempe, breed))

}

  return (
    <div className='home'>
      <h2 className='home-title'>Home</h2>
      <button onClick={handleClick} className='bt-todas'>Todas las Razas</button>
      <SearchDogsName/>

      
        <label> Ordena las Razas </label>
        <select onChange={(event) => handleByName (event)} className='order-name' ref={OrderWhitRef}>
          <optgroup label='Nombre'>
            <option  value= 'A-Z'>De A a la Z</option>
            <option  value= 'Z-A'>De Z a la A</option>
          </optgroup>

      </select>
      <select onChange={(event) => handleOrderTempe (event)} className='order-name' ref={OrderWhitRef}>
            <option  value= 'Tempe'>Filtrar por Temperamento </option>
            {breedTemperament?.sort(function(a, b){
              if(a.name < b.name) return -1;
              if(a.name > b.name) return 1;
              return 0;
            })
            .map((temp) => {
              return (
              <option key={temp.id} value={temp.name}>{temp.name}</option>
            )
            })}
           
          

      </select>
      <select onChange={(event) => handleByWeight (event)} className='order-name' ref={OrderWhitRef}>
          <optgroup label='Peso'>
            <option  value= 'weightMin'>Pesos Min </option>
            <option  value= 'weightMax'>Pesos Max</option>
          </optgroup>

      </select>

      <Cards breed={breed} />
    </div>
  )
}

export default Home;
