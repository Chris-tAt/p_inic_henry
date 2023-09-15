import React from "react";
import "../paginacion/paginado.css"
const Paginacion = ({ breed, pageXdogs, paginado }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(breed / pageXdogs); i++) {
    pageNumber.push(i);
  }

  return (
    <nav className="nav">
      <ul className="ul">
        {pageNumber &&
          pageNumber.map((number) => (
            <button className="btPage" key={number} onClick={() => paginado(number)}>
              {number}
            </button>
          ))}
      </ul>
    </nav>
  )};

export default Paginacion;
