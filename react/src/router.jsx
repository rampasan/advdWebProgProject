import {createBrowserRouter, Navigate} from "react-router-dom";
import AuthorizedLayout from "./components/AuthorizedLayout";
import Dashboard from "./views/Dashboard";
import UnAuthorizedLayout from "./components/UnAuthorizedLayout";
import Login from "./views/Login";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <AuthorizedLayout/>,
            children: [
                {
                    path: '/',
                    element: <Navigate to='/dashboard' />
                },
                {
                    path: '/dashboard',
                    element: <Dashboard/>
                },
            ]
        },
        {
            path: '/',
            element: <UnAuthorizedLayout/>,
            children: [
                {
                    path: '/login',
                    element: <Login/>
                },
                {
                    path: '/signup',
                    element: <Signup/>
                }
            ]
        },
        {
            path: '*',
            element: <NotFound/>
        }
    ]
)

export default router;
