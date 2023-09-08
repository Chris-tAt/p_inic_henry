
import React, { useState } from 'react'
import Navbar from "../navbar/navbarComponent";
import { useDispatch } from 'react-redux';
import {getDogsName} from '../../redux/action';


const SearchDogsName = () => {

  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleChangeInput = (event) => {
    setName(event.target.value);
  }

  const handleSubmit = (event) => {
event.preventDefault()
dispatch(getDogsName(name))
setName('')
  }
  return (
    <div>
      <Navbar name={name} handleChangeInput={handleChangeInput} handleSubmit={handleSubmit}/>
    </div>
  )
}

export default SearchDogsName