import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getAllBreedsOrDogs,
  getAllTemperaments,
  getOrderAsceding,
  getOrderDescending,
  getWightMin,
  getWightMax,
  orderByTempe,
  filterCreateBreeds,
} from '../../redux/action/index';
import './homeStyles.css';
import Cards from '../../components/cards/cardsComponent';
import SearchDogsName from '../../components/searchbar/searchDogsName';

const Home = () => {
  const dispatch = useDispatch();
  const breed = useSelector((state) => state.breed);
  const temperaments = useSelector((state) => state.temperaments);
  const OrderWhitRefByName = useRef();
  const OrderWhitRefFilter = useRef();
  const OrderWhitRefWeight = useRef();

  useEffect(() => {
    dispatch(getAllBreedsOrDogs());
    dispatch(getAllTemperaments());
  }, [dispatch]);

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getAllBreedsOrDogs());
  };

  const handleByName = (event) => {
    const valorName = event.target.value;
    if (valorName === 'A-Z') {
      dispatch(getOrderAsceding(valorName, breed));
    } else if (valorName === 'Z-A') {
      dispatch(getOrderDescending(valorName, breed));
    }
  };

  const handleByWeight = (event) => {
    const valorWeight = event.target.value;
    if (valorWeight === 'weightMin') {
      dispatch(getWightMin(valorWeight, breed));
    } else if (valorWeight === 'weightMax') {
      dispatch(getWightMax(valorWeight, breed));
    }
  };

  const handleOrderTempe = (event) => {
    const valorTempe = event.target.value;
    dispatch(orderByTempe(valorTempe, temperaments));
  };

  const handleFilterCreate = (event) => {
    const valorCreate = event.target.value;
    dispatch(filterCreateBreeds(valorCreate));
  };

  return (
    <div className="home">
      <h2 className="home-title">Home</h2>
      <button onClick={handleClick} className="bt-todas">
        Todas las Razas
      </button>
      <SearchDogsName />

      <Link to='/create' id='click'>
      <button className='bt-crearRaza'>CREAR RAZA</button>
      </Link>



      <div className="select-container">
        <label>Ordena las Razas por Nombre</label>
        <select
          onChange={handleByName}
          className="order-name"
          ref={OrderWhitRefByName}
        >
          <option value="A-Z">De A a la Z</option>
          <option value="Z-A">De Z a la A</option>
        </select>
      </div>

      <div className="select-container">
        <label>Filtrar Razas</label>
        <select
          onChange={handleFilterCreate}
          className="order-name"
          ref={OrderWhitRefFilter}
        >
          <option value="RazasCreadas">Razas Creadas</option>
          <option value="razasExistente">Razas Existentes</option>
        </select>
      </div>

      <div className="select-container">
        <label>Ordena las Razas por Peso</label>
        <select
          onChange={handleByWeight}
          className="order-name"
          ref={OrderWhitRefWeight}
        >
          <option value="weightMin">Pesos Min</option>
          <option value="weightMax">Pesos Max</option>
        </select>
      </div>

      <div className="select-container">
  <label>Ordena las Razas por Temperamento</label>
  <select onChange={handleOrderTempe} className="order-name">
    <option value="Tempe">Filtrar por Temperamento</option>
    {temperaments
      ?.filter((temp) => temp.name) 
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((temp) => (
        <option key={temp.id} value={temp.name}>
          {temp.name}
        </option>
      ))}
  </select>
</div>

      <Cards breed={breed} />
    </div>
  );
};

export default Home;