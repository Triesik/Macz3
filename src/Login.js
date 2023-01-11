import React, {useEffect, useState} from 'react'
import {Navigate, useNavigate} from "react-router-dom";
import {Authenticate} from "./service/AuthService";

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState("");

    const submitLogin=async (e)=>{
        setLoading(true);
        e.preventDefault();
        //call to auth service
        const errors = await Authenticate(username, password);

        setLoading(false);
        if(errors === "")
            navigate("/gamescreen");


        setErrors(errors);
    }

    return (
            <form onSubmit={e=> submitLogin(e)}>
                <div className="flex flex-col justify-between bg-emerald-100 w-1/2 h-96 p-12">
                    <span className={"text-4xl text-center"}>Login</span>

                    <div className={"flex flex-col"}>
                        <span>User name</span>
                        <input type="text" name="userName" value={username} onChange={e=> setUsername(e.target.value)} />
                    </div>

                    <div className={"flex flex-col"}>
                        <span>Password</span>
                        <input type="password" name="password" value={password} onChange={e=> setPassword(e.target.value)} />
                    </div>
                    <div className={"flex h-20 justify-center items-center"}>
                        <span className={"text-red-500"}>{errors}</span>
                    </div>
                    <input className={"bg-cyan-400 p-5 font-bold "} type="submit" value="Submit" disabled={loading}/>
                </div>
            </form>
    )
}