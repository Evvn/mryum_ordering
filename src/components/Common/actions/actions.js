import * as actionTypes from "./actionTypes/actionTypes.js";

export function getVenueNames() {
  return {
    type: actionTypes.GET_VENUE_NAMES_REQUEST
  };
}

export function getVenues() {
  return {
    type: actionTypes.GET_VENUES_REQUEST
  };
}

export function clearState() {
  return {
    type: actionTypes.CLEAR_STATE
  };
}

export function setSearchRes(searchTerm, searchRes, searchLength) {
  return {
    type: actionTypes.SET_SEARCH_RESULT,
    searchTerm,
    searchRes,
    searchLength
  };
}

export function getTwilioCode(phoneNumber) {
  return {
    type: actionTypes.GET_TWILIO_CODE_REQUEST,
    phoneNumber
  };
}

export function checkTwilioCode(phoneNumber, code) {
  return {
    type: actionTypes.CHECK_TWILIO_CODE_REQUEST,
    phoneNumber,
    code
  };
}
