import { FETCH_CATEGORIES, FETCH_CATEGORY } from "../actions/actionType";
const initialState = {
    categories: [],
    category: {}
}

export default function categoriesReducer(state = initialState, action) {
    if (action.type === FETCH_CATEGORIES) {
        return {
            ...state,
            categories: action.payload
        }
    }
    else if (action.type === FETCH_CATEGORY) {
        return {
            ...state,
            category: action.payload
        }
    }
    else {
        return state;
    }
}