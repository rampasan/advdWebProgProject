import {useStateContext} from "../context/ContextProvider.jsx";
import {Link, Navigate, Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import {ArrowLeftOnRectangleIcon, BellIcon} from "@heroicons/react/24/outline";
import axiosClient from "../axios-client.js";

export default function AuthorizedLayout() {
    const {user, token, notification, setUser, setToken} = useStateContext();
    const [show, setShow] = useState(false);
    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post('/logout')
            .then(() => {
                setUser({});
                setToken(null);
            })
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
            })
    }, [])

    if (!token) {
        return (
            <Navigate to='/login'/>
        )
    }

    return (
        <div>
            <div className="w-full h-full bg-gray-200">
                <div className="flex flex-no-wrap">
                    {/* Sidebar starts */}
                    <div className="absolute lg:relative w-64 h-screen shadow bg-gray-100 hidden lg:block">
                        <div className="h-16 w-full flex items-center px-8">
                            <p className='font-bold text-blue-900'>FYP Management System</p>
                        </div>
                        <ul aria-orientation="vertical" className=" py-6">
                            <li className="pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mb-4 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                                <div className="flex items-center">
                                    <Link to='/supervisees' className='ml-2'>Supervisees</Link>
                                </div>
                            </li>
                            <li className="pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mb-4 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                                <div className="flex items-center">
                                    <Link to='/examinees' className='ml-2'>Examinees</Link>
                                </div>
                            </li>
                            {user.is_admin === 1 && (
                                <li className="pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mb-4 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                                    <div className="flex items-center">
                                        <Link to='/users' className='ml-2'>Users</Link>
                                    </div>
                                </li>
                            )}
                            {user.is_admin === 1 && (
                                <li className="pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mb-4 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                                    <div className="flex items-center">
                                        <Link to='/students' className='ml-2'>Students</Link>
                                    </div>
                                </li>
                            )}
                            <li className="pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mb-4 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                                <div className="flex items-center">
                                    <Link to='/projects' className='ml-2'>Projects</Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* Sidebar ends */}
                    <div className="w-full">
                        {/* Navigation starts */}
                        <nav
                            className="h-16 flex items-center lg:items-stretch justify-end lg:justify-between bg-white shadow relative z-10">
                            <div className="hidden lg:flex w-full pr-6">
                                <div className="w-1/2 h-full hidden lg:flex items-center pl-6 pr-24">
                                    {/*  To make sure that header icons are aligned to the right  */}
                                </div>
                                <div className="w-1/2 hidden lg:flex">
                                    <div className="w-full flex items-center pl-8 justify-end">
                                        <div
                                            className="h-full flex items-center justify-center border-l border-r mr-4 text-gray-600">
                                            <p className='px-2 font-bold'>{user.name}</p>
                                        </div>
                                        <div className="flex items-center relative cursor-pointer">
                                            <div className="rounded-full flex items-center justify-center text-gray-600"
                                                 onClick={onLogout}>
                                                <ArrowLeftOnRectangleIcon className='h-9 w-9'/>
                                                <p>Log Out</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        {/* Navigation ends */}
                        {notification && (
                            <div className=' w-72 rounded-md p-3 m-3 bg-green-500 text-white'>
                                {notification}
                            </div>
                        )}
                        {/* Remove class [ h-64 ] when adding a card block */}
                        <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
                            {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
                            <div className="w-full h-full rounded">
                                <Outlet/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
