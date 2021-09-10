
import { combineReducers } from "redux";

import SessionReducer from "./Reducers/SessionReducer";
import AccountReducer from "./Reducers/AccountReducer";
import ProductsReducer from "./Reducers/ProductsReducer";

const Reducers = combineReducers({
    Session: SessionReducer,
    Account: AccountReducer,
    Products: ProductsReducer,
})

export default Reducers
