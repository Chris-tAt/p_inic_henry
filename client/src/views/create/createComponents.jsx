import React, { useEffect, useState } from 'react';
import { GrFormAdd } from 'react-icons/gr';
import {BsTrash} from 'react-icons/bs'
import "./createStyles.css";
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {getAllTemperaments, postNewDog} from '../../redux/action/index'
import validationBreed from "../../components/validation"

const CreateBreed = () => {

const dispatch = useDispatch();
const navigate = useNavigate();
const breedtemperamentos = useSelector((state) => state.temperaments);

useEffect(()=> {
dispatch(getAllTemperaments())
},[dispatch])

const [breedDog, setBreedDog] = useState({
  name: '',
  height_min: '',
  height_max: '',
  weight_min: '',
  weight_max: '',
  life_Span: '',
  temperament: [],
})

const [errors, setErrors] = useState({})

const handleBreedDogChange = (event) => {
  event.preventDefault ();
  const {name, value} = event.target
  setBreedDog({
    ...breedDog,
    [name]: value,
  })
  const validate = validationBreed({
    ...breedDog,
    [name]: value,
  })
  setErrors ({
    ...errors,
    [name]: validate[name]
  
  }
  );
}
const handleSelect = (event) => {
  const selectedValue = event.target.value;
  const name = event.target.name;
  setBreedDog((prevInput) => ({
     ...prevInput, 
     temperament: prevInput.temperament.includes(selectedValue)
        ? prevInput.temperament.filter((value) => value !== selectedValue)
        : [...prevInput.temperament, selectedValue]
  }));
  const validaError = validationBreed({
    ...breedDog,
    [name]: selectedValue,
  })
  setErrors({
     ...errors,
     [name]: validaError[name],
  });
}

const handleClear = (event) => {
  event.preventDefault()
  setBreedDog({
    ...breedDog,
    temperament: [],
  })
}
const handleSubmit = (event) => {
  event.preventDefault()
  if(Object.values(errors).length) {
    alert('Algo esta Incorrecto en algun Items')
  }else if (
    breedDog.name === '' ||
    breedDog.height_min === '' ||
    breedDog.height_max === ''||
    breedDog.weight_min === ''||
    breedDog.weight_max === ''||
    breedDog.life_Span === ''||
    !breedDog.temperament.length) {
alert ('Algun Items está sin completar')
    }else {
      dispatch(postNewDog(breedDog))
      alert ('Nueva Raza Creada Exitosamente')
      setBreedDog({
        name: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        life_Span: '',
        temperament: [],
      })
      navigate('/home')
    }
  
}


  return (
    <div>
      <Link to='/home' id='click'>
   <button className='bt-reguesar'>Regresar</button>
   </Link>
   <div className='form-component'>
   <h2>Crear Nueva Raza de Perros</h2>
   <form autoComplete='off' onSubmit={handleSubmit}>
    <div className="grupo-formulario">
        <label><b>Ponle un Nombre:</b></label>
        <input type='text' name='name' value={breedDog.name} onChange={handleBreedDogChange} placeholder='Ingrese el nombre'></input>
        <small className='stylesName'>{errors.name}</small>
    </div>

    <div className="grupo-formulario">
        <label><b>¿Que tan alto quieres que sea?:</b></label>
        <div className="entrada-rango">
            <input name='height_min' type='number' value={breedDog.height_min} onChange={handleBreedDogChange} placeholder='Mín ctms' ></input>
            <small className='stylesHeight'>{errors.height_min}</small>

            <input name='height_max' type='number' value={breedDog.height_max } onChange={handleBreedDogChange}  placeholder='Máx ctms' mts></input>
            <small className='stylesHeight'>{errors.height_max}</small>
        </div>
        
    </div>

    <div className="grupo-formulario">
        <label><b>¿cuánto quieres que pese?:</b></label>
        <div className="entrada-rango">
            <input name='weight_min' type='number' value={breedDog.weight_min} onChange={handleBreedDogChange} placeholder='Mín Kg'></input>
            <small className='stylesWeight'>{errors.weight_min}</small>
            <input name='weight_max' type='number' value={breedDog.weight_max} onChange={handleBreedDogChange} placeholder='Máx Kg'></input>
            <small className='stylesWeight'>{errors.weight_max}</small>
        </div>
        
    </div>

    <div className="grupo-formulario">
        <label><b>¿Cuál es su esperanza de vida?:</b></label>
        <div className="entrada-rango">
            <input name='life_Span' type='text' value={breedDog.life_Span} onChange={handleBreedDogChange} placeholder='Años de vida'></input>
            <small className='stylesLifespan'>{errors.life_Span}</small>
        </div>
        
    </div>

    <div className="grupo-formulario">
    <label><b>Temperament: </b></label><br /><br />
<small>Elija un temperamentos o cree uno propio</small><br /><br />
<input
  list='temperaments'
  name='temperament'
  onChange={handleSelect}
  value={breedDog.temperament}
></input>
<button title='Add'><GrFormAdd /></button>
<datalist id='temperaments'>
  {breedtemperamentos.map((e) => (
    <option value={e} key={e}></option>
  ))}
</datalist>

<input
  name='temperament'
  readOnly='readonly'
  value={breedDog.temperament}
></input>
<button onClick={handleClear} title='Clear' id='remove'><BsTrash /></button><br /><br />
    </div>

    <div  className='bt-crearForm'>
      <button type='submit' className='crear-form'>Click aqui para Crear la Raza</button>

    </div>


</form>
   </div>
    </div>
  )
}

export default CreateBreed;
