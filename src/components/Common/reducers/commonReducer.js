import * as actionTypes from "../actions/actionTypes/actionTypes.js";
import * as menuActionTypes from "../../Menu/actions/actionTypes/actionTypes.js";

const initialState = {
  isLoading: false,
  searchTerm: "",
  searchRes: [],
  searchLength: 0
};

function commonReducer(state = initialState, action) {
  switch (action.type) {
    case menuActionTypes.GET_MENU_DATA_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case menuActionTypes.GET_MENU_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case actionTypes.GET_VENUE_NAMES_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.GET_VENUE_NAMES_SUCCESS:
      return {
        ...state,
        venueNames: action.res,
        isLoading: false
      };
    case actionTypes.GET_TWILIO_CODE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.GET_TWILIO_CODE_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case actionTypes.CHECK_TWILIO_CODE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.CHECK_TWILIO_CODE_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case actionTypes.SET_SEARCH_RESULT:
      return {
        ...state,
        searchTerm: action.searchTerm,
        searchRes: action.searchRes,
        searchLength: action.searchLength
      };
    default:
      return state;
  }
}

export default commonReducer;
