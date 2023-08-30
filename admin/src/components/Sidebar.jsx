import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Sidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, logout!'
            }).then((result) => {
                if (result.isConfirmed) {
                    e.preventDefault();
                    localStorage.clear()
                    navigate("/login");
                }
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `Error ${error.res}`,
                text: error.result.message
            });
        }

    }
    return (
        <>
            <div
                className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[240px] overflow-y-auto text-center bg-red-800"
            >
                <div className="text-gray-100 text-xl">
                    <div className="p-2.5 mt-1 flex items-center">
                        <i className=" px-2 py-1 rounded-md bg-red-900">
                            <img src="https://logos-download.com/wp-content/uploads/2016/03/McDonalds_Logo_2018-1536x1536.png" alt="logo" />
                        </i>
                        <h1 className="font-bold text-gray-200 text-[15px] ml-3">McDonald's Admin Panel</h1>
                        <i
                            className="bi bi-x cursor-pointer ml-28 lg:hidden"
                        ></i>
                    </div>
                    <div className="my-2 bg-gray-600 h-[1px]"></div>
                </div>
                <Link to="/">
                    <div
                        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-900 text-white">
                        <i className="bi bi-house-door-fill"></i>
                        <span className="text-[15px] ml-4 text-gray-200 font-bold">Home</span>
                    </div>
                </Link>
                <Link to="/categories">
                    <div
                        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-900 text-white">
                        <i className="bi bi-bookmark-fill"></i>
                        <span className="text-[15px] ml-4 text-gray-200 font-bold">Category</span>
                    </div>
                </Link>
                <div className="my-4 bg-gray-600 h-[1px]"></div>
                <div
                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-900 text-white">
                    <i className="bi bi-chat-left-text-fill"></i>
                    <Link to="/register">
                        <div className="flex justify-between w-full items-center">
                            <span className="text-[15px] ml-4 text-gray-200 font-bold">Register new Admin</span>
                            <span className="text-sm rotate-180" id="arrow">
                                <i className="bi bi-chevron-down"></i>
                            </span>
                        </div>
                    </Link>
                </div>
                <div onClick={handleLogout} className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-900 text-white">
                    <i className="bi bi-box-arrow-in-right"></i>
                    <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
                </div>
            </div>
        </>
    )
}