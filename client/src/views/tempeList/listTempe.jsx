import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { orderByTempe } from "../../redux/action/index"
import Card from "../../components/card/cardComponent"

import Paginacion from '../../components/paginacion/paginado';
import '../tempeList/listTempe.css'


const ListTempe = () => {
    const dispatch = useDispatch()
    const { temperament } = useParams()
    const allBreed = useSelector(state => state.dogsAllCopy)
    // console.log(temperament)
   
    
    
        
    const [actualPage, setActualPage] = useState(1);
    const [pageXdogs] = useState(8);
    const indexOflast = actualPage * pageXdogs; // devuelve 8
    const indexOfFirst = indexOflast - pageXdogs; // 0
    const dogsPage = allBreed.slice(indexOfFirst, indexOflast);
    
    
    const paginado = (pageNumber) => {
        setActualPage(pageNumber);
    };
    useEffect(() => {
        dispatch(orderByTempe(temperament))

    }, [dispatch, temperament])


    if (!allBreed.length) return 'cargando'
    else return (
        <>

        <div className='lista-tempe'>
          
            <div className='lista-Cardtempe'>
                {
                   dogsPage?.map((dog) =>
                   <Card  key={dog.id}
                    id={dog.id} 
                    image={dog?.image}
                     name={dog?.name}
                       weight={dog?.weight}
                        temperament={dog?.Temperaments.map((e) => e.name)} /> 
                   )}
            </div>
            <Paginacion breed={allBreed?.length} pageXdogs={pageXdogs} paginado={paginado}/>
            <div>
                <Link to='/home'><button>Back Home</button></Link>
            </div>
        </div>
       
        </>
    )
}
export default ListTempe;