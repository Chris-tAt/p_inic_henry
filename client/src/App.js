// import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from "./views/home/homeComponent";
import DetailDog from "./views/detail/detailComponent";
import CreateBreed from "./views/create/createComponents";
import About from "./views/about/aboutComponent";
import LadingPage from './views/ladingPage/ladingPageComponent';


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<LadingPage/>}/>
     <Route path="/home" element={<Home/>}/>
     <Route path="/dogs/:id" element={<DetailDog/>}/>
     <Route path="/crear" element={<CreateBreed/>}/>
     <Route path="/about" element={<About/>}/>

      </Routes>
    </div>
 
    
  );
}

export default App;
