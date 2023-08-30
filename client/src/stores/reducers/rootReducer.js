import { combineReducers } from "redux";
import menusReducer from "./menusReducer";

const rootReducer = combineReducers({
    menus: menusReducer,
})

export default rootReducer