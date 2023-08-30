import { Outlet } from "react-router-dom";
import Sidebar from "./sideBar";

export default function Layout() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="ml-[240px] p-4">
                    <Outlet />
                </div>
            </div>
        </>
    )
}