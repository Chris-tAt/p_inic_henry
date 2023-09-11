import axios from "axios";


export const GET_ALL_BREEDS_DOGS = 'GET_ALL_BREEDS_DOGS';
export const GET_DOG_BY_NAME = 'GET_DOG_BY_NAME';
export const ORDER_ASCEDING_ALPHABETICAL = 'ORDER_ASCEDING_ALPHABETICAL';
export const ORDER_DESCENDING_ALPHABETICAL = 'ORDER_DESCENDING_ALPHABETICAL';
// export const FILTER_CREATE = 'FILTER_CREATE';
export const ORDER_BY_TEMPE = 'ORDER_BY_TEMPE';
export const ORDER_WEIGHT_MIN = 'ORDER_WEIGHT_MIN';
export const ORDER_WEIGHT_MAX = 'ORDER_WEIGHT_MAX';
// export const POST_NAME_DOGS = 'POST_NAME_DOGS';
export const  GET_DETAIL = ' GET_DETAIL';
export const GET_DETAIL_CLEAN= 'GET_DETAIL_CLEAN';
export const GET_TEMPERAMENTS  = 'GET_TEMPERAMENTS ';
// const { REACT_APP_API_URL } = process.env
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
export const getAllTemperaments = () => async dispatch => {
    return await fetch(`${miURL}/temperaments`)
       .then(respose => respose.json())
       .then (json => dispatch ({type: GET_TEMPERAMENTS, payload: json}))

}

export const  orderByTempe = (breed) => {
    return {
        type: ORDER_BY_TEMPE,
        payload: breed
    }
}
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

export const getOrderAsceding = (breed) => {
    console.log(breed)
    return {
        type: ORDER_ASCEDING_ALPHABETICAL,
        payload: breed
    }                                        

}
export const getOrderDescending = (breed) => {
    console.log(breed)
    return {
        type: ORDER_DESCENDING_ALPHABETICAL,
        payload: breed
    }

}
export const getWightMin = (breed) => {
    return {
        type:  ORDER_WEIGHT_MIN,
        payload: breed
    }

}
export const getWightMax = (breed) => {
    return {
        type:  ORDER_WEIGHT_MAX,
        payload: breed
    }

}

