import * as actionTypes from '../actions/actionTypes';

const initialState = {
  currentStep: 2,
  propertyArea: 0,
  propertyType: ''
}

const changePropertyArea = (state, action) => {
  return {
    ...state,
    propertyArea: action.input
  }
}

const changePropertyType = (state, action) => {
  return {
    ...state,
    propertyType: action.input
  }
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_PROPERTY_AREA: return changePropertyArea(state, action);
    case actionTypes.CHANGE_PROPERTY_TYPE: return changePropertyType(state, action);
    default:
      return state;
  }
}

export default reducer;
