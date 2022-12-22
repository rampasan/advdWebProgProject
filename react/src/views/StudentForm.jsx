import {useNavigate, useParams} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

export default function StudentForm(){
    const {id} = useParams();
    const {setNotification} = useStateContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [student, setStudent] = useState({
        id: null,
        student_id: '',
        name: '',
        course: '',
    })

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`students/${id}`)
                .then(({data}) => {
                    setLoading(false);
                    setStudent(data);
                })
                .catch(() => {
                    setLoading(false);
                })
        }, [])
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if(student.id){
            axiosClient.put(`/students/${student.id}`, student)
                .then(() => {
                    console.log(student);
                    setNotification("Student has been updated");
                    navigate('/students');
                })
                .catch(err => {
                    const response = err.response;
                    if(response && response.status === 422){
                        setErrors(response.data.errors);
                    }
                })
        } else {
            axiosClient.post(`/students`, student)
                .then(() => {
                    setNotification("Student has been created");
                    navigate('/students');
                })
                .catch(err => {
                    const response = err.response;
                    if(response && response.status === 422){
                        setErrors(response.data.errors);
                    }
                })
        }
    }
    return (
        <div className='block p-6 rounded-lg shadow-lg bg-white max-w-lg'>
            {student.id && (
                <h1 className='text-xl font-bold mx-2'>Update Student: {student.name}</h1>
            )}
            {!student.id && (
                <h1 className='text-xl font-bold mx-2'>New Student</h1>
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
                        <input className='block rounded-md p-2 mx-2 my-2 w-80' type='text' onChange={ev => setStudent({...student, student_id: ev.target.value})} value={student.student_id} placeholder="Student ID"/>
                        <input className='block rounded-md p-2 mx-2 my-2 w-80' type='text' onChange={ev => setStudent({...student, name: ev.target.value})} value={student.name} placeholder="Name"/>
                        <input className='block rounded-md p-2 mx-2 my-2 w-80' type='text' onChange={ev => setStudent({...student, course: ev.target.value})} value={student.course} placeholder="Course"/>
                        <button className='w-full bg-blue-500 hover:bg-blue-700 text-white text-center rounded-md p-2 m-2'>Save</button>
                    </form>
                )}
            </div>
        </div>
    )
}
