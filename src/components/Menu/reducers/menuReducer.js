// eslint-disable-next-line
import * as actionTypes from '../actions/actionTypes/actionTypes.js';
import { sortByValue } from '../../../utils/objectUtils.js';

const initialState = {
  isTest: true,
  isQR: false,
  isBroadsheet: false,
  venueurl: '',
  sections: [],
  definitions: [],
  showModal: false,
  showMenuLink: false,
  showBroadsheetLink: false,
  menuUrl: '',
  broadsheetLink: '',
  sectionPositions: false,
  showWater: false,
}

function menuReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_FILTER:
      return {
        ...state,
        filter: action.filter,
      }
    case actionTypes.SET_SECTION_POSITION_SUCCESS:
      return {
        ...state,
        sectionPositions: sortByValue({...action.sectionPositions, ...state.sectionPositions ? state.sectionPositions : {}}),
      }
    case actionTypes.CLEAR_SECTION_POSITIONS:
      return {
        ...state,
        sectionPositions: false,
      }
    case actionTypes.TOGGLE_SHOW_WATER:
      return {
        ...state,
        showWater: !state.showWater,
      }
    default:
      return state
  }
}

export default menuReducer;
