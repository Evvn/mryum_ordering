import * as actionTypes from './actionTypes/actionTypes.js';

export function addToOrder(item, quantity) {
  return {
    type: actionTypes.ADD_TO_ORDER_REQUEST,
    item,
    quantity,
  };
}

export function removeFromOrder(item, quantity) {
    return {
      type: actionTypes.REMOVE_FROM_ORDER_REQUEST,
      item,
      quantity,
    };
  }
