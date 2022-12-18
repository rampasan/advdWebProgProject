import {useStateContext} from "../context/ContextProvider.jsx";
import {Navigate, Outlet} from "react-router-dom";

export default function UnAuthorizedLayout(){
    const {user, token} = useStateContext();
    if(token){
        return (
            <Navigate to='/'/>
        )
    }
    return (
        <div>
            <Outlet/>
        </div>
    )
}
