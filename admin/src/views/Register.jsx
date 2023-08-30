import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { registerAdmin } from "../stores/actions/actionCreator"
import { useNavigate } from "react-router-dom";

export default function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        email: "",
        username: "",
        password: "",
        phoneNumber: "",
        address: "",
    });

    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    }

    const resetForm = () => {
        setForm("");
    };

    const handleRegister = async (e) => {
        try {
            if (!form.email || !form.username || !form.password) {
                setError("Please check your input again");
            }
            else {
                e.preventDefault();
                await dispatch(registerAdmin(form))
                Swal.fire({
                    icon: 'success',
                    title: 'Register success',
                    showConfirmButton: false,
                    timer: 1500
                });
                resetForm();
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        setIsLoading(false);
    })

    return (
        <>
            <h1 className="text-gray-500 font-bold text-xl md:text-center">Update Menu</h1><br />

            {/* alert  */}
            {error && <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong class="font-bold">Error</strong>
                <span class="block sm:inline">{error}</span>
                <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                </span>
            </div>}
            {/* alert  */}

            <form className="w-full max-w-sm">
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            email
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="text" name="email" value={form.email} onChange={handleChange} />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            username
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="text" name="username" value={form.username} onChange={handleChange} />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            password
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="password" name="password" value={form.password} onChange={handleChange} />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            phone number
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            address
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="text" name="address" value={form.address} onChange={handleChange} />
                    </div>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button onClick={handleRegister} className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-gray-700 font-bold py-2 px-4 rounded" type="button">
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </>
    )


}