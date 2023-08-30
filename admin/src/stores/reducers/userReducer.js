import { LOGIN_USER } from "../actions/actionType"

const initialState = {
    user: {}
}
function userReducer(state = initialState, action) {
    if (action.type === LOGIN_USER) {
        return {
            ...state,
            user: action.payload
        };
    } else {
        return state;
    }
}

export default userReducer