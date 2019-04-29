import * as actionTypes from '../actions/actionTypes/actionTypes.js';
import * as landingActionTypes from '../../Landing/actions/actionTypes/actionTypes.js';

const initialState = {
  venueNames: false,
  categoryRes: false,
  clientType: false,
  clientInfo: {},
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
    case landingActionTypes.SET_CLIENT_TYPE:
      return {
        ...state,
        clientType: action.clientType,
        clientInfo: {...action.clientInfo, ...state.clientInfo},
      };
    default:
      return state
  }
}

export default persistentCommonReducer;
