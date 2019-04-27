import * as actionTypes from '../../components/Cart/actions/actionTypes/actionTypes.js';
// eslint-disable-next-line
import _ from 'lodash';
import { takeLatest, put, select,} from 'redux-saga/effects';
import * as orderUtils from '../../utils/orderUtils.js';



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
    currentOrder = orderUtils.removeFromOrder(currentOrder, action.item, action.quantity);
      yield put({
        type: actionTypes.REMOVE_FROM_ORDER_SUCCESS,
        currentOrder,
      })
  } catch (error) {
    console.log(error)
    yield put({
      type: actionTypes.REMOVE_FROM_ORDER_FAILURE,
      error,
    })
  }
}

export function* actionWatcher() {
  yield [
    takeLatest(actionTypes.ADD_TO_ORDER_REQUEST, addToOrder),
    takeLatest(actionTypes.REMOVE_FROM_ORDER_REQUEST, removeFromOrder),
  ]
}
