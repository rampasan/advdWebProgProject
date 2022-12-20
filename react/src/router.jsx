import {createBrowserRouter, Navigate} from "react-router-dom";
import AuthorizedLayout from "./components/AuthorizedLayout";
import Dashboard from "./views/Dashboard";
import UnAuthorizedLayout from "./components/UnAuthorizedLayout";
import Login from "./views/Login";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";
import Examinees from "./views/Examinees";
import Supervisees from "./views/Supervisees";
import Users from "./views/Users";
import UserForm from "./views/UserForm";

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
                {
                    path: '/examinees',
                    element: <Examinees/>
                },
                {
                    path: '/supervisees',
                    element: <Supervisees/>
                },
                {
                    path: '/users',
                    element: <Users/>
                },
                {
                    path: '/users/new',
                    element: <UserForm key='userCreate'/>
                },
                {
                    path: '/users/:id',
                    element: <UserForm key='userUpdate'/>
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
