
import { combineReducers } from "redux";

import SessionReducer from "./Reducers/SessionReducer";
import AccountReducer from "./Reducers/AccountReducer";

const Reducers = combineReducers({
    Session: SessionReducer,
    Account: AccountReducer,
})

export default Reducers
