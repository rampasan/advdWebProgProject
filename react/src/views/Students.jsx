import {Fragment, useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {Menu, Transition} from "@headlessui/react";
import {EllipsisVerticalIcon} from "@heroicons/react/24/solid/index.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Students(){
    const [students, setStudents] = useState([]);
    const [paginate, setPaginate] = useState(1);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext();

    useEffect(() => {
        getStudents();
    }, [paginate])
    const handlePaginate = (direction) => {
        setPaginate(prevPage => prevPage + direction)
    }
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const getStudents = () => {
        setLoading(true);
        axiosClient.get(`students?page=${paginate}`)
            .then(({data}) => {
                setLoading(false);
                console.log(data);
                setStudents(data.data);
            })
            .catch(() => {
                setLoading(false);
            })
    }
    const toDelete = (student) => {
        if(!window.confirm('Are you sure you want to delete this student?')){
            return
        }
        axiosClient.delete(`/students/${student.id}`)
            .then(() => {
                setNotification("Student has been successfully deleted");
                getStudents();
            })
    }
    return (
        <div>
            <div>
                <div className='flex items-center justify-between mb-5'>
                    <h1 className='font-bold text-xl'>Students</h1>
                    <Link to='/students/new' className='rounded-md text-white bg-blue-500 hover:bg-blue-700 p-3'>Add New Student</Link>
                </div>
                <div className='flex flex-col'>
                    <div className='sm:-mx-6 lg:-mx-8'>
                        <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
                            <div className=''>
                                <table className='min-w-full'>
                                    <thead className='bg-white border-b'>
                                    <tr className='font-bold'>
                                        <th className='text-sm text-gray-900 px-6 py-4 text-left'>Student ID</th>
                                        <th className='text-sm text-gray-900 px-6 py-4 text-left'>Name</th>
                                        <th className='text-sm text-gray-900 px-6 py-4 text-left'>Course</th>
                                        <th className='text-sm text-gray-900 px-6 py-4 text-left'>Actions</th>
                                    </tr>
                                    </thead>
                                    {loading && (
                                        <tbody>
                                        <tr className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
                                            <td colSpan='4' className='text-sm font-bold text-gray-900 px-6 py-4 text-center'>Loading...</td>
                                        </tr>
                                        </tbody>
                                    )}
                                    {!loading && (
                                        <tbody>
                                        {students.map((student) => (
                                            <tr key={student.id} className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
                                                <td className='text-sm font-bold text-gray-900 px-6 py-4 text-left'>{student.student_id}</td>
                                                <td className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>{student.name}</td>
                                                <td className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>{student.course}</td>
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
                                                                            <Link to={'/students/'+student.id} className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                                                                                Edit
                                                                            </Link>
                                                                        )}
                                                                    </Menu.Item>
                                                                    <Menu.Item>
                                                                        {({active}) => (
                                                                            <button onClick={ev => toDelete(student)} className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm w-full text-left')}>
                                                                                Delete
                                                                            </button>
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
