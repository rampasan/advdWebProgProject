import {Link} from "react-router-dom";
import {Menu, Transition} from "@headlessui/react";
import {EllipsisVerticalIcon} from "@heroicons/react/24/solid";
import {Fragment, useEffect, useState} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";

export default function Supervisees(){
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
        axiosClient.get(`/supervisor?page=${paginate}`)
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
                                         <th className='text-sm text-gray-900 px-6 py-4 text-left'>Actions</th>
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
                                                 <td className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                                                     <Menu as='div' className='relative inline-block text-left'>
                                                         <div>
                                                             <Menu.Button className='inline-flex w-full justify-center rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100'>
                                                                 <EllipsisVerticalIcon className='h-5 w-5' />
                                                             </Menu.Button>
                                                         </div>
                                                         <Transition
                                                             as={Fragment}
                                                             enter="transition ease-out duration-100"
                                                             enterFrom="transform opacity-0 scale-95"
                                                             enterTo="transform opacity-100 scale-100"
                                                             leave="transition ease-in duration-75"
                                                             leaveFrom="transform opacity-100 scale-100"
                                                             leaveTo="transform opacity-0 scale-95"
                                                         >
                                                             <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                                                 <div className='py-1'>
                                                                     <Menu.Item>
                                                                         {({active}) => (
                                                                             <Link to={'/supervisees/'+project.id} className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                                                                                 Edit
                                                                             </Link>
                                                                         )}
                                                                     </Menu.Item>
                                                                 </div>
                                                             </Menu.Items>
                                                         </Transition>
                                                     </Menu>
                                                 </td>
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
