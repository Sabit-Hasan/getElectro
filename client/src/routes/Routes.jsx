import {
    createBrowserRouter
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminPanel from "../pages/AdminPanel";
import AddAdmin from "../pages/AddAdmin";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import ProductCategory from "../pages/ProductCategory";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "product-category/:category",
                element: <ProductCategory />
            },
            {
                path: "admin-panel",
                element:  <AdminPanel />,
                children: [
                    {
                        path: "add-admin",
                        element: <AddAdmin />
                    },
                    {
                        path: "all-users",
                        element: <AllUsers />
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />
                    },
                ]
            }
        ]
    }
]);

export default router;
