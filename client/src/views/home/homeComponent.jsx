import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllBreedsOrDogs,
  getAllTemperaments,
  getOrderAsceding,
  getOrderDescending,
  getWightMin,
  getWightMax,
  orderByTempe,
  filterCreateBreeds,
} from "../../redux/action/index";
import "./homeStyles.css";
import Card from "../../components/card/cardComponent";
import SearchDogsName from "../../components/searchbar/searchDogsName";
import Paginacion from "../../components/paginacion/paginado";

const Home = () => {
  const dispatch = useDispatch();
  const breed = useSelector((state) => state.dogsAllCopy);
  const temperaments = useSelector((state) => state.temperaments);
  const OrderWhitRefByName = useRef();
  const OrderWhitRefFilter = useRef();
  const OrderWhitRefWeight = useRef();

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, []);

  useEffect(() => {
    dispatch(getAllBreedsOrDogs());
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getAllBreedsOrDogs());
  };

  const [ordenar, setOrdenar] = useState("");
  const [page, setPage] = useState(1);

  const [actualPage, setActualPage] = useState(1);
  const [pageXdogs] = useState(8);
  const indexOflast = actualPage * pageXdogs; // devuelve 8
  const indexOfFirst = indexOflast - pageXdogs; // 0
  const dogsPage = breed.slice(indexOfFirst, indexOflast);
  

  const paginado = (pageNumber) => {
    setActualPage(pageNumber);
  };

  const handleByName = (event) => {
    const valorName = event.target.value;
    if (valorName === "A-Z") {
      dispatch(getOrderAsceding(valorName, breed));
      setPage(1);
      setOrdenar(`Orden ${valorName}`);
    } else if (valorName === "Z-A") {
      dispatch(getOrderDescending(valorName, breed));
      setPage(1);
      setOrdenar(`Orden ${valorName}`);
    }
  };

  const handleByWeight = (event) => {
    const valorWeight = event.target.value;
    if (valorWeight === "weightMin") {
      dispatch(getWightMin(valorWeight, breed));
      setPage(1);
      setOrdenar(`Orden ${valorWeight}`);
    } else if (valorWeight === "weightMax") {
      dispatch(getWightMax(valorWeight, breed));
      setPage(1);
      setOrdenar(`Orden ${valorWeight}`);
    }
  };

  const handleOrderTempe = (event) => {
    const valorTempe = event.target.value;
    dispatch(orderByTempe(valorTempe));
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

      <Link to="/crear" id="click">
        <button className="bt-crearRaza">CREAR RAZA</button>
      </Link>

      <div className="select-container">
        <label>Choose temperament: </label>
        <select name="filterBy" onChange={handleOrderTempe}>
          <option value="">All</option>
          {temperaments?.map((temperament) => (
            <option key={temperament.id} value={temperament.name}>
              {temperament.name}
            </option>
          ))}
        </select>
      </div>

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
        <label>Filtrar Razas</label>
        <select onChange={(e) => handleFilterCreate(e)}>
            <option value="all">All Race</option>
            <option value="sourceDB">Created</option>
          </select>
      </div>
      <Paginacion
        breed={breed?.length}
        pageXdogs={pageXdogs}
        paginado={paginado}
      />
      <div className="card-list">
        {dogsPage?.map((dog) => (
          <Card
            key={dog.id}
            id={dog.id}
            image={dog?.image}
            name={dog?.name}
            weight={dog?.weight}
            temperament={dog?.temperament}
          />
        ))}
      </div>
      <Paginacion
        breed={breed?.length}
        pageXdogs={pageXdogs}
        paginado={paginado}
      />
    </div>
  );
};

export default Home;
