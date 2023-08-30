import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "./components/Layout";
import Menu from "./views/Menu"
import Category from "./views/Category"
import FormCategory from "./views/FormCategory";
import FormMenu from "./views/FormMenu";
import Register from "./views/Register";
import Login from "./views/Login";
const router = createBrowserRouter([
    {
        element: <Layout />,
        loader: () => {
            let access_token = localStorage.access_token;
            if (!access_token) {
                return redirect('/login');
            } return null;
        },
        children:
            [
                {
                    path: "/register",
                    element: <Register />
                },
                {
                    path: "/",
                    element: <Menu />
                },
                {
                    path: "/categories",
                    element: <Category />
                },
                {
                    path: "/category/form",
                    element: <FormCategory />
                },
                {
                    path: "/category/form/:id",
                    element: <FormCategory />
                },
                {
                    path: "/menu/form",
                    element: <FormMenu />
                },
                {
                    path: "/menu/form/:id",
                    element: <FormMenu />
                }
            ]
    },
    {
        path: "/",
        loader: () => {
            let access_token = localStorage.access_token;
            if (access_token) {
                return redirect("/");
            } else {
                return redirect("/login");
            }
        },
    },
    {
        path: "/login",
        element: <Login />,
        loader: () => {
            let access_token = localStorage.access_token;
            if (access_token) {
                return redirect("/");
            } return null;
        },
    },

]);

export default router;