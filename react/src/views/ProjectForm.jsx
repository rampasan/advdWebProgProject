import {useNavigate, useParams} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
import {Fragment, useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Combobox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronDownIcon} from "@heroicons/react/24/solid";

export default function ProjectForm() {
    const {id} = useParams();
    const {setNotification} = useStateContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [users, setUsers] = useState([])
    const [students, setStudents] = useState([])
    const [project, setProject] = useState({
        id: null,
        student_id: '',
        title: '',
        supervisor_id: null,
        examiner1_id: null,
        examiner2_id: null,
    })

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

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`projects/${id}`)
                .then(({data}) => {
                    setLoading(false);
                    setProject(data);
                })
                .catch(() => {
                    setLoading(false);
                })
        }, [])
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (project.id) {
            console.log(project)
            axiosClient.put(`/projects/${project.id}`, project)
                .then(() => {
                    console.log(project);
                    setNotification("Project has been updated");
                    navigate('/projects');
                })
                .catch(err => {
                    const response = err.response;
                    if (response) {
                        setErrors(response.data.errors);
                    }
                })
        } else {
            axiosClient.post(`/projects`, project)
                .then(() => {
                    setNotification("Project has been created");
                    navigate('/projects');
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                })
        }
    }
    return (
        <div className='block p-6 rounded-lg shadow-lg bg-white max-w-sm'>
            {project.id && (
                <h1 className='text-xl font-bold'>Update Project: {project.title}</h1>
            )}
            {!project.id && (
                <h1 className='text-xl font-bold'>New User</h1>
            )}
            <div>
                {loading && (
                    <div className='items-center'>
                        Loading...
                    </div>
                )}
                {errors && (
                    <div className='p-1 bg-red-600 text-white rounded-lg mb-1'>
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input type='text' onChange={ev => setProject({...project, title: ev.target.value})}
                               value={project.title} placeholder="Project Title"/>
                        <br/>
                        <div>
                            <label htmlFor='student'>Student name</label>
                            <select name='student' onChange={(ev) => setProject({...project, student_id: ev.target.value})}>
                                {project.id ? (
                                    students.map((student) => (
                                        project.student_id === student.student_id ? (
                                            <option selected value={student.student_id}>{student.name}</option>
                                        ) : (
                                            <option value={student.student_id}>{student.name}</option>
                                        )
                                    ))
                                ) : (
                                    students.map((student) => (
                                        <option value={student.student_id}>{student.name}</option>
                                    ))
                                )}
                            </select>
                        </div>
                        <div>
                            <label htmlFor='supervisor'>Supervisor</label>
                            <select name='supervisor' onChange={(ev) => setProject({...project, supervisor_id: ev.target.value})}>
                                {project.id ? (
                                    users.map((user) => (
                                        project.supervisor_id === user.id ? (
                                            <option selected value={user.id}>{user.name}</option>
                                        ) : (
                                            <option value={user.id}>{user.name}</option>
                                        )
                                    ))
                                ) : (
                                    users.map((user) => (
                                        <option value={user.id}>{user.name}</option>
                                    ))
                                )}
                            </select>
                        </div>
                        <div>
                            <label htmlFor='examiner1'>Examiner 1</label>
                            <select name='examiner1' onChange={(ev) => setProject({...project, examiner1_id: ev.target.value})}>
                                {project.id ? (
                                    users.map((user) => (
                                        project.examiner1_id === user.id ? (
                                            <option selected value={user.id}>{user.name}</option>
                                        ) : (
                                            <option value={user.id}>{user.name}</option>
                                        )
                                    ))
                                ) : (
                                    users.map((user) => (
                                        <option value={user.id}>{user.name}</option>
                                    ))
                                )}
                            </select>
                        </div>
                        <div>
                            <label htmlFor='examiner2'>Examiner 2</label>
                            <select name='examiner2' onChange={(ev) => setProject({...project, examiner2_id: ev.target.value})}>
                                {project.id ? (
                                    users.map((user) => (
                                        project.examiner2_id === user.id ? (
                                            <option selected value={user.id}>{user.name}</option>
                                        ) : (
                                            <option value={user.id}>{user.name}</option>
                                        )
                                    ))
                                ) : (
                                    users.map((user) => (
                                        <option value={user.id}>{user.name}</option>
                                    ))
                                )}
                            </select>
                        </div>
                        <button
                            className='w-full bg-blue-500 hover:bg-blue-700 text-white text-center rounded-md p-2 m-2'>Save
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}
