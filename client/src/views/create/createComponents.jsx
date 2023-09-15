import React, { useEffect, useState, useRef } from 'react';
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
const tempeRef = useRef();

useEffect(()=> {
dispatch(getAllTemperaments())
},[dispatch])

const [breedDog, setBreedDog] = useState({
  name: '',
  height_min: '',
  height_max: '',
  weight_min: '',
  weight_max: '',
  life_span: '',
  temperament: [],
})

const [errors, setErrors] = useState({})


const handleBreedDogChange = (event) => {
 
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
  event.preventDefault();
  const selectedValue = tempeRef.current.value;

  // Verificamos si selectedValue ya existe en temperament
  if (!breedDog.temperament.includes(selectedValue)) {
    const updatedTemperament =
      breedDog.temperament.length > 0
        ? breedDog.temperament + ', ' + selectedValue
        : selectedValue;

    setBreedDog((prevBreedDog) => ({
      ...prevBreedDog,
      temperament: updatedTemperament,
    }));
  }

  tempeRef.current.value = '';
  console.log();
}
  // const validaError = validationBreed({
  //   ...breedDog,
  //   [name]: selectedValue,
  // })
  // setErrors({
  //    ...errors,
  //    [name]: validaError[name],
  // });
// }

const handleClear = (event) => {
  
  setBreedDog({
    ...breedDog,
    temperament: [],
  })
}

// // if(Object.values(errors).length) {
  // //   alert('Algo esta Incorrecto en algun Items')
  // }else
  const handleSubmit = (event) => {
    event.preventDefault();
  
    
    const temperamentsNotArray = breedDog.temperament
    
    if (
      breedDog.name === '' ||
      breedDog.height_min === '' ||
      breedDog.height_max === '' ||
      breedDog.weight_min === '' ||
      breedDog.weight_max === '' ||
      breedDog.life_span === '' ||
      temperamentsNotArray.length === 0
    ) {
      alert('Algunos campos están incompletos');
    } else {
      // console.log('Datos que se enviarán al servidor:', breedDog)
      dispatch(postNewDog({
        ...breedDog,
        temperament: temperamentsNotArray, // Envía el array al backend
      }));
      alert('Nueva Raza Creada Exitosamente');
      setBreedDog({
        name: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        life_span: '',
        temperament: [],
      });
      // navigate('/home');
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

            <input name='height_max' type='number' value={breedDog.height_max } onChange={handleBreedDogChange}  placeholder='Máx ctms'></input>
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
            <input name='life_span' type='text' value={breedDog.life_span} onChange={handleBreedDogChange} placeholder='Años de vida'></input>
            <small className='stylesLifespan'>{errors.life_span}</small>
        </div>
        
    </div>

    <div className="grupo-formulario">
   
      
        <label><b>Temperament: </b></label><br></br>
<small>Choose a temperament from the dropdown list or enter your own and then click on 'Add'</small><br></br>
<input list='temperaments' name='temperament' ref={tempeRef}></input>
<button onClick={e => handleSelect(e)} title='Add'><GrFormAdd/></button>
<datalist id='temperaments'>
  {breedtemperamentos.map(e => <option value={e.name} key={e.id}></option>)}
</datalist>

<input name='temperament' readOnly='readonly' value={breedDog.temperament}></input>
<button onClick={(e) => handleClear(e)} title='Clear' id='remove'><BsTrash/></button>
<br></br><br></br>
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
