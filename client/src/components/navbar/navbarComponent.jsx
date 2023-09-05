import React from 'react';
import "./navbarStyles.css";

const Navbar = () => {
  return (
    <div className='search-box'>
     <form>
      <input placeholder='Buscar por Nombre' />
      <button>Buscar</button>
     </form>
    </div>
  )
}

export default Navbar;