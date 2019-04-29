import * as actionTypes from '../actions/actionTypes/actionTypes.js';
import { filter } from '../enums/menuEnums.js';
// import stub from '../../../data/airtableDatabaseStub.json';

const initialState = {
  venue: '',
  bffRes: false,
  category: false,
  lang: 'en',
  item: false,
  filter
}

function menuReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_MENU_DATA_SUCCESS:
      return {
        ...state,
        venue: action.venue,
        bffRes: action.res,
        item: action.item,
      }
    case actionTypes.UPDATE_LANG:
      return {
        ...state,
        lang: action.lang,
      }
    case actionTypes.UPDATE_FILTER:
      return {
        ...state,
        filter: action.filter,
      }
    case actionTypes.SET_ITEM_ID:
      return {
        ...state,
        item: action.id,
      }
    case actionTypes.SET_CATEGORY:
      return {
        ...state,
        category: action.category,
      }
    default:
      return state
  }
}

export default menuReducer;
