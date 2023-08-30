import { FETCH_MENUS, FETCH_MENU_DETAIL } from "./actionType"
const baseUrl = "https://mcd-server.marthaanggriani.site"

export const fetchMenusSuccess = (payload) => {
    return {
        type: FETCH_MENUS,
        payload: payload
    }
}

export const fetchMenuDetailSuccess = (payload) => {
    return {
        type: FETCH_MENU_DETAIL,
        payload: payload
    }
}

export const getMenuDetail = (id) => {
    return (dispatch) => {
        const access_token = localStorage.access_token;
        fetch(
            baseUrl + "/customer/menu/" + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'access_token': access_token
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result => {
                console.log(result);
                dispatch(fetchMenuDetailSuccess(result));
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };
}

export const fetchMenus = () => {
    const access_token = localStorage.access_token;
    return (dispatch) => {
        fetch(
            baseUrl + "/customer/menu", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'access_token': access_token
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result => {
                console.log(result);
                dispatch(fetchMenusSuccess(result));
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };
}


















