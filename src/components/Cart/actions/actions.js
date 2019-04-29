import * as actionTypes from './actionTypes/actionTypes.js';

export function addToCart(item, quantity) {
  return {
    type: actionTypes.ADD_TO_ORDER_REQUEST,
    item,
    quantity,
  };
}

export function removeFromCart(id) {
    return {
      type: actionTypes.REMOVE_FROM_ORDER_REQUEST,
      id,
    };
  }

export function makePayment(token, amount, desc, email) {
  return {
    type: actionTypes.MAKE_STRIPE_CHARGE,
    token,
    amount,
    desc,
    email,
  };
}
