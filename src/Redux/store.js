import { legacy_createStore as createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./Saga/index";
import rootReducer from "./Reducer/index";

const saga = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(saga))
)

saga.run(rootSaga)
