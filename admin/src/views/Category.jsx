import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TableCategory from '../components/TableCategory'
import { fetchCategories } from "../stores/actions/actionCreator"

export default function Categories() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const { categories } = useSelector((state) => {
        return state.categories;
    });
    useEffect(() => {
        try {
            if (isLoading) {
                dispatch(fetchCategories())
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }, [categories]);

    if (isLoading) {
        return (
            <img
                className="w-full pl-60 scale-50"
                src="./src/assets/loading.gif"
                alt=""
            />
        );
    }

    return (
        <>
            <button onClick={() => (window.location.href = "/category/form")}
                className="bg-red-700 hover:bg-red-900 text-white font-bold py-1.5 px-3 rounded text-sm">
                + Add new Category
            </button><br /><br />

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-base text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-sm text-center text-gray-900 uppercase bg-yellow-50 dark:bg-yellow-500 dark:text-gray-800">
                        <tr>
                            <th scope="col" className="px-10 py-4">Category</th>
                            <th scope="col" className="px-10 py-4">Action</th>
                        </tr>
                    </thead>
                    {categories.map((category) => (
                        <TableCategory key={category.id} category={category} />
                    ))}
                </table>
            </div>
        </>
    )
}