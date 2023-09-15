import axios from "axios";


export const GET_ALL_BREEDS_DOGS = 'GET_ALL_BREEDS_DOGS';
export const GET_DOG_BY_NAME = 'GET_DOG_BY_NAME';
export const ORDER_ASCEDING_ALPHABETICAL = 'ORDER_ASCEDING_ALPHABETICAL';
export const ORDER_DESCENDING_ALPHABETICAL = 'ORDER_DESCENDING_ALPHABETICAL';
export const FILTER_CREATE = 'FILTER_CREATE';
export const ORDER_BY_TEMPE = 'ORDER_BY_TEMPE';
export const ORDER_WEIGHT_MIN = 'ORDER_WEIGHT_MIN';
export const ORDER_WEIGHT_MAX = 'ORDER_WEIGHT_MAX';
export const POST_NEW_DOG = 'POST_NEW_DOG';
export const  GET_DETAIL = ' GET_DETAIL';
export const GET_DETAIL_CLEAN= 'GET_DETAIL_CLEAN';
export const GET_TEMPERAMENTS  = 'GET_TEMPERAMENTS ';
const miURL ='http://localhost:3001';  

    

export const getAllBreedsOrDogs = () => {
  return async (dispatch) => {
    try {
        const response = await axios(`${miURL}/dogs`);
        return dispatch({
            type: GET_ALL_BREEDS_DOGS,
            payload:response.data
        })
    } catch (error) {
        return dispatch({
            type: GET_ALL_BREEDS_DOGS,
            payload: error
        })
        
    }

  }
};
export const getAllTemperaments = () => {
   return async function(dispatch){
    try {
        const response = await axios.get(`${miURL}/temperaments`)
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload:response.data
        })
    } catch (error) {
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload:error.response
        })
    }
   }

}



export const orderByTempe = (temperament) => {
    return  {
        type: ORDER_BY_TEMPE,
        payload: temperament
      }
  };
  
      
export const getDogsName = (name) => {
    return async (dispatch) => {
      try {
          const response = await axios(`${miURL}/dogs/?name=${name}`);
          return dispatch({
              type: GET_DOG_BY_NAME,
              payload:response.data
          })
      } catch (error) {
        return alert ('¡Raza del Dog no encontrada!')
    }
   }

}


export const getDetailDogs = (id) => {
  
return async function(dispatch) {
    try {
        const response = await axios(`http://localhost:3001/dogs/${id}`)
        return dispatch({
            type: GET_DETAIL,
            payload: response.data
        })  
    } catch (error) {
        return alert ('¡Datos del Dog no encontrados!') 
    }
}
}

export const getDetailClean = () => {
    return {
        type: GET_DETAIL_CLEAN,
        payload: ''
    }

}

export const getOrderAsceding = (payload) => {
    
    return {
        type: ORDER_ASCEDING_ALPHABETICAL,
        payload
    }                                        

}
export const getOrderDescending = (payload) => {
    
    return {
        type: ORDER_DESCENDING_ALPHABETICAL,
        payload
    }

}
export const getWightMin = (payload) => {
    return {
        type:  ORDER_WEIGHT_MIN,
        payload
    }

}
export const getWightMax = (payload) => {
    return {
        type:  ORDER_WEIGHT_MAX,
        payload
    }

}

export const filterCreateBreeds = (payload) => {
    return {
        type: 'FILTER_CREATE',
        payload
    }
}

export const postNewDog = (payload) => {
    return async (dispatch) => {
      try {
        const response = await axios.post('http://localhost:3001/dogs/', payload);
        return dispatch({
          type: POST_NEW_DOG,
          payload: response.data, 
        });
      } catch (error) {
        return alert ('¡algo salio mal!') 
        };
      }
    };
  