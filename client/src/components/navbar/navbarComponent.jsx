import React from 'react';
import "./navbarStyles.css";

const Navbar = ({name, handleChangeInput, handleSubmit}) => {
  return (
    <div className='search-box'>
     <form>
      <input className='search-name' value={name} onChange={handleChangeInput} type='text' placeholder='Buscar por Nombre..' />
      <button type='submit' onClick={handleSubmit} className='bt-buscar'>Buscar</button>
     </form>
    </div>
  )
}

export default Navbar;