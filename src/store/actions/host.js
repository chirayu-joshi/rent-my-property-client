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
