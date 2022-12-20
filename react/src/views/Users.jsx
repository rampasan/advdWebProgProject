import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";

export default function Users(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = () => {
        setLoading(true);
        axiosClient.get('/users')
            .then(({data}) => {
                setLoading(false);
                console.log(data)
            })
            .catch(() => {
                setLoading(false);
            })
    }
    return (
        <div>
            <div className='flex items-center justify-between mb-5'>
                <h1 className='font-bold text-xl'>Users</h1>
                <Link to='/users/new' className='rounded-md text-white bg-blue-500 hover:bg-blue-700 p-3'>Add New User</Link>
            </div>
            <div className='rounded-lg border-solid border-2 border-black'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created at</th>
                            <th>Approved</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.created_at}</td>
                            {user.is_approved === 1 && (
                                <td>Approved</td>
                            )}
                            {user.is_approved === 0 && (
                                <td>Not Approved</td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
