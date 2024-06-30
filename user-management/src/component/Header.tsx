import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuth} from "../auth/useAuth.ts";

const Header = () => {

    const {auth,setAuth} = useAuth()

    const [buttonTitle, setButtonTitle] = useState('')
    const navigate = useNavigate();

    const handleLogout = () => {
        if(!sessionStorage.getItem('auth')){
            console.log('awa')
            navigate('/login')
        }else {
            sessionStorage.removeItem('auth');
            setAuth({username: '', email: '', roles: [], accessToken: ''})
            navigate('/')
        }

    };

    useEffect(()=>{
        console.log(auth)
        auth.username ?
            setButtonTitle("LogOut") :
            setButtonTitle("LogIn");
    },[auth])

    return (
        <header className="flex justify-between bg-blue-500 text-white p-6">
            <h1 className="font-bold text-3xl font-serif">User Management</h1>
            <nav className="flex items-center gap-2">
                <Link to="/dashboard">Dashboard</Link>
                <button onClick={handleLogout}>{buttonTitle}</button>

            </nav>
        </header>
    );
};

export default Header;
