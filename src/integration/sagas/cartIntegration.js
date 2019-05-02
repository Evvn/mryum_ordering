import * as actionTypes from '../../components/Cart/actions/actionTypes/actionTypes.js';
// eslint-disable-next-line
import _ from 'lodash';
import { takeLatest, put, select,} from 'redux-saga/effects';
import * as orderUtils from '../../utils/orderUtils.js';
import callBff from '../callBff.js'
import Airtable from 'airtable'

export function* addToOrder(action) {
  try {
    const getCurrentOrder = state => state.persistentCart.currentOrder;
    let currentOrder = yield select(getCurrentOrder);
    const newItem = yield orderUtils.buildItemTemplate(action.item, action.quantity, action.addOns);
    let orderClone = yield _.cloneDeep(currentOrder);

    const nextCurrentOrder = {};

    // grab new item addons as array
    // if item is in cart, check if addons match
    // if yes, update quantity
    // if no, make new item with addons
    // update remove from cart to check addons as well

    let newAddons = (newItem.addOns || []).map(addon => addon.record_id)

    if (orderClone[newAddons.join('')+newItem.id]){
      let oldAddons = (orderClone[newAddons.join('')+newItem.id][0].addOns || []).map(addon => addon.record_id)
      if (newAddons.join('') === oldAddons.join('')) {
        nextCurrentOrder[newAddons.join('')+newItem.id] = orderClone[newAddons.join('')+newItem.id]
        nextCurrentOrder[newAddons.join('')+newItem.id][0].quantity++
      } else {
        nextCurrentOrder[newAddons.join('')+newItem.id] = [newItem];
      }
    }
    else {
      nextCurrentOrder[newAddons.join('')+newItem.id] = [newItem];
    }

    yield put({
      type: actionTypes.ADD_TO_ORDER_SUCCESS,
      currentOrder: {...orderClone, ...nextCurrentOrder},
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
    if (orderClone[action.id][0].quantity > 1) {
      yield orderClone[action.id][0].quantity--
    } else {
      delete orderClone[action.id];
    }
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

export function* makePayment(action) {
  try {
    const orderObj = action
      const res = yield callBff(`ordering/payment`, 'POST', {
        amount: action.amount,
        currency: 'aud',
        source: action.token.id,
        description: action.desc,
        clientInfo: action.clientInfo,
        customerName: action.customerName,
        email: action.email === '' ? undefined : action.email,
      }).then((response) => response)

      // yield console.log(res);
      yield put({
        type: actionTypes.MAKE_STRIPE_CHARGE_SUCCESS,
        res
      })

      // send order to airtable
      const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base('app4XnP7NuSCWMWD7')
      const uniqueCode = (Math.floor(1000 + Math.random() * 9000))

      // mikes flash new json machnine
      // Object.keys(orderObj.order).forEach(item => {
      //   base('NewOrders').create({
      //     "stripe_transaction_id": res.id,
      //     "venue_id": 'Winter Village',
      //     "item_id": [item],
      //     "processed": false,
      //     "customer_name": orderObj.customerName,
      //     "phone_number": orderObj.clientInfo.phone.slice(1),
      //     "created_time": Date(),
      //     "quantity": orderObj.order[item][0].quantity,
      //     "table_or_pickup": 'pickup',
      //     "unique_code": uniqueCode,
      //   }, function(err, record) {
      //       if (err) { console.error(err); return; }
      //       // CALL bff
      //       // websocket between merchant app and bff
      //   });
      // })

      Object.keys(orderObj.order).forEach(item => {
        let addons = (orderObj.order[item][0].addOns || []).map(addon => addon.record_id)
        base('Orders').create({
          "stripe_transaction_id": res.id,
          "venue_id": 'Winter Village',
          "item_id": [item],
          "addons": addons,
          "processed": false,
          "customer_name": orderObj.customerName,
          "phone_number": orderObj.clientInfo.phone.slice(1),
          "created_time": Date(),
          "quantity": orderObj.order[item][0].quantity,
          "table_or_pickup": 'pickup',
          "unique_code": uniqueCode,
        }, function(err, record) {
            if (err) { console.error(err); return; }
            // CALL bff
            // websocket between merchant app and bff
        });
      })

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
  } catch (error) {
    yield put({
      type: actionTypes.MAKE_STRIPE_CHARGE_FAILURE,
      error,
    })
    console.log(error)
  }
}
/**************************************************** */


export function* actionWatcher() {
  yield [
    takeLatest(actionTypes.ADD_TO_ORDER_REQUEST, addToOrder),
    takeLatest(actionTypes.REMOVE_FROM_ORDER_REQUEST, removeFromOrder),
    takeLatest(actionTypes.MAKE_STRIPE_CHARGE_REQUEST, makePayment)
  ]
}
