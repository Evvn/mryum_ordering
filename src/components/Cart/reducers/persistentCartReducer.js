import * as actionTypes from '../actions/actionTypes/actionTypes.js';
/*Current Order Template
  {
    items: [
      {
        id: String from airtable,
        name: string,
        add-ons: [
          {
            id: string from airtable,
            name: string,
            price: string || false
          }
        ],
        modifiers:[
          {
            id: string from airtable,
            name: string,
          }
        ],
        price: float,
        quantity: int,
        subtotal: float,uu
      }
    ],
    orderTotal: float,
  }
*/

const initialState = {
  currentOrder: {},
}

function persistentCartReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_ORDER_SUCCESS:
      return {
        ...state,
        currentOrder: action.currentOrder,
      }
    case actionTypes.REMOVE_FROM_ORDER_SUCCESS:
      return {
        ...state,
        currentOrder: action.currentOrder,
      }
    default:
      return state
  }
}

export default persistentCartReducer;
