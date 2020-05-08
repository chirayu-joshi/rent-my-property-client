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
