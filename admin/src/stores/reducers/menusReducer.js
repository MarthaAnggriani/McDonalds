import { FETCH_MENUS, FETCH_MENU_DETAIL } from "../actions/actionType"

const initialState = {
    menus: [],
    menu: {}
}

function menusReducer(state = initialState, action) {
    if (action.type === FETCH_MENUS) {
        return {
            ...state,
            menus: action.payload
        }
    } else if (action.type === FETCH_MENU_DETAIL) {
        return {
            ...state,
            menu: action.payload
        }
    } else {
        return state
    }
}

export default menusReducer
