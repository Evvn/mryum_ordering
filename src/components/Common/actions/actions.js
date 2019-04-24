import * as actionTypes from './actionTypes/actionTypes.js';

export function getVenueNames() {
  return {
    type: actionTypes.GET_VENUE_NAMES_REQUEST,
  }
}

export function getVenues() {
  return {
    type: actionTypes.GET_VENUES_REQUEST,
  }
}

export function clearState(){
  return {
    type: actionTypes.CLEAR_STATE,
  }
}


