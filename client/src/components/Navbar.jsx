import { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
    const [showContent, setShowContent] = useState(false);
    const [fadeIn, setFadeIn] = useState("opacity-0");

    const toggleContent = () => {
        setShowContent(!showContent);
        setTimeout(() => {
            if (showContent) {
                setFadeIn("opacity-0");
            } else {
                setFadeIn("opacity-100");
            }
        }, 1);
    };
    return (
        <>
            <nav className="bg-white shadow-lg sticky top-0 left-0 w-auto z-50">
                <div className="w-screen mx-auto px-4 max-w-7xl">
                    <div className="flex items-center justify-between h-20">

                        <div className="flex items-center m-10">
                            <Link to="/">
                                <svg
                                    className="w-10"
                                    xmlns: rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="238.5"
                                    width="272.7"
                                    version="1.1"
                                    xmlns: cc="http://creativecommons.org/ns#"
                                    xmlns: dc="http://purl.org/dc/elements/1.1/"
                                    viewBox="0 0 272.70001 238.5"
                                >
                                    <path
                                        fill="#fc0"
                                        d="m195.8 17.933c23.3 0 42.2 98.3 42.2 219.7h34c0-130.7-34.3-236.5-76.3-236.5-24 0-45.2 31.7-59.2 81.5-14-49.8-35.2-81.5-59-81.5-42 0-76.2 105.7-76.2 236.4h34c0-121.4 18.7-219.6 42-219.6s42.2 90.8 42.2 202.8h33.8c0-112 19-202.8 42.3-202.8"
                                    />
                                </svg>
                            </Link>
                        </div>

                        <div className="flex justify-center space-x-10 text-lg">
                            <a
                                onClick={toggleContent}
                                className="nav-link hover:text-yellow-500 cursor-pointer"
                            >
                                Menu {showContent ? "v" : "^"}
                            </a>
                            <a href="#" className="nav-link hover:text-yellow-500">
                                Promo
                            </a>
                            <a href="#" className="nav-link hover:text-yellow-500 w-16">
                                <img
                                    src="https://mcdonalds.co.id/assets/img/reward/my-reward.svg"
                                    alt=""
                                />
                            </a>
                            <a href="#" className="nav-link hover:text-yellow-500">
                                Dunia Anak
                            </a>
                            <a href="#" className="nav-link hover:text-yellow-500">
                                Berita Terkini
                            </a>
                            <a href="#" className="nav-link hover:text-yellow-500">
                                Pahlawan di <br /> sekitar Kita
                            </a>
                            <a href="#" className="nav-link hover:text-yellow-500">
                                Makin Kenal <br /> Makin Sayang
                            </a>
                        </div>

                        <div className="flex items-center border-l pl-4 m-10">
                            <ion-icon name="location-outline"></ion-icon>
                            <a href="#" className="nav-link mx-3">
                                Lokasi
                            </a>
                        </div>
                    </div>
                    {showContent && (
                        <div
                            className={`flex justify-between h-80 mx-10 text-lg transition-opacity duration-200 ease-in ${fadeIn}`}
                        >
                            <div className="w-1/2">
                                <div className=" flex justify-center">
                                    <div className="mb-4 p-4">
                                        <div className="space-y-2">
                                            <a href="#" className="block hover:text-yellow-500">
                                                Sarapan Pagi
                                            </a>
                                            <a href="#" className="block hover:text-yellow-500">
                                                Daging Sapi
                                            </a>
                                            <a href="#" className="block hover:text-yellow-500">
                                                Ayam
                                            </a>
                                            <a href="#" className="block hover:text-yellow-500">
                                                Ikan
                                            </a>
                                            <a href="#" className="block hover:text-yellow-500">
                                                Minuman
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mb-4 p-4">
                                        <div className="space-y-2">
                                            <a href="#" className="block hover:text-yellow-500">
                                                Makanan Penutup
                                            </a>
                                            <a href="#" className="block hover:text-yellow-500">
                                                Happy Meal
                                            </a>
                                            <a href="#" className="block hover:text-yellow-500">
                                                Paket Keluarga
                                            </a>
                                            <a href="#" className="block hover:text-yellow-500">
                                                McCafe
                                            </a>
                                            <a href="#" className="block hover:text-yellow-500">
                                                Camilan
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    to="/menus"
                                    className="flex justify-center font-bold text-yellow-500 text-lg"
                                >
                                    {" "}
                                    Lihat Semua Menu &gt;
                                </Link>
                            </div>

                            <div className="w-1/2 flex m-3 ">
                                <img
                                    src="https://nos.jkt-1.neo.id/mcdonalds/navbar_menu/September2019/aQB38R7W6WDUj6jYxYbP.jpg"
                                    alt=""
                                />
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}

export default NavBar;
