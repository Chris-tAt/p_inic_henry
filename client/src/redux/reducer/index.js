import {
    GET_DOG_BY_NAME, 
    // ORDER_ASCEDING_ALPHABETICAL, 
    // ORDER_DESCENDING_ALPHABETICAL, 
    // FILTER_ALL_DOGS,
    // FILTER_CREATE,
    // ORDER_WEIGHT_MIN,
    // ORDER_WEIGHT_MAX, 
    GET_ALL_BREEDS_DOGS, 
    // POST_NAME_DOGS, 
    // GET_DETAIL_CLEAN,
    GET_DETAIL, 
    GET_TEMPERAMENTS
 } from '../action/index';

const initialState = {
    breed: [],
    temperaments: [],
    dogsAllCopi: [],
    detailDog: [],
   
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BREEDS_DOGS:
  return {
    ...state,
    breed: action.payload,
    dogsAllCopy: action.payload
  };
  case GET_TEMPERAMENTS:
  return {
    ...state,
    temperaments: action.payload,
     };
  case GET_DETAIL:
  return {
    ...state,
    detailDog: action.payload,
    
    
  };
  
  case GET_DOG_BY_NAME:
  return {
    ...state,
    breed: action.payload,
    
  };
//   case GET_DETAIL_CLEAN:
//     return {
//         ...state,
//         detailDog: action.payload
//     }
//   case POST_NAME_DOGS:
//   return {
//     ...state,
//     dogsAll: [...action.payload],
    
//   };
//   case ORDER_ASCEDING_ALPHABETICAL:
//     return {
//         ...state,
//         breed: [...state.breed].sort((a, b) => a.name.localeCompare(b.name))
//   };
//   case ORDER_DESCENDING_ALPHABETICAL:
//     return {
//         ...state,
//         breed: [...state.breed].sort((a, b) => b.name.localeCompare(a.name))
    
//   };
//   case FILTER_ALL_DOGS:
//   return {
//     ...state,
//     breed: action.payload,
    
//   };
//   case FILTER_CREATE:
//     // const createdFilter = action.payload === 'Creadas'? state.breed.filter(el => el.createdInDb) : state.breed.filter(el=>!el.createdInDb)
            
//     return {
//         ...state,
//         // breed: createdFilter
//     };
//   case ORDER_WEIGHT_MIN:
//   return {
//     ...state,
//     breed: action.payload,
    
//   };
//   case ORDER_WEIGHT_MAX:
//   return {
//     ...state,
//     breed: action.payload,
    
//   }

  default: 
  return {...state};

 
  
}
}

export default reducer;

