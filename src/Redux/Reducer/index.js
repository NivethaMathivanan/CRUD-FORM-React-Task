import { combineReducers } from "redux";
import crudReducer from "./CrudReducer/crudReducer";

const rootReducer = combineReducers({crudReducer})

export default rootReducer;