import { Link } from "react-router-dom";

export default function Promo() {
    return (
        <>
            <section className="h-screen flex justify-center items-center">
                <div className="flex flex-col items-center">
                    <h1 className="text-gray-500 font-bold text-3xl md:text-center">Promo Menarik</h1><br />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                        <div className="max-w-xs rounded overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                            <img className="w-full" src="./src/assets/promo-1.png" alt="Sunset in the mountains" />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">Promo McDelivery</div>
                            </div>
                            <p className="text-gray-400 text-base">
                                McDelivery Biaya Antar hanya Rp.1000,-
                            </p>
                        </div>
                        <div className="max-w-xs rounded overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                            <img className="w-full" src="./src/assets/promo-2.png" alt="Sunset in the mountains" />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">Sunde Waffle Cup</div>
                            </div>
                            <p className="text-gray-400 text-base">
                                Nikmati Eskrim sundae dipadu dengan Waffle hanya Rp 13.000,-
                            </p>
                        </div>
                        <div className="max-w-xs rounded overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                            <img className="w-full" src="./src/assets/promo-3.png" alt="Sunset in the mountains" />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">Ini Rasa Kita</div>
                            </div>
                            <p className="text-gray-400 text-base">
                                Citarasa Khas Indonesia
                            </p>
                        </div>
                    </div>
                    <div className="mt-4"> {/* Menambahkan jarak antara card dan button */}
                        <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 transform hover:scale-105 space-x-2 animated fadeInUp delayp4 ordernow">
                            See All Promo
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
