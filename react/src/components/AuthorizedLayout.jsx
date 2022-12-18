import {useStateContext} from "../context/ContextProvider.jsx";
import {Navigate, Outlet} from "react-router-dom";

export default function AuthorizedLayout(){
    const {user, token} = useStateContext();
    if(!token){
        return (
            <Navigate to='/login'/>
        )
    }
    return (
        <div>
            <Outlet/>
        </div>
    )
}
