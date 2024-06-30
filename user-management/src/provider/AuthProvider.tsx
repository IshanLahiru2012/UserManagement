import React, {createContext, useState} from "react";
import {AuthUser} from "../type.ts";

// Define the initial state for auth context
const initialAuthState: AuthUser = {
    username: '',
    email : '',
    roles: [],
    accessToken: ''
};
const AuthContext = createContext<{auth: AuthUser; setAuth: React.Dispatch<React.SetStateAction<AuthUser>>;}>
                    ({auth: initialAuthState, setAuth: () => {throw new Error('setAuth function must be overridden');}} );
interface AuthProps {
    children : React.ReactNode;
}
const AuthProvider = ({children}:AuthProps)=>{

    const [auth, setAuth] = useState<AuthUser>(() => {
        const storedAuth = sessionStorage.getItem("auth");
        return storedAuth ? JSON.parse(storedAuth) : initialAuthState;
    });

    return(
        <>
            <AuthContext.Provider value={{auth, setAuth}}>
                {children}
            </AuthContext.Provider>
        </>
    )

}
export { AuthContext, AuthProvider}