import React, { useEffect } from 'react';
import "./detailStyles.css";
import { Link, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailDogs } from '../../redux/action/index';
import Image from '../../img/pexels-edgar-daniel-hernández-cervantes-3628100.jpg';

const DetailDog = () => {
  const dispatch = useDispatch();
  const detailDog = useSelector((store) => store.detailDog);
  const {id} = useParams();

  useEffect(() => {
    dispatch(getDetailDogs(id));
  }, [id, dispatch]);

  return (
    <div>
      <Link to='/home' id="click">
        <button className='btRegresar'>Regresar</button>
      </Link>

      {detailDog.length ? (
        <div className="menu-detail">
          <div className="container-detail">
            <div className='nameDog-detail'><h2>La raza Del Perro es: {detailDog[0].name}</h2></div>
            <div className="img-styles">
              <img className="img-container" src={detailDog[0].image} alt='DogGob'></img>
            </div>
            <div className="other-detail">
            <p><b>Su Temperamento es: </b>{detailDog[0].temperament ? detailDog[0].temperament : 'No encontrado'}</p>
              <p><b>Su Altura es: </b>{
                 `${detailDog[0].height_min} - ${detailDog[0].height_max} mts`}</p>
              <p><b>Su Peso es: </b>{
              `${detailDog[0].weight_min} - ${detailDog[0].weight_max} kg`}</p>
                <p><b>Su Promedio de vida es: </b>{detailDog[0].life_span ? detailDog[0].life_span : 'No encontrado'}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="notFound">
            <h2>Not found</h2>
            <img src={Image} alt='DogNoFount'></img>
            <small>Error 404</small>
            <p>{detailDog ? detailDog.msg : 'No encontrado'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailDog;