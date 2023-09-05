import React from 'react';
import "./homeStyles.css";

import Navbar from "../../components/navbar/navbarComponent";
import Cards from "../../components/cards/cardsComponent";

const Home = () => {
  return (
    <div className='home'>
      <h2 className='home-title'>Home</h2>
      <Navbar/>;
      <Cards/>;
    </div>
  )
}

export default Home;
