import * as actionTypes from '../../components/Cart/actions/actionTypes/actionTypes.js';
// eslint-disable-next-line
import _ from 'lodash';
import { takeLatest, put, select,} from 'redux-saga/effects';
import * as orderUtils from '../../utils/orderUtils.js';
import { actions } from 'redux-router5';



export function* addToOrder(action) {
  try {
    
    const getCurrentOrder = state => state.persistentCart.currentOrder;
    let currentOrder = yield select(getCurrentOrder);
    const newItem = yield orderUtils.buildItemTemplate(action.item, action.quantity);
    let orderClone = yield _.cloneDeep(currentOrder);

    const nextCurrentOrder = {};
    
    if(orderClone[newItem.id]){
        nextCurrentOrder[newItem.id] = [newItem].concat(orderClone[newItem.id]);
    }
    else{
      nextCurrentOrder[newItem.id] = [newItem];
    }

    yield put({
      type: actionTypes.ADD_TO_ORDER_SUCCESS,
      currentOrder: {...nextCurrentOrder, ...orderClone},
    });

  } catch (error) {
    console.log(error)
    yield put({
      type: actionTypes.ADD_TO_ORDER_FAILURE,
      error,
    })
  }
}

export function* removeFromOrder(action) {
  try {
    const getCurrentOrder = state => state.persistentCart.currentOrder;
    let currentOrder = yield select(getCurrentOrder);
    let orderClone = yield _.cloneDeep(currentOrder);
    yield console.log(orderClone);
    delete orderClone[action.id];
      yield put({
        type: actionTypes.REMOVE_FROM_ORDER_SUCCESS,
        currentOrder: orderClone,
      })
  } catch (error) {
    console.log(error)
    yield put({
      type: actionTypes.REMOVE_FROM_ORDER_FAILURE,
      error,
    })
  }
}

/*****************************************************
 *  Needs to be moved to backend since stripe secret
 *  is needed
*/
const stripeAuthHeader = {
  "Content-Type": "application/x-www-form-urlencoded",
  Authorization: `Bearer ${process.env.REACT_APP_STRIPE_SK}` // ask for this later
};

export function* makePayment(action) {
  try {
    yield fetch("https://api.stripe.com/v1/charges",{
      method: 'POST',
      body: {
        source: action.token.id,
        amount: actions.amount,
        description: actions.desc,
        currency: 'aud'
      },
      headers: stripeAuthHeader
    }).then(res => res.json())
    .then(response => {
      console.log('Success:', JSON.stringify(response))
      // then call bff stuff for airtable, ask about specifics later
      /*
        const getCurrentOrder = state => state.persistentCart.currentOrder;
        let currentOrder = yield select(getCurrentOrder);
 
        yield put({
          type: actionTypes.RECORD_ORDER, // have another saga for action type then empty cart
          id: response.data,
          cartItems: currentOrder.items,
        }) 
      */

      }).catch(error => console.error('Error:', error));
  } catch (error) {
    console.log(error)
  }
}
/**************************************************** */


export function* actionWatcher() {
  yield [
    takeLatest(actionTypes.ADD_TO_ORDER_REQUEST, addToOrder),
    takeLatest(actionTypes.REMOVE_FROM_ORDER_REQUEST, removeFromOrder),
    takeLatest(actionTypes.MAKE_STRIPE_CHARGE, makePayment)
  ]
}
