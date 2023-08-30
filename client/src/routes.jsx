import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "./components/Layout";
import Menu from "./views/Menu"
import MenuDetail from "./views/MenuDetail"
import Category from "./views/Category"
import Home from "./views/Home";
const router = createBrowserRouter([
    {
        element: <Layout />,
        children:
            [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/menus",
                    element: <Menu />
                },
                {
                    path: "/categories",
                    element: <Category />
                },
                {
                    path: "/menus/:id",
                    element: <MenuDetail />
                }
            ]
    }
]);

export default router;