import { all } from 'redux-saga/effects';
// Saga imports here: (Don't modify this comment, it's used by the code generator)
import { actionWatcher as menuIntegration } from './menuIntegration.js';
import { actionWatcher as commonIntegration } from './commonIntegration.js';
import { actionWatcher as cartIntegration } from './cartIntegration.js';

export default function* rootSaga() {
  console.log('Saga Running')
  // The next line of code is used by the code generator -
  // any modifications to it will require changes to the generator.
  yield all([
    menuIntegration(),
    commonIntegration(),
    cartIntegration(),
  ]);
};
