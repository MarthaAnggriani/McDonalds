import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createMenu, updateMenu, getMenuDetail, fetchCategories } from "../stores/actions/actionCreator"
import { Link, useNavigate, useParams } from "react-router-dom";

export default function FormMenu() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams()
    const [error, setError] = useState(null);
    const [formMenu, setFormMenu] = useState({
        name: "",
        description: "",
        price: 0,
        categoryId: 0,
        imgUrl: "",
        ingredient1: "",
        ingredient2: "",
    })

    const { menu } = useSelector((state) => {
        return state.menus;
    })
    const { categories } = useSelector((state) => {
        return state.categories;
    })

    function handleChange(event) {
        setFormMenu({
            ...formMenu,
            [event.target.name]: event.target.value
        })
    }

    const handleCreate = async (e) => {
        if (!formMenu.name || !formMenu.description || !formMenu.price || !formMenu.categoryId || !formMenu.imgUrl) {
            setError("Please check your input again")
        }
        else {
            e.preventDefault();
            const {
                ingredient1,
                ingredient2,
                ...restData
            } = formMenu;

            const dataUpdated = {
                ...restData,
                ingredients: [ingredient1, ingredient2]
            };
            if (id) {
                await dispatch(updateMenu(id, dataUpdated))
                navigate("/")
            } else {
                await dispatch(createMenu(dataUpdated))
                    .then(response => {
                        console.log("Menu created:", response);
                        navigate("/");
                    })
                    .catch(error => {
                        console.error("Error creating menu:", error);
                    });
            }

        }
    }

    // Pindahkan ke actionCreator
    // function handleCreate(event) {
    //     event.preventDefault();
    //     const {
    //         ingredient1,
    //         ingredient2,
    //         ...restData
    //     } = formMenu;

    //     const dataUpdated = {
    //         ...restData,
    //         ingredients: [ingredient1, ingredient2]
    //     };
    //     if (id) {
    //         dispatch(updateMenu(id, dataUpdated))
    //         navigate("/")
    //     } else {
    //         dispatch(createMenu(dataUpdated))
    //             .then(response => {
    //                 console.log("Menu created:", response);
    //                 navigate("/");
    //             })
    //             .catch(error => {
    //                 console.error("Error creating menu:", error);
    //             });
    //     }
    // }

    useEffect(() => {
        try {
            dispatch(fetchCategories());
            if (id) {
                dispatch(getMenuDetail(id));
            }
        } catch (error) {
            console.log(error);
        }
    }, [id]);

    useEffect(() => {
        if (menu) {
            setFormMenu({
                name: menu.name || "",
                description: menu.description || "",
                price: menu.price || 0,
                categoryId: menu.categoryId || 0,
                imgUrl: menu.imgUrl || "",
            });
        }
    }, [menu]);

    return (
        <>
            <h1 className="text-gray-500 font-bold text-xl md:text-center">Form Menu</h1><br />

            {/* alert  */}
            {error && <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong class="font-bold">Error</strong>
                <span class="block sm:inline">{error}</span>
                <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                </span>
            </div>}
            {/* alert  */}

            <form className="w-full max-w-sm">
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Menu's name
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input type="text" name="name" value={formMenu.name} onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Description
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input type="text" value={formMenu.description} onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="description" />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Price
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input type="number" name="price" value={formMenu.price} onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            imgUrl
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input type="text" name="imgUrl" value={formMenu.imgUrl} onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Category
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <select
                            name="categoryId"
                            value={formMenu.categoryId}
                            onChange={handleChange}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                            <option value="">Select category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* Ingredients */}
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Ingredients
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        {/* Ingredient 1 */}
                        <div className="mb-4">
                            <label className="block text-gray-500 font-bold mb-1 pr-4">
                                Ingredient 1
                            </label>
                            <input
                                type="text"
                                name="ingredient1"
                                value={formMenu.ingredient1}
                                onChange={handleChange}
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            />
                        </div>
                        {/* Ingredient 2 */}
                        <div className="mb-4">
                            <label className="block text-gray-500 font-bold mb-1 pr-4">
                                Ingredient 2
                            </label>
                            <input
                                type="text"
                                name="ingredient2"
                                value={formMenu.ingredient2}
                                onChange={handleChange}
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            />
                        </div>
                    </div>
                </div>
                {/* end of ingredients */}

                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        {id ? (
                            <button onClick={handleCreate} className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-gray-700 font-bold py-2 px-4 rounded" type="button">
                                Update Menu
                            </button>
                        ) : (
                            <button onClick={handleCreate} className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-gray-700 font-bold py-2 px-4 rounded" type="button">
                                Add Menu
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </>
    )
}