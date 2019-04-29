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

export function makePayment(token, amount, desc) {
  return {
    type: actionTypes.MAKE_STRIPE_CHARGE,
    token,
    amount,
    desc
  };
}

export function updateOrderTotal(orderTotal) {
  return {
    type: actionTypes.UPDATE_ORDER_TOTAL,
    orderTotal,
  };
}
