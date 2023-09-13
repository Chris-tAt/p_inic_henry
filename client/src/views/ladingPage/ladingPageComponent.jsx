import React from 'react';
import "./ladingPageStyles.css";
import { Link } from 'react-router-dom';


const LadingPage = () => {
  return (
    <div className="landing-page">
      <div className="icon-container">
      <span className="star-icon">⭐</span>
        <span className="paw-icon">🐾</span>
        <span className="bone-icon">🦴</span>
       
        <span className="heart-icon">❤️</span>
        {/* Agrega más iconos aquí */}
      </div>
      <header>
        <h1>Razas de Perros</h1>
      </header>
      <main>
        <div className="welcome-text">
          <h2>Bienvenido a nuestra página sobre razas de perros</h2>
          <p>Descubre todo sobre tus razas de perros favoritas.</p>
        </div>
        <div className="button-container">
          <Link to='/home'>
          <button className="paw-button">
            <span role="img" aria-label="Pawprint" className="paw-icon">
              🐾
            </span>
          </button>
          </Link>
         
        </div>
      </main>
    </div>
  );
}
export default LadingPage
