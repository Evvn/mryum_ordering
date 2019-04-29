import * as actionTypes from './actionTypes/actionTypes.js';

export function setClientType(clientType, clientInfo) {
  return {
    type: actionTypes.SET_CLIENT_TYPE,
    clientType,
    clientInfo,
  };
}
