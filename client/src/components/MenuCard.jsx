import { Link } from "react-router-dom";

export default function MenuCard(props) {
    const { menu } = props;

    return (
        <Link to={`/menus/${menu.id}`} className="max-w-xs rounded overflow-hidden shadow-lg transition-transform transform hover:scale-105">
            <img className="w-full" src={menu.imgUrl} alt="Sunset in the mountains" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{menu.name}</div>
                <p className="text-gray-700 text-base">
                    price : Rp. {menu.price.toLocaleString("id-ID")},00
                </p>
            </div>
        </Link>
    );
}
