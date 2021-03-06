import * as actionTypes from "../actions/actionTypes/actionTypes.js";

const initialState = {
  currentOrder: {},
  paymentRes: false,
  orderTotal: 0,
  processingPayment: false,
  paymentError: false,
  stripeCustomer: false
};

function persistentCartReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_ORDER_SUCCESS:
      return {
        ...state,
        currentOrder: action.currentOrder
      };
    case actionTypes.REMOVE_FROM_ORDER_SUCCESS:
      return {
        ...state,
        currentOrder: action.currentOrder
      };
    case actionTypes.MAKE_STRIPE_CHARGE_REQUEST:
      return {
        ...state,
        processingPayment: true
      };
    case actionTypes.MAKE_STRIPE_CHARGE_SUCCESS:
      return {
        ...state,
        paymentRes: action.res,
        processingPayment: false
      };
    case actionTypes.MAKE_STRIPE_CHARGE_FAILURE:
      return {
        ...state,
        paymentRes: false,
        processingPayment: false,
        paymentError: action.error
      };
    case actionTypes.CREATE_STRIPE_CUSTOMER_SUCCESS:
      return {
        ...state,
        stripeCustomer: action.res
      };
    case actionTypes.CREATE_STRIPE_CUSTOMER_FAILURE:
      return {
        ...state,
        stripeCustomer: action.error
      };
    case actionTypes.CLEAR_STRIPE_CUSTOMER:
      return {
        ...state,
        stripeCustomer: false
      };
    case actionTypes.CLEAR_STRIPE_RES:
      return {
        ...state,
        paymentRes: false,
        paymentError: false,
        currentOrder: {} // reset current order to empty
      };
    case actionTypes.CLEAR_STRIPE_ERR:
      return {
        ...state,
        paymentRes: false,
        paymentError: false
      };
    case actionTypes.UPDATE_ORDER_TOTAL:
      return {
        ...state,
        orderTotal: action.orderTotal
      };
    default:
      return state;
  }
}

export default persistentCartReducer;
