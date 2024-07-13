import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleForm = async (e) => {
        e.preventDefault();

        let result = await fetch('http://localhost:5000/login',{
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({email,password}),
        })

        result = await result.json();

        localStorage.setItem('user',JSON.stringify(result.result));
        localStorage.setItem('token', JSON.stringify(result.auth));
        console.log(result);
        navigate('/');

    }

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/');
        }
    },[])

    return (

        <div className="flex w-full justify-center items-center">
            <form onSubmit={handleForm} className="flex flex-col justify-center items-center w-[400px] border-none rounded-lg p-5 m-5 bg-black">
                <h1 className="text-3xl font-bold text-orange-500">Login</h1>
                <input placeholder="Enter your Email" type="email" className="bg-white w-full rounded-lg m-8 p-4" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input placeholder="Enter your Password" type="password" className="bg-white w-full rounded-lg m-8 p-4" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className="text-white p-3 rounded-md bg-green-300 w-[100px] m-8">Login</button>
            </form>
    </div>
    
    );
}

export default Login;

