import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchMenus } from "../stores/actions/actionCreator"
import MenuCard from '../components/MenuCard'
import Banner from '../components/Banner';

export default function Menu() {
    const [isLoading, setIsLoading] = useState(true)
    const { menus } = useSelector((state) => {
        return state.menus
    })
    const dispatch = useDispatch()

    useEffect(() => {
        try {
            if (isLoading) {
                dispatch(fetchMenus());
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    })

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
            <Banner />
            <div className="flex flex-col items-center">
                <h1 className="text-gray-500 font-bold text-3xl md:text-center">Mc'Donald Menu</h1>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {menus.map((menu) => (
                        <MenuCard key={menu.id} menu={menu} />
                    ))}
                </div>
            </div>
        </>
    )
}