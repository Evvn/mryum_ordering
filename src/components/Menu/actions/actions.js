import * as actionTypes from './actionTypes/actionTypes.js';

// export function setLandingRoute(route) {
//   return {
//     type: actionTypes.CHANGE_LANDING_SUBROUTE,
//     route,
//   };
// }

export function getMenuData(venue, item) {
  return {
    type: actionTypes.GET_MENU_DATA_REQUEST,
    venue,
    item,
  }
}

export function updateFilter(filter) {
  return {
    type: actionTypes.UPDATE_FILTER,
    filter,
  }
}

export function setSectionPosition(section, position) {
  return {
    type: actionTypes.SET_SECTION_POSITION_REQUEST,
    section,
    position,
  }
}

export function updateLang(lang) {
  return {
    type: actionTypes.UPDATE_LANG,
    lang,
  }
}

export function setItemId(id) {
  return {
    type: actionTypes.SET_ITEM_ID,
    id,
  }
}

export function clearSectionPositions(){
  return{
    type: actionTypes.CLEAR_SECTION_POSITIONS,
  }
}

export function toggleShowWater() {
  return {
    type: actionTypes.TOGGLE_SHOW_WATER,
  }
}
