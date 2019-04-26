import * as actionTypes from '../actions/actionTypes/actionTypes.js';

const initialState = {
  currentOrder = false,
}

function persistentCartReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        currentOrder: action.currentOrder,
      }
    case actionTypes.REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        currentOrder: action.currentOrder,
      }
    default:
      return state
  }
}

export default persistentCartReducer;
