import {LockClosedIcon} from "@heroicons/react/20/solid/index.js";
import {createRef, useState} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";

export default function Signup(){
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const confirmPasswordRef = createRef();
    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState(null);
    const formSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: confirmPasswordRef.current.value
        }
        axiosClient.post('/signup', payload)
            .then(({data}) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if(response && response.status === 422){
                    setErrors(response.data.errors);
                }
            })
    }
    return (
        <div>
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 m-12">
                <div className="w-full max-w-md space-y-8 shadow-2xl p-20 rounded-md bg-gray-50">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Sign up to create an account
                        </h2>
                        {errors && (
                            <div className='p-1 bg-red-600 text-white rounded-lg mb-1'>
                                {Object.keys(errors).map(key => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))}
                            </div>
                        )}
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={formSubmit}>
                        <input type="hidden" name="remember" defaultValue="true"/>
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Full Name
                                </label>
                                <input
                                    ref={nameRef}
                                    required
                                    className="relative block w-full appearance-none rounded-md mt-2 mb-2 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Full Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    ref={emailRef}
                                    type="email"
                                    required
                                    className="relative block w-full appearance-none rounded-md mt-2 mb-2 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    ref={passwordRef}
                                    type="password"
                                    required
                                    className="relative block w-full appearance-none rounded-md mt-2 mb-2 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Confirm Password
                                </label>
                                <input
                                    ref={confirmPasswordRef}
                                    type="password"
                                    required
                                    className="relative block w-full appearance-none rounded-md mt-2 mb-2 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Confirm Password"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                                  aria-hidden="true"/>
                                </span>
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
