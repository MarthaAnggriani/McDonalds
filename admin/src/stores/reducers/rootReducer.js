import { combineReducers } from "redux";
import menusReducer from "./menusReducer";
import categoriesReducer from "./categoriesReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    menus: menusReducer,
    categories: categoriesReducer,
    user: userReducer,
})

export default rootReducer