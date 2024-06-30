import {useContext} from "react";
import {AuthContext} from "../provider/AuthProvider.tsx";
import {AuthUser} from "../type.ts";


export const useAuth = (): { auth: AuthUser; setAuth: React.Dispatch<React.SetStateAction<AuthUser>> }  =>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context;
}