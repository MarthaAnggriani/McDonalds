import { FETCH_MENUS, FETCH_MENU_DETAIL } from "../actions/actionType"

const initialState = {
    menus: [],
    menuDetail: {}
}

export default function menusReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MENUS:
            return {
                ...state,
                menus: action.payload
            }
        case FETCH_MENU_DETAIL:
            return {
                ...state,
                menuDetail: action.payload
            }
        default:
            return state
    }
}
