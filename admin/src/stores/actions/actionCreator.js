import { FETCH_MENUS, FETCH_MENU_DETAIL, FETCH_CATEGORIES, FETCH_CATEGORY, LOGIN_USER, CREATE_MENU } from "./actionType"
import Swal from "sweetalert2"
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


export const fetchCategoriesSuccess = (payload) => {
    return {
        type: FETCH_CATEGORIES,
        payload: payload
    }
}

export const fetchCategoryDetailSuccess = (payload) => {
    return {
        type: FETCH_CATEGORY,
        payload: payload
    }
}

export const userLoginSuccess = (payload) => {
    return {
        type: LOGIN_USER,
        payload: payload
    }
}

export const menuCreateSuccess = (payload) => {
    return {
        type: CREATE_MENU,
        payload: payload
    }
}

export const fetchMenus = () => {
    const access_token = localStorage.access_token;
    return async (dispatch) => {
        try {
            const response = await fetch(
                baseUrl + "/admin/menu", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': access_token
                }
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw responseData;
            }
            dispatch(fetchMenusSuccess(responseData));
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
}


export const getMenuDetail = (id) => {
    return async (dispatch) => { // Tambahkan async di sini
        try {
            const access_token = localStorage.access_token;
            const response = await fetch(
                `${baseUrl}/admin/menu/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': access_token
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result);
            dispatch(fetchMenuDetailSuccess(result));
            return result;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
    };
};



export const fetchCategories = (payload) => {
    const token = localStorage.access_token;
    return (dispatch) => {
        fetch(
            baseUrl + "/admin/category", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'access_token': token
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
                dispatch(fetchCategoriesSuccess(result));
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };
}

export const findCategoryById = (id) => {
    const access_token = localStorage.access_token;
    return (dispatch) => {
        fetch(
            baseUrl + "/admin/category/" + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'access_token': access_token
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw { res: response.status, result: response.json() };
                }
                return response.json();
            })
            .then(result => {
                dispatch(categoryFindSuccess(result.category));
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                Swal.fire({
                    icon: 'error',
                    title: `Error ${error.res}`,
                    text: error.result.message
                });
            });
    };
}

export const updateMenu = (id, payload) => {
    console.log(payload);
    const access_token = localStorage.access_token;
    return (dispatch) => {
        fetch(
            baseUrl + "/admin/menu/edit/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'access_token': access_token
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                dispatch(fetchMenus());
                Swal.fire({
                    icon: 'success',
                    title: 'Success update menu',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: 'There was a problem updating the menu.'
                });
            });
    };
}

export const createMenu = (payload) => {
    console.log(payload, "<<< payload");
    return async (dispatch) => {
        try {
            const access_token = localStorage.access_token;

            const response = await fetch(
                baseUrl + "/admin/menu/add", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': access_token
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw { res: response.status, result: await response.json() };
            }

            await response.json();
            console.log(response.json(), ">>>>");

            dispatch(fetchMenus());

            Swal.fire({
                icon: 'success',
                title: 'Success create menu',
                showConfirmButton: false,
                timer: 1500
            });

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            Swal.fire({
                icon: 'error',
                title: `Error ${error.res}`,
                text: error.result.message
            });
        }
    };
}

export const createCategory = (payload) => {
    const access_token = localStorage.access_token;
    return (dispatch) => {
        fetch(
            baseUrl + "/admin/category/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'access_token': access_token
            },
            body: JSON.stringify(payload),
        })
            .then(response => {
                if (!response.ok) {
                    throw { res: response.status, result: response.json() };
                }
                return response.json();
            })
            .then(() => {
                dispatch(fetchMenus());
                Swal.fire({
                    icon: 'success',
                    title: 'Success create category',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };
}

export const updateCategory = (id, payload) => {
    const token = localStorage.access_token;
    return (dispatch) => {
        fetch(
            baseUrl + "/admin/category/edit/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'access_token': token
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) {
                    throw { res: response.status, result: response.json() };
                }
                return response.json();
            })
            .then(() => {
                dispatch(fetchCategories());
                Swal.fire({
                    icon: 'success',
                    title: 'Success update Category',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                Swal.fire({
                    icon: 'error',
                    title: `Error ${error.res}`,
                    text: error.result.message
                });
            });
    };
}

export const deleteCategory = (id) => {
    const access_token = localStorage.access_token;
    return (dispatch) => {
        fetch(
            baseUrl + `/admin/category/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'access_token': access_token
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw { res: response.status, result: response.json() };
                }
                return response.json();
            })
            .then(() => {
                dispatch(fetchCategories());
                Swal.fire({
                    icon: 'success',
                    title: 'Success delete Category',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                Swal.fire({
                    icon: 'error',
                    title: `Error ${error.res}`,
                    text: error.result.message
                });
            });
    };
}

export const deleteMenu = (id) => {
    const access_token = localStorage.access_token;
    return (dispatch) => {
        fetch(
            baseUrl + `/admin/menu/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'access_token': access_token
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw { res: response.status, result: response.json() };
                }
                return response.json();
            })
            .then(() => {
                dispatch(fetchMenus());
                Swal.fire({
                    icon: 'success',
                    title: 'Success delete Menus',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                Swal.fire({
                    icon: 'error',
                    title: `Error ${error.res}`,
                    text: error.result.message
                });
            });
    };
}


// export const login = (payload) => {
//     return async (dispatch) => {
//         try {
//             const response = await fetch(baseUrl + "/admin/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(payload),
//             });

//             if (!response.ok) {
//                 throw await response.json();
//             }

//             const result = await response.json();
//             localStorage.access_token = result.access_token;
//             await dispatch(fetchMenus())
//             dispatch(userLoginSuccess(result));
//         } catch (error) {
//             console.error('There was a problem with the fetch operation:', error);
//             Swal.fire({
//                 icon: 'error',
//                 title: `Error ${error.res}`,
//                 text: error.result.message
//             });
//         }
//     };
// };

export const login = (payload) => {
    return (dispatch) => {
        fetch(baseUrl + "/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw errorData;
                    });
                }
                return response.json();
            })
            .then(result => {
                localStorage.access_token = result.access_token;
                dispatch(fetchMenus())
                dispatch(userLoginSuccess(result));
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                Swal.fire({
                    icon: 'error',
                    title: `Error ${error.res}`,
                    text: error.result.message
                });
            });
    };
};


export const registerAdmin = (payload) => {
    const access_token = localStorage.access_token;
    return (dispatch) => {
        fetch(
            baseUrl + "/admin/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'access_token': access_token
            },
            body: JSON.stringify(payload),
        })
            .then(response => {
                if (!response.ok) {
                    throw { res: response.status, result: response.json() };
                }
                return response.json();
            })
            .then((result) => {
                console.log(result);
                Swal.fire({
                    icon: 'success',
                    title: 'Register success',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                Swal.fire({
                    icon: 'error',
                    title: `Error ${error.res}`,
                    text: error.result.message
                });
            });
    };
}















