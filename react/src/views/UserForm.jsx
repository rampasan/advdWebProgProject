import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Switch} from "@headlessui/react";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function UserForm() {
    const {id} = useParams();
    const {setNotification} = useStateContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        is_approved: false,
    });

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`users/${id}`)
                .then(({data}) => {
                    setLoading(false);
                    setUser(data);
                    console.log(data);
                })
                .catch(() => {
                    setLoading(false);
                })
        }, [])
    }
    const onSubmit = (ev) => {
        ev.preventDefault();
        if(user.id){
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    console.log(user);
                    setNotification("User has been updated");
                    navigate('/users');
                })
                .catch(err => {
                    const response = err.response;
                    if(response && response.status === 422){
                        setErrors(response.data.errors);
                    }
                })
        } else {
            axiosClient.post(`/users`, user)
                .then(() => {
                    setNotification("User has been created");
                    navigate('/users');
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
            {user.id && (
                <h1 className='text-xl font-bold mx-2'>Update User: {user.name}</h1>
            )}
            {!user.id && (
                <h1 className='text-xl font-bold mx-2'>New User</h1>
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
                        <input className='block rounded-md p-2 mx-2 my-2 w-80' type='text' onChange={ev => setUser({...user, name: ev.target.value})} value={user.name} placeholder="Name"/>
                        <input className='block rounded-md p-2 mx-2 my-2 w-80' type='email' onChange={ev => setUser({...user, email: ev.target.value})} value={user.email} placeholder="Email"/>
                        <input className='block rounded-md p-2 mx-2 my-2 w-80' type='password' onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password"/>
                        <input className='block rounded-md p-2 mx-2 my-2 w-80' type='password' onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Confirm Password"/>
                        <div className='flex item-center justify-between my-2'>
                            <h1>Approved</h1>
                            <Switch
                                checked={user.is_approved}
                                onChange={() => setUser({...user, is_approved: !user.is_approved})}
                                className={`${user.is_approved ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                                <span className="sr-only">Approved</span>
                                <span className={`${user.is_approved ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}/>
                            </Switch>
                        </div>
                        <button className='w-full bg-blue-500 hover:bg-blue-700 text-white text-center rounded-md p-2 m-2'>Save</button>
                    </form>
                )}
            </div>
        </div>
    )
}
