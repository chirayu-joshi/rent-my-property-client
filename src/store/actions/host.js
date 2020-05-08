import * as actionTypes from './actionTypes';

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


// --------------------------------------
