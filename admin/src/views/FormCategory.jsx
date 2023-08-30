import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createCategory,
    findCategoryById,
    updateCategory,
} from "../stores/actions/actionCreator";
import { useNavigate, Link, useParams } from "react-router-dom";

export default function FormCategory() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [form, setForm] = useState({
        name: "",
    })
    const [error, setError] = useState(null);
    const { category } = useSelector((state) => {
        return state.categories;
    })

    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleCreate = async (e) => {
        if (!form.name) {
            setError("Please input category")
        }
        else {
            e.preventDefault();
            if (id) {
                await dispatch(updateCategory(id, form));
                navigate("/categories");
            } else {
                await dispatch(createCategory(form));
                navigate("/categories");
            }
        }
    }

    useEffect(() => {
        try {
            if (id) { dispatch(findCategoryById(id)) }
        } catch (error) { console.log(error) }
    }, [id]);

    useEffect(() => {
        if (category) {
            setForm({
                name: category.name || ""
            });
        }
    }, [category]);

    return (
        <>
            <h1 className="text-gray-500 font-bold text-xl md:text-center">Update Category</h1><br />

            {/* alert  */}
            {error && <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong class="font-bold">Error</strong>
                <span class="block sm:inline">{error}</span>
                <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                </span>
            </div>}<br />
            {/* alert  */}


            <form className="w-full max-w-sm">
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Category
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input type="text" name="name" value={form.name} onChange={handleChange}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                    </div>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        {id ? (
                            <button onClick={handleCreate} className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-gray-700 font-bold py-2 px-4 rounded" type="button">
                                Update Category
                            </button>
                        ) : (
                            <button onClick={handleCreate} className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-gray-700 font-bold py-2 px-4 rounded" type="button">
                                Add Category
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </>
    )
}