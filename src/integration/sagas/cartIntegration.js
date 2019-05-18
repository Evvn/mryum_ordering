import * as actionTypes from "../../components/Cart/actions/actionTypes/actionTypes.js";
// eslint-disable-next-line
import _ from "lodash";
import { takeLatest, put, select } from "redux-saga/effects";
import * as orderUtils from "../../utils/orderUtils.js";
import callBff from "../callBff.js";
// import Airtable from "airtable";
// import axios from "axios";

export function* addToOrder(action) {
  try {
    const getCurrentOrder = state => state.persistentCart.currentOrder;
    let currentOrder = yield select(getCurrentOrder);
    const newItem = yield orderUtils.buildItemTemplate(
      action.item,
      action.quantity,
      action.addOns
    );
    let orderClone = yield _.cloneDeep(currentOrder);

    const nextCurrentOrder = {};

    // grab new item addons as array
    // if item is in cart, check if addons match
    // if yes, update quantity
    // if no, make new item with addons
    // update remove from cart to check addons as well

    let newAddons = (newItem.addOns || []).map(addon => addon.record_id);

    if (orderClone[newAddons.join("") + newItem.id]) {
      let oldAddons = (
        orderClone[newAddons.join("") + newItem.id][0].addOns || []
      ).map(addon => addon.record_id);
      if (newAddons.join("") === oldAddons.join("")) {
        nextCurrentOrder[newAddons.join("") + newItem.id] =
          orderClone[newAddons.join("") + newItem.id];
        nextCurrentOrder[newAddons.join("") + newItem.id][0].quantity++;
      } else {
        nextCurrentOrder[newAddons.join("") + newItem.id] = [newItem];
      }
    } else {
      nextCurrentOrder[newAddons.join("") + newItem.id] = [newItem];
    }

    yield put({
      type: actionTypes.ADD_TO_ORDER_SUCCESS,
      currentOrder: { ...orderClone, ...nextCurrentOrder }
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: actionTypes.ADD_TO_ORDER_FAILURE,
      error
    });
  }
}

export function* removeFromOrder(action) {
  try {
    const getCurrentOrder = state => state.persistentCart.currentOrder;
    let currentOrder = yield select(getCurrentOrder);
    let orderClone = yield _.cloneDeep(currentOrder);
    if (orderClone[action.id][0].quantity > 1) {
      yield orderClone[action.id][0].quantity--;
    } else {
      delete orderClone[action.id];
    }
    yield put({
      type: actionTypes.REMOVE_FROM_ORDER_SUCCESS,
      currentOrder: orderClone
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: actionTypes.REMOVE_FROM_ORDER_FAILURE,
      error
    });
  }
}

/*****************************************************
 *  Needs to be moved to backend since stripe secret
 *  is needed
 */

// const sendToAirtable = async payload => {
//   const airtableHeaders = {
//     "Content-Type": "application/json",
//     Authorization: "Bearer " + process.env.REACT_APP_AIRTABLE_API_KEY
//   };

//   await axios
//     .post("https://api.airtable.com/v0/app4XnP7NuSCWMWD7/Orders", payload, {
//       headers: airtableHeaders
//     })
//     .then(response => {
//       console.log(response);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };

export function* makePayment(action) {
  try {
    const orderObj = action;
    const uniqueCode = Math.floor(1000 + Math.random() * 9000);
    const res = yield callBff(`ordering/payment`, "POST", {
      amount: action.amount,
      currency: "aud",
      source: action.token.id,
      description: action.desc,
      clientInfo: action.clientInfo,
      customerName: action.clientInfo.customerName,
      email: action.email === "" ? undefined : action.email,
      order: orderObj,
      code: uniqueCode
    }).then(response => response);

    yield console.log(res);
    yield put({
      type: actionTypes.MAKE_STRIPE_CHARGE_SUCCESS,
      res
    });

    const currentOrder = orderObj.order;

    let items = Object.values(currentOrder).map(item => {
      let addonsArr = (item[0].addOns || []).map(addon => addon["Add-On Name"]);
      let addonStr = addonsArr.join(" & ");
      if (addonsArr.length > 0) {
        return item[0].quantity + " " + item[0].name + " + " + addonStr;
      } else {
        return item[0].quantity + " " + item[0].name;
      }
    });

    if (items.length > 1) {
      items[items.length - 1] = "and " + items[items.length - 1];
    }
    let orderString = items.join(", ").replace(", and", " and");

    try {
      const smsRes1 = yield callBff(`ordering/confirmationsms`, "POST", {
        name: orderObj.clientInfo.customerName,
        number: orderObj.clientInfo.phone,
        order: orderString
      }).then(response => response);
      console.log(smsRes1);
    } catch (error) {
      console.log(error);
    }

    // kim
    try {
      const smsRes2 = yield callBff(`ordering/confirmationsms`, "POST", {
        name: `${orderObj.clientInfo.customerName} (${
          orderObj.clientInfo.phone
        }) (code: ${uniqueCode})`,
        number: "+61423289668",
        order: orderString
      }).then(response => response);
      console.log(smsRes2);
    } catch (error) {
      console.log(error);
    }

    // kitchen burner 0456687700
    try {
      const smsRes3 = yield callBff(`ordering/confirmationsms`, "POST", {
        name: `${orderObj.clientInfo.customerName} (${
          orderObj.clientInfo.phone
        }) (code: ${uniqueCode})`,
        number: "+61456687700",
        order: orderString
      }).then(response => response);
      console.log(smsRes3);
    } catch (error) {
      console.log(error);
    }

    // // Kerry cell 0411163388
    // try {
    //   const smsRes4 = yield callBff(`ordering/confirmationsms`, "POST", {
    //     name: `${orderObj.clientInfo.customerName} (${
    //       orderObj.clientInfo.phone
    //     }) (code: ${uniqueCode})`,
    //     number: "+61411163388",
    //     order: orderString
    //   }).then(response => response);
    //   console.log(smsRes4);
    // } catch (error) {
    //   console.log(error);
    // }

    // console.log(orderObj);

    // const airtableHeaders = {
    //   "Content-Type": "application/json",
    //   Authorization: "Bearer " + process.env.REACT_APP_AIRTABLE_API_KEY
    // };

    // Object.keys(orderObj.order).forEach((item, index) => {
    //   let addons = (orderObj.order[item][0].addOns || []).map(
    //     addon => addon.record_id
    //   );

    //   let payload = JSON.stringify({
    //     fields: {
    //       stripe_transaction_id: res.id,
    //       venue_id: "Winter Village",
    //       item_id: [orderObj.order[item][0].id],
    //       addons: addons,
    //       processed: false,
    //       customer_name: orderObj.clientInfo.customerName,
    //       phone_number: orderObj.clientInfo.phone.slice(3),
    //       created_time: Date(),
    //       quantity: orderObj.order[item][0].quantity,
    //       table_or_pickup: "pickup",
    //       unique_code: uniqueCode
    //     }
    //   });

    // sendToAirtable(payload);

    // axios.post(
    //   "https://api.airtable.com/v0/app4XnP7NuSCWMWD7/Orders",
    //   payload,
    //   { headers: airtableHeaders }
    // );

    // send order to airtable
    //   const base = new Airtable({
    //     apiKey: process.env.REACT_APP_AIRTABLE_API_KEY
    //   }).base("app4XnP7NuSCWMWD7");
    //   base("Orders").create(
    //     {
    //       stripe_transaction_id: res.id,
    //       venue_id: "Winter Village",
    //       item_id: [orderObj.order[item][0].id],
    //       addons: addons,
    //       processed: false,
    //       customer_name: orderObj.clientInfo.customerName,
    //       phone_number: orderObj.clientInfo.phone.slice(3),
    //       created_time: Date(),
    //       quantity: orderObj.order[item][0].quantity,
    //       table_or_pickup: "pickup",
    //       unique_code: uniqueCode
    //     },
    //     function(err, record) {
    //       if (err) {
    //         console.error(err);
    //         return;
    //       }
    //       // on airtable win
    //       console.log(record);
    //     }
    //   );
    // });
  } catch (error) {
    yield put({
      type: actionTypes.MAKE_STRIPE_CHARGE_FAILURE,
      error
    });
    console.log(error);
  }
}
/**************************************************** */

export function* actionWatcher() {
  yield [
    takeLatest(actionTypes.ADD_TO_ORDER_REQUEST, addToOrder),
    takeLatest(actionTypes.REMOVE_FROM_ORDER_REQUEST, removeFromOrder),
    takeLatest(actionTypes.MAKE_STRIPE_CHARGE_REQUEST, makePayment)
  ];
}
