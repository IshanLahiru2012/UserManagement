import React, {useEffect, useRef, useState} from "react";
import {useAuth} from "../auth/useAuth.ts";
import { useLocation, useNavigate} from "react-router-dom";
import axios from '../api/LoginApi.ts'
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import {LoginResponse} from "../type.ts";

const LOGIN_URL = '/api/v1/login';

const initialFormData ={
    username: '',
    password: '',
}
export const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const usernameRef = useRef<HTMLInputElement>(null);

    const {setAuth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const [formData, setFormData] = useState(initialFormData);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try{
            const response = await axios.post<LoginResponse>(
                LOGIN_URL,
                JSON.stringify({formData}),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials : true
                }
                );
            if(!response.data){
                toast.error("Unexpected response format");
                console.log("Unexpected response format")
                return;
            }

            const { accessToken, roles, email } = response?.data ?? {};
            const { username } = formData;

            const authData = { username, email, roles, accessToken };

            setAuth(authData);
            sessionStorage.setItem("auth", JSON.stringify(authData));
            setFormData(initialFormData);
            navigate(from, {replace:true})
            toast.success("Successfully logged");

        }catch (err ){
            const error = err as AxiosError<{ message: string }>;
            const errorMessage = error.response?.data?.message || 'Login credentials error';
            console.error("Login Error:", errorMessage);
            toast.error(errorMessage);
        }finally {
            setIsLoading(false);
        }

    };
    useEffect(()=>{
        if(usernameRef.current){
            usernameRef.current.focus();
        }
    },[])

    return (
        <>
            <div className="flex w-screen h-screen flex-col bg-gray-500 justify-center items-center">
                <form onSubmit={handleSubmit} className="flex flex-col bg-gray-200 p-4 gap-4  rounded-lg">
                    <h1 className="flex justify-center font-bold text-2xl font-serif">Login Form</h1>
                    <hr className="my-2 border-t border-gray-300" />
                    <div className="flex space-x-1 items-center">
                        <label className="flex justify-between  min-w-24" htmlFor="username">User Name <span>:</span> </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            ref={usernameRef}
                            placeholder="Please enter username here"
                            required
                            value={formData.username}
                            className="flex-grow p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex space-x-1 items-center">
                        <label className="flex justify-between min-w-24"  htmlFor="password">Password <span>:</span> </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Please enter password here"
                            required
                            value={formData.password}
                            className="flex-grow p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="mt-2 text-right">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-700"
                            >
                                {isLoading ? "Loading" : "Log in"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>


        </>
    )
}