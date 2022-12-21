import {useStateContext} from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import {Menu, Transition} from "@headlessui/react";
import {EllipsisVerticalIcon} from "@heroicons/react/24/solid/index.js";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Examinees(){
    const [projects, setProjects] = useState([]);
    const [paginate, setPaginate] = useState(1);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [students, setStudents] = useState([]);
    const {setNotification} = useStateContext();

    useEffect(() => {
        getProjects();
    }, [])

    const getUsers = async () => {
        await axiosClient.get(`allusers`)
            .then(({data}) => {
                // console.log(data)
                setUsers(data.data);
            })
            .catch(() => {
                setLoading(false);
            })
    }
    const getStudents = async () => {
        await axiosClient.get(`allstudents`)
            .then(({data}) => {
                // console.log(data)
                setStudents(data.data);
            })
            .catch(() => {
                setLoading(false);
            })
    }

    useEffect(() => {
        setLoading(true);
        try {
            getUsers();
            getStudents();
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }, [])

    const handlePaginate = (direction) => {
        setPaginate(prevPage => prevPage + direction)
    }
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const getProjects = () => {
        setLoading(true);
        axiosClient.get(`/examiner?page=${paginate}`)
            .then(({data}) => {
                setLoading(false);
                console.log(JSON.stringify(data.data, null, 2));
                setProjects(data.data);
                console.log(projects);
            })
            .catch(() => {
                setLoading(false);
            })
    }
    return (
        <div>
            <div>
                <div className='flex items-center justify-between mb-5'>
                    <h1 className='font-bold text-xl'>Projects</h1>
                </div>
                <div className='flex flex-col'>
                    <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
                        <div className=''>
                            <div className='sm:-mx-6 lg:-mx-8'>
                                <table className='min-w-full'>
                                    <thead className='bg-white border-b'>
                                    <tr className='font-bold'>
                                        <th className='text-sm text-gray-900 px-6 py-4 text-left'>Project ID</th>
                                        <th className='text-sm text-gray-900 px-6 py-4 text-left'>Title</th>
                                        <th className='text-sm text-gray-900 px-6 py-4 text-left'>Student Name</th>
                                        <th className='text-sm text-gray-900 px-6 py-4 text-left'>Start Date</th>
                                        <th className='text-sm text-gray-900 px-6 py-4 text-left'>End Date </th>
                                        <th className='text-sm text-gray-900 px-6 py-4 text-left'>Status</th>
                                        <th className='text-sm text-gray-900 px-6 py-4 text-left'>Duration</th>
                                    </tr>
                                    </thead>
                                    {loading && (
                                        <tbody>
                                        <tr className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
                                            <td colSpan='8' className='text-sm font-bold text-gray-900 px-6 py-4 text-center'>Loading...</td>
                                        </tr>
                                        </tbody>
                                    )}
                                    {!loading && (
                                        <tbody>
                                        {projects.map((project) => (
                                            <tr key={project.id} className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
                                                <td className='text-sm font-bold text-gray-900 px-6 py-4 text-left'>{project.id}</td>
                                                <td className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>{project.title}</td>
                                                {students.map((student) => (
                                                    project.student_id === student.student_id && (
                                                        <td className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>{student.name}</td>
                                                    )
                                                ))}
                                                <td className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>{project.start_date}</td>
                                                <td className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>{project.end_date}</td>
                                                <td className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>{project.status}</td>
                                                <td className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>{project.duration}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    )}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    {paginate === 1 && (
                        <button disabled className='rounded-md text-white bg-blue-300 p-3'>Previous</button>
                    )}
                    {paginate > 1 && (
                        <button className='rounded-md text-white bg-blue-500 hover:bg-blue-700 p-3' onClick={() => handlePaginate(-1)}>Previous</button>
                    )}
                    <button className='rounded-md text-white bg-blue-500 hover:bg-blue-700 p-3' onClick={() => handlePaginate(1)}>Next</button>
                </div>
            </div>
        </div>
    )
}
