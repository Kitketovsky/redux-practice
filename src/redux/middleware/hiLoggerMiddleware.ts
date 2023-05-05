// Redux middleware provides a third-party extension point between
// dispatching an action and the moment it reaches the reducer.

// Redux middleware are written as a series of three nested functions.

// Middleware are intended to contain logic with side effects
// Middleware can modify 'dispatch' to accept things that are not plain action objects

import { Middleware } from "redux";
import { RootState } from "../store";

// the outer function, "middleware" itself
// it will be called by 'applyMiddleware' and receives { dispatch, getState } object that is part of the store
export const hiLoggerMiddleware: Middleware<{}> = (storeAPI) => {
  // 'next' is actually the next middleware in the pipeline => [firstMiddle, secondMiddle, thirdMiddle, store.dispatch]
  return function wrapDispatch(next) {
    // receives the current action
    // the function must return the result of the next middleware of dispatch action again
    return function handleAction(action) {
      console.log("Hi from middleware!");
      return next(action);
    };
  };
};
