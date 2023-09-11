import React from 'react';
import "./createStyles.css";
import {Link} from 'react-router-dom'

const CreateBreed = () => {
  return (
    <div>
      <Link to='/home' id='click'>
   <button className='bt-reguesar'>Regresar</button>
   </Link>
   <div className='form-component'>
    <form className='formStyles'>
      <h2>Crear Nueva Raza de Perros</h2>
      <label><b>Ponle un Nombre</b></label><br/>

      {/* <input type="text" name="name" value={breed.name} onChange={} />

      <label><b>¿Que Altura le Pondrás?</b></label><br/>


      <label><b>¿Que Peso Tendrá?</b></label><br/>

      <label><b>¿Cuantos Años quiere que viva?</b></label><br/>


      <label><b>¿Cual Temperamento te gusta? (puedes elegir varios) </b></label><br/> */}


    </form>

   </div>
    </div>
  )
}

export default CreateBreed;
