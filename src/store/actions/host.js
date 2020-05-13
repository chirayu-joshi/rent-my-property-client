import * as actionTypes from './actionTypes';

export const changeStep = () => {
  return {
    type: actionTypes.CHANGE_STEP
  }
}
// --------------------------------------
export const changePropertyType = input => {
  return {
    type: actionTypes.CHANGE_PROPERTY_TYPE,
    input: input
  }
}

export const changePropertyArea = input => {
  return {
    type: actionTypes.CHANGE_PROPERTY_AREA,
    input: input
  }
}
// --------------------------------------
export const increaseGuestCapacity = () => {
  return {
    type: actionTypes.INC_GUEST_CAPACITY
  }
}

export const decreaseGuestCapacity = () => {
  return {
    type: actionTypes.DEC_GUEST_CAPACITY
  }
}
// --------------------------------------
export const increaseRooms = () => {
  return {
    type: actionTypes.INC_ROOMS
  }
}

export const decreaseRooms = () => {
  return {
    type: actionTypes.DEC_ROOMS
  }
}
// --------------------------------------
export const increaseBeds = () => {
  return {
    type: actionTypes.INC_BEDS
  }
}

export const decreaseBeds = () => {
  return {
    type: actionTypes.DEC_BEDS
  }
}
// --------------------------------------
export const addAmenity = amenity => {
  return {
    type: actionTypes.ADD_AMENITY,
    amenity: amenity
  }
}

export const removeAmenity = amenity => {
  return {
    type: actionTypes.REMOVE_AMENITY,
    amenity: amenity
  }
}
// --------------------------------------
export const addFacility = facility => {
  return {
    type: actionTypes.ADD_FACILITY,
    facility: facility
  }
}

export const removeFacility = facility => {
  return {
    type: actionTypes.REMOVE_FACILITY,
    facility: facility
  }
}
// --------------------------------------
export const changePropertyName = value => {
  return {
    type: actionTypes.CHANGE_PROPERTY_NAME,
    value: value
  }
}

export const changePropertyDesc = value => {
  return {
    type: actionTypes.CHANGE_PROPERTY_DESC,
    value: value
  }
}
// --------------------------------------
export const setLocation = location => {
  return {
    type: actionTypes.SET_LOCATION,
    location: location
  }
}
// --------------------------------------
export const changeCountry = country => {
  return {
    type: actionTypes.CHANGE_COUNTRY,
    country: country
  }
}
// --------------------------------------
export const changeState = state => {
  return {
    type: actionTypes.CHANGE_STATE,
    state: state
  }
}
// --------------------------------------
export const changeCity = city => {
  return {
    type: actionTypes.CHANGE_CITY,
    city: city
  }
}
// --------------------------------------
export const changeStreet = street => {
  return {
    type: actionTypes.CHANGE_STREET,
    street: street
  }
}
// --------------------------------------
export const changeNumber = number => {
  return {
    type: actionTypes.CHANGE_NUMBER,
    number: number
  }
}
// --------------------------------------
export const changePrice = price => {
  return {
    type: actionTypes.CHANGE_PRICE,
    price: price
  }
}
// --------------------------------------
export const changeSchedule = schedule => {
  return {
    type: actionTypes.CHANGE_SCHEDULE,
    schedule: schedule
  }
}
