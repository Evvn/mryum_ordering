import * as actionTypes from '../../components/Cart/actions/actionTypes/actionTypes.js';
// eslint-disable-next-line
import { takeLatest, put, select } from 'redux-saga/effects';

const getCurrentOrder = state => state.persistentCart.currentOrder;

export function* addToCart(action) {
  try {
    const currentOrder = yield select(getCurrentOrder);
    
      yield put({
        type: actionTypes.ADD_TO_CART_SUCCESS,
        currentOrder,
      })
  } catch (error) {
    console.log(error)
    yield put({
      type: actionTypes.ADD_TO_CART_FAILURE,
      error,
    })
  }
}

export function* removeFromCart(action) {
  try {
    const currentOrder = yield select(getCurrentOrder);
      yield put({
        type: actionTypes.REMOVE_FROM_CART_SUCCESS,
        currentOrder,
      })
  } catch (error) {
    console.log(error)
    yield put({
      type: actionTypes.REMOVE_FROM_CART_FAILURE,
      error,
    })
  }
}

export function* actionWatcher() {
  yield [
    takeLatest(actionTypes.ADD_TO_CART_REQUEST, addToCart),
    takeLatest(actionTypes.REMOVE_FROM_CART_REQUEST, removeFromCart),
  ]
}
