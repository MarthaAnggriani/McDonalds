import { useState, useEffect } from 'react'
import TableCategory from '../components/TableCategory'
export default function Category(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [categoryDetail, setCategoryDetail] = useState(null)
    const [categories, setCategories] = useState([])
    const [error, setError] = useState([])

    const fetchCategories = () => {
        setIsLoading(true)
        fetch("http://mcd-server.marthaanggriani.site/categories")
            .then((resp) => resp.json())
            .then((data) => setCategories(data))
            .catch((error) => setError(error))
            .finally(() => setIsLoading(false))
    }

    const handleCategoryDetail = (id) => {
        setIsLoading(true)
        fetch(`http://mcd-server.marthaanggriani.site/categories/${id}`)
            .then((resp) => resp.json())
            .then((data) => setCategoryDetail(data))
            .catch((error) => setError(error))
            .finally(() => setIsLoading(false))
    }

    const handleDeleteCategory = (id) => {
        setIsLoading(true)
        fetch(`http://mcd-server.marthaanggriani.site/categories/${id}`, {
            method: "DELETE"
        })
            .then((response) => {
                if (response.ok) {
                    // Remove the deleted menu from the menus state
                    setCategories((prevCategories) => prevCategories.filter(category => category.id !== id));
                } else {
                    throw new Error('Failed to delete category');
                }
            })
            .catch((error) => setError(error))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    if (isLoading) {
        return (
            <img
                className="w-full pl-60 scale-50"
                src="https://cdn.dribbble.com/users/165652/screenshots/3963364/media/64ee901b3d4725915acfa38da2568bb8.gif"
                alt=""
            />
        );
    }

    return (
        <>
            <h1 className="text-gray-500 font-bold text-xl md:text-center">Mc'Donald Category</h1><br />
            <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-700 font-bold py-2 px-4 rounded">
                + Add new Category
            </button>
            <table className=" border border-gray-300 min-w-full table-fixed divide-y divide-gray-200 bg-white text-sm">
                <thead className="text-center text-white divide-y divide-gray-200 bg-black">
                    <tr>
                        <th className="whitespace-nowrap py-2 p-2 w-20 font-medium">Category</th>
                        <th className="whitespace-nowrap py-2 p-2 w-20 font-medium">Action</th>
                    </tr>
                </thead>
                {categories.map((category) => (
                    <TableCategory key={category.id} category={category} />
                ))}
            </table>
        </>
    )
}