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
import Students from "./views/Students";
import Projects from "./views/Projects";
import StudentForm from "./views/StudentForm";
import ProjectForm from "./views/ProjectForm";
import SuperviseeForm from "./views/SuperviseeForm";
import ExamineeForm from "./views/ExamineeForm";

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <AuthorizedLayout/>,
            children: [
                {
                    path: '/',
                    element: <Navigate to='/supervisees' />
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
                {
                    path: '/students',
                    element: <Students/>
                },
                {
                    path: '/projects',
                    element: <Projects/>
                },
                {
                    path: '/students/:id',
                    element: <StudentForm key='studentUpdate'/>
                },
                {
                    path: '/students/new',
                    element: <StudentForm key='studentCreate' />
                },
                {
                    path: '/projects/new',
                    element: <ProjectForm key='projectCreate'/>
                },
                {
                    path: '/projects/:id',
                    element: <ProjectForm key='projectUpdate' />
                },
                {
                    path: '/supervisees/:id',
                    element: <SuperviseeForm/>
                },
                {
                    path: '/examinees/:id',
                    element: <ExamineeForm/>
                }
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
