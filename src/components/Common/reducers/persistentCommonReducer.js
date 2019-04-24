import * as actionTypes from '../actions/actionTypes/actionTypes.js';

const initialState = {
  venueNames: false,
  categoryRes: false,
}

function persistentCommonReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_VENUE_NAMES_SUCCESS:
      return {
        ...state,
        venueNames: action.res
      }
    case actionTypes.GET_VENUES_SUCCESS:
      return {
        ...state,
        categoryRes: action.res,
      }
    case action.type === 'CLEAR_STATE':
      return {
        ...initialState,
      };
    default:
      return state
  }
}

export default persistentCommonReducer;
