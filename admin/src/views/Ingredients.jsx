import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMenuDetail } from "../stores/actions/actionCreator";


export default function Menu() {
    const [isLoading, setIsLoading] = useState(true);
    const { menu } = useSelector((state) => {
        return state.menus;
    })
    const dispatch = useDispatch();
    useEffect(() => {
        try {
            if (isLoading) {
                dispatch(fetchMenus());
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    if (isLoading) {
        return (
            <img
                className="w-full pl-60 scale-50"
                src="./src/assets/loading.gif"
                alt="" />
        );
    }

    return (
        <>
            <button onClick={() => (window.location.href = "/menu/form")}
                className="bg-red-700 hover:bg-red-900 text-white font-bold py-1.5 px-3 rounded text-sm">
                + Add new Menu
            </button><br /><br />

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-center text-gray-900 uppercase bg-yelow-50 dark:bg-yellow-500 dark:text-gray-800">
                        <tr>
                            <th scope="col" className="px-6 py-3">Menu</th>
                            <th scope="col" className="px-6 py-3">Image</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Ingredients</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    {menus.map((menu) => (
                        <TableMenu key={menu.id} menu={menu} />
                    ))}
                </table>
            </div>
        </>
    )
}
