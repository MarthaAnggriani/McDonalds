import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getMenuDetail } from "../stores/actions/actionCreator";

const MenuDetail = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams();
    const navigate = useNavigate()

    const { menuDetail } = useSelector((state) => {
        return state.menus
    })
    const dispatch = useDispatch()

    useEffect(() => {
        try {
            if (isLoading) {
                dispatch(getMenuDetail(id));
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    }, [id]);

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
            <section className="section-menu-detail-cover min-h-screen py-10">
                <div className="container mx-auto">
                    <nav aria-label="breadcrumb" className="general-breadcrumb">
                        <ol className="breadcrumb">
                            <button onClick={() => {
                                navigate("/menus")
                            }} className="bg-yellow-500 hover:bg-yellow-700 text-gray-600 font-semibold py-2 px-4 rounded-md transition duration-300 transform hover:scale-105 flex items-center space-x-2 animated fadeInUp delayp4 ordernow">
                                Menu
                            </button>
                        </ol>
                    </nav>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-1">
                            <img src={menuDetail.imgUrl} alt={menuDetail.name} className="img-fluid animated vp-slideinleft delayp3 visible slideInLeft full-visible" />
                        </div>
                        <div className="md:col-span-1 flex flex-col justify-center">
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl md:text-4xl font-bold mb-2 animated fadeInUp delayp2">{menuDetail.name}</h2>
                                <p className="text-lg md:text-xl text-gray-700 animated fadeInUp delayp3 mb-2">{menuDetail.description}</p>
                                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                    {menuDetail?.Category?.name}
                                </button>
                                <p className="text-sm text-gray-500 animated fadeInUp delayp3 mb-2">Created by: {menuDetail?.User?.username}</p>
                            </div>
                            <div className="mt-4 md:mt-6 text-center md:text-left"> {/* Menambahkan margin di sini */}
                                <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 transform hover:scale-105 flex items-center space-x-2 animated fadeInUp delayp4 ordernow">
                                    <img src="https://nos.jkt-1.neo.id/mcdonalds/foods/October2019/pOXjdLMT1dffGjlcYHdj.png" className="w-6 h-6" alt="Order Now" />
                                    Order Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-ingredients py-6">
                <div className="container mx-auto flex ">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl md:text-2xl font-semibold mb-4">Ingredients</h3>
                        <div className="flex items-center space-x-4 animated fadeInUp delayp3">
                            {menuDetail?.Ingredients?.map((ingredient, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <img src={ingredient.imgUrl} alt={ingredient.name} className="w-10 h-10 object-contain" />
                                    <p className="text-sm text-gray-700">{ingredient.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MenuDetail;
