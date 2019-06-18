import * as actionTypes from "./actionTypes/actionTypes.js";

export function addToCart(item, quantity, addOns) {
  return {
    type: actionTypes.ADD_TO_ORDER_REQUEST,
    item,
    quantity,
    addOns
  };
}

export function removeFromCart(id) {
  return {
    type: actionTypes.REMOVE_FROM_ORDER_REQUEST,
    id
  };
}

export function makePayment(
  token,
  amount,
  desc,
  order,
  clientInfo,
  email,
  stripeCustomer
) {
  return {
    type: actionTypes.MAKE_STRIPE_CHARGE_REQUEST,
    token,
    amount,
    desc,
    order,
    clientInfo,
    email,
    stripeCustomer
  };
}

export function createCustomer(token, clientInfo, email) {
  return {
    type: actionTypes.CREATE_STRIPE_CUSTOMER_REQUEST,
    token,
    clientInfo,
    email
  };
}

export function clearCustomer() {
  return {
    type: actionTypes.CLEAR_STRIPE_CUSTOMER
  };
}

export function clearStripeRes() {
  return {
    type: actionTypes.CLEAR_STRIPE_RES
  };
}

export function clearStripeErr() {
  return {
    type: actionTypes.CLEAR_STRIPE_ERR
  };
}

export function updateOrderTotal(orderTotal) {
  return {
    type: actionTypes.UPDATE_ORDER_TOTAL,
    orderTotal
  };
}
