import * as actionTypes from '../actions/actionTypes';

const initialState = {
  currentStep: 2,
  propertyArea: 0,
  propertyType: '',
  guestCapacity: 1,
  rooms: 1,
  beds: 2,
  amenities: [],
  facilities: []
}
// -----------------------------------
const changePropertyArea = (state, action) => {
  return {
    ...state,
    propertyArea: action.input
  }
}
// -----------------------------------
const changePropertyType = (state, action) => {
  return {
    ...state,
    propertyType: action.input
  }
}
// -----------------------------------
const increaseGuestCapacity = (state, action) => {
  return {
    ...state,
    guestCapacity: state.guestCapacity + 1
  }
}

const decreaseGuestCapacity = (state, action) => {
  if (state.guestCapacity <= 1) {
    return {
      ...state,
      guestCapacity: 1
    }
  } else {
    return {
      ...state,
      guestCapacity: state.guestCapacity - 1
    }
  }
}
// -----------------------------------
const increaseRooms = (state, action) => {
  return {
    ...state,
    rooms: state.rooms + 1
  }
}

const decreaseRooms = (state, actions) => {
  if (state.rooms <= 1) {
    return {
      ...state,
      rooms: 1
    }
  } else {
    return {
      ...state,
      rooms: state.rooms - 1
    }
  }
}
// -----------------------------------
const increaseBeds = (state, actions) => {
  return {
    ...state,
    beds: state.beds + 1
  }
}

const decreaseBeds = (state, actions) => {
  if (state.beds <= 1) {
    return {
      ...state,
      beds: 1
    }
  } else {
    return {
      ...state,
      beds: state.beds - 1
    }
  }
}
// -----------------------------------
const addAmenity = (state, action) => {
  return {
    ...state,
    amenities: [...state.amenities, action.amenity]
  }
}

const removeAmenity = (state, action) => {
  return {
    ...state,
    amenities: state.amenities.filter(amenity => amenity !== action.amenity)
  }
}
// -----------------------------------
const addFacility = (state, action) => {
  return {
    ...state,
    facilities: [...state.facilities, action.facility]
  }
}

const removeFacility = (state, action) => {
  return {
    ...state,
    facilities: state.facilities.filter(facility => facility !== action.facility)
  }
}
// -----------------------------------
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_PROPERTY_AREA: return changePropertyArea(state, action);
    case actionTypes.CHANGE_PROPERTY_TYPE: return changePropertyType(state, action);
    case actionTypes.INC_GUEST_CAPACITY: return increaseGuestCapacity(state, action);
    case actionTypes.DEC_GUEST_CAPACITY: return decreaseGuestCapacity(state, action);
    case actionTypes.INC_ROOMS: return increaseRooms(state, action);
    case actionTypes.DEC_ROOMS: return decreaseRooms(state, action);
    case actionTypes.INC_BEDS: return increaseBeds(state, action);
    case actionTypes.DEC_BEDS: return decreaseBeds(state, action);
    case actionTypes.ADD_AMENITY: return addAmenity(state, action);
    case actionTypes.REMOVE_AMENITY: return removeAmenity(state, action);
    case actionTypes.ADD_FACILITY: return addFacility(state, action);
    case actionTypes.REMOVE_FACILITY: return removeFacility(state, action);
    default:
      return state;
  }
}

export default reducer;
