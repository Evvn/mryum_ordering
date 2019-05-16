import * as actionTypes from "../../components/Common/actions/actionTypes/actionTypes.js";
// eslint-disable-next-line
import { takeLatest, put, select } from "redux-saga/effects";
import callBff from "../callBff.js";

export function* getVenueNames(action) {
  try {
    const res = yield callBff(`venues`, "POST", { category: "list" }).then(
      response => response
    );
    yield put({
      type: actionTypes.GET_VENUE_NAMES_SUCCESS,
      res
    });
  } catch (error) {
    console.log(error);
    // window.location = "/servererror";
    yield put({
      type: actionTypes.GET_VENUE_NAMES_FAILURE,
      error
    });
  }
}

export function* getVenues(action) {
  try {
    const res = yield callBff(`venues`, "POST", { category: "brunch" }).then(
      response => response
    );
    yield put({
      type: actionTypes.GET_VENUES_SUCCESS,
      res
    });
  } catch (error) {
    console.log(error);
    // window.location = "/servererror";
    yield put({
      type: actionTypes.GET_VENUES_FAILURE,
      error
    });
  }
}

export function* getTwilioCode(action) {
  try {
    const res = yield callBff(`ordering/getTwilioCode`, "POST", {
      phoneNumber: action.phoneNumber
    }).then(response => response);
    yield put({
      type: actionTypes.GET_TWILIO_CODE_SUCCESS,
      res
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: actionTypes.GET_TWILIO_CODE_FAILURE,
      error
    });
  }
}

export function* checkTwilioCode(action) {
  try {
    const res = yield callBff(`ordering/checkTwilioCode`, "POST", {
      phoneNumber: action.phoneNumber,
      code: action.code
    }).then(response => response);
    yield put({
      type: actionTypes.CHECK_TWILIO_CODE_SUCCESS,
      res
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: actionTypes.CHECK_TWILIO_CODE_FAILURE,
      error
    });
  }
}

export function* actionWatcher() {
  yield [
    takeLatest(actionTypes.GET_VENUE_NAMES_REQUEST, getVenueNames),
    takeLatest(actionTypes.GET_VENUES_REQUEST, getVenues),
    takeLatest(actionTypes.GET_TWILIO_CODE_REQUEST, getTwilioCode),
    takeLatest(actionTypes.CHECK_TWILIO_CODE_REQUEST, checkTwilioCode)
  ];
}
