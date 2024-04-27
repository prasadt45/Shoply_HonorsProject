import { Outlet, useRoutes } from "react-router-dom";
import Home from "./Home";
import Users from "./users/Users";
import Products from "./products/Products";
import AddUser from "./users/add-user";
import AddProduct from "./products/add-product";
import Login from "./Login";
import RequireAuth from './auth/RequireAuth'
import AdminAuth from "./auth/AdminAuth";
import EditUser from "./users/edit-user";
import MyOrders from "./shopping/my-orders";
import Orders from "./orders/Orders.jsx"


export default function Routes() {
    return useRoutes([
        {
            path: "/login", element: <Login />
        },
        {
            element: <RequireAuth />, children: [
                {path: "/", element: <Home />},
                {path: "/myorders", element: <MyOrders /> },
                {path: "/users/*", element: (<AdminAuth><Users /><Outlet /></AdminAuth>), children: [{index: true, path: "add", element: <AddUser />}, {index: true, path: "edit", element: <EditUser />}]},
                {path: "/products/*", element: (<AdminAuth><Products /><Outlet /></AdminAuth>), children: [{path: "add", element: <AddProduct />}]},
                {path: "/orders/*", element: (<AdminAuth><Orders /><Outlet /></AdminAuth>)}
            ]
        }
    ])
}