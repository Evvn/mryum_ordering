import * as actionTypes from './actionTypes/actionTypes.js';

export function addToCart(item, quantity) {
  return {
    type: actionTypes.ADD_TO_ORDER_REQUEST,
    item,
    quantity,
  };
}

export function removeFromCart(item, quantity) {
    return {
      type: actionTypes.REMOVE_FROM_ORDER_REQUEST,
      item,
      quantity,
    };
  }
