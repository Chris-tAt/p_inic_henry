import {
    GET_DOG_BY_NAME, 
    ORDER_ASCEDING_ALPHABETICAL, 
    ORDER_DESCENDING_ALPHABETICAL, 
    ORDER_BY_TEMPE,
    FILTER_CREATE,
    ORDER_WEIGHT_MIN,
    ORDER_WEIGHT_MAX, 
    GET_ALL_BREEDS_DOGS, 
    POST_NEW_DOG, 
    GET_DETAIL_CLEAN,
    GET_DETAIL, 
    GET_TEMPERAMENTS
 } from '../action/index';

const initialState = {
    breed: [],
    temperaments: [],
    dogsAllCopy: [],
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
    dogsAllCopy: action.payload,
    
  };
  case GET_DETAIL_CLEAN:
    return {
        ...state,
        detailDog: action.payload
    }
    case POST_NEW_DOG:
      return {
        ...state,
        dogsAllCopy: [...state.dogsAllCopy, action.payload], 
      };

  case ORDER_ASCEDING_ALPHABETICAL:
    
    return {
        ...state,
        dogsAllCopy: [...state.breed].sort((a, b) => a.name.localeCompare(b.name))
  };
  case ORDER_DESCENDING_ALPHABETICAL:
    
    return {
        ...state,
        dogsAllCopy: [...state.breed].sort((a, b) => b.name.localeCompare(a.name))
       
    
  };
  case ORDER_BY_TEMPE:
  return {
    ...state,
    dogsAllCopy: state.breed.filter(tempe => {
      if (tempe.temperament) {
        return tempe.temperament.includes(action.payload); 
      }
      return false;
    })
  }


  case FILTER_CREATE:
    const dogsCatch = state.dogsAllCopy;
    const allDos =
      action.payload === "sourceDB"
        ? state.breed.filter((dog) => dog.sourceDB)
        : state.breed.filter((dog) => !dog.sourceDB);
    return {
      ...state,
      dogsAllCopy: action.payload === "all" ? dogsCatch : allDos,
    };



case ORDER_WEIGHT_MIN:
  return {
    ...state,
    dogsAllCopy: sortByWeight([...state.breed], ORDER_WEIGHT_MIN),
  };
case ORDER_WEIGHT_MAX:
  return {
    ...state,
    dogsAllCopy: sortByWeight([...state.breed], ORDER_WEIGHT_MAX),
  };
 

  default: 
  return {...state};

 
  
}
}

export default reducer;

