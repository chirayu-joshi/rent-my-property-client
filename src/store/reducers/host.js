import * as actionTypes from '../actions/actionTypes';

const initialState = {
  currentStep: 3,
  propertyArea: 0,
  propertyType: '',
  guestCapacity: 1,
  rooms: 1,
  beds: 2,
  amenities: [],
  facilities: [],
  propertyName: '',
  propertyDescription: '',
  location: { lat: 0, lon: 0 },
  country: '',
  state: '',
  city: '',
  street: '',
  number: '',
  price: 0,
  schedule: { checkIn: new Date(), checkOut: new Date() }
}
// -----------------------------------
const changeStep = (state, action) => {
  if (state.currentStep < 4) {
    return {
      ...state,
      currentStep: state.currentStep + 1
    }
  }
  return {...state};
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
const changePropertyName = (state, action) => {
  return {
    ...state,
    propertyName: action.value
  }
}
// -----------------------------------
const changePropertyDesc = (state, action) => {
  return {
    ...state,
    propertyDescription: action.value
  }
}
// -----------------------------------
const setLocation = (state, action) => {
  return {
    ...state,
    location: action.location
  }
}
// -----------------------------------
const changeCountry = (state, action) => {
  return {
    ...state,
    country: action.country
  }
}
// -----------------------------------
const changeState = (state, action) => {
  return {
    ...state, 
    state: action.state
  }
}
// -----------------------------------
const changeCity = (state, action) => {
  return {
    ...state, 
    city: action.city
  }
}
// -----------------------------------
const changeStreet = (state, action) => {
  return {
    ...state, 
    street: action.street
  }
}
// -----------------------------------
const changeNumber = (state, action) => {
  return {
    ...state,
    number: action.number
  }
}
// -----------------------------------
const changePrice = (state, action) => {
  return {
    ...state,
    price: action.price
  }
}
// -----------------------------------
const changeSchedule = (state, action) => {
  return {
    ...state,
    schedule: {
      checkIn: action.schedule.checkIn,
      checkOut: action.schedule.checkOut
    }
  }
}
// -----------------------------------
// -----------------------------------
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_STEP: return changeStep(state, action);
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
    case actionTypes.CHANGE_PROPERTY_NAME: return changePropertyName(state, action);
    case actionTypes.CHANGE_PROPERTY_DESC: return changePropertyDesc(state, action);
    case actionTypes.SET_LOCATION: return setLocation(state, action);
    case actionTypes.CHANGE_COUNTRY: return changeCountry(state, action);
    case actionTypes.CHANGE_STATE: return changeState(state, action);
    case actionTypes.CHANGE_CITY: return changeCity(state, action);
    case actionTypes.CHANGE_STREET: return changeStreet(state, action);
    case actionTypes.CHANGE_NUMBER: return changeNumber(state, action);
    case actionTypes.CHANGE_PRICE: return changePrice(state, action);
    case actionTypes.CHANGE_SCHEDULE: return changeSchedule(state, action);
    default:
      return state;
  }
}

export default reducer;
