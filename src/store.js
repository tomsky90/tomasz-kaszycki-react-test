import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./reducers/productsReducer";
import { currenciesReducer } from "./reducers/currenciesReducer";
import { cartReducer } from "./reducers/cartReducer";
import { messageReducer } from "./reducers/messageReducer";


const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    products: productsReducer,
    currencies: currenciesReducer,
    cart: cartReducer,
    message: messageReducer,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;