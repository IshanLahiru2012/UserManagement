import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "./useAuth.ts";

interface AuthCheckProps {
    allowedRoles : string[];
}
export const AuthCheck = ({allowedRoles}:AuthCheckProps)=>{
    const {auth} = useAuth();
    const location = useLocation();
    console.log('auth check',auth)

    return(
        auth?.roles?.find(role=> allowedRoles?.includes(role))
            ? <Outlet/>
            : auth?.roles.length >0
                ? <Navigate to="/unauthorized"/>
                : <Navigate to="/login" state={{from: location}} replace/>
    );
}