import {
    GET_DOG_BY_NAME, 
    ORDER_ASCEDING_ALPHABETICAL, 
    ORDER_DESCENDING_ALPHABETICAL, 
    ORDER_BY_TEMPE,
    // FILTER_CREATE,
    ORDER_WEIGHT_MIN,
    ORDER_WEIGHT_MAX, 
    GET_ALL_BREEDS_DOGS, 
    // POST_NAME_DOGS, 
    GET_DETAIL_CLEAN,
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

  const sortByWeight = (breed, order) => {
    return breed.sort((a, b) => {
      const [aMin, aMax] = a.weight.split(" - ").map(Number);
      const [bMin, bMax] = b.weight.split(" - ").map(Number);
  
      if (order === ORDER_WEIGHT_MIN) {
        return aMin - bMin || aMax - bMax;
      } else if (order === ORDER_WEIGHT_MAX) {
        return bMax - aMax || bMin - aMin;
      }
  
      return 0;
    });
  };
  
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
  case GET_DETAIL_CLEAN:
    return {
        ...state,
        detailDog: action.payload
    }
//   case POST_NAME_DOGS:
//   return {
//     ...state,
//     dogsAll: [...action.payload],
    
//   };
  case ORDER_ASCEDING_ALPHABETICAL:
    return {
        ...state,
        breed: [...state.breed].sort((a, b) => a.name.localeCompare(b.name))
  };
  case ORDER_DESCENDING_ALPHABETICAL:
    return {
        ...state,
        breed: [...state.breed].sort((a, b) => b.name.localeCompare(a.name))
    
  };
  case ORDER_BY_TEMPE:
    const dogsAllCopy = state.dogsAllCopy;
    const filterTempe = action.payload === 'All'
    ? dogsAllCopy
    : dogsAllCopy.filter((element) => {
      if(typeof element.temperament === 'string')
      return element.temperament.includes(action.payload)
    if(Array.isArray(element.temps)){
      let temperamentos = element.map((element) => element.name)
      return temperamentos.includes(action.payload)
    }
    return true
    })
  return {
    ...state,
    breed: filterTempe,
    
  };
//   case FILTER_CREATE:
//     // const createdFilter = action.payload === 'Creadas'? state.breed.filter(el => el.createdInDb) : state.breed.filter(el=>!el.createdInDb)
            
//     return {
//         ...state,
//         // breed: createdFilter
//     };


// En tu reducer:
case ORDER_WEIGHT_MIN:
  return {
    ...state,
    breed: sortByWeight([...state.breed], ORDER_WEIGHT_MIN),
  };
case ORDER_WEIGHT_MAX:
  return {
    ...state,
    breed: sortByWeight([...state.breed], ORDER_WEIGHT_MAX),
  };
 

  default: 
  return {...state};

 
  
}
}

export default reducer;

