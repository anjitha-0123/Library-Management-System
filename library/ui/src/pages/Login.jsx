import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import llogo from '../assets/images/library-logo.avif';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ UserName: username, Password: password })
            });
            
            const data = await response.json();
           
            
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
            
            alert(data.message);
            navigate(data.userRole === 'admin' ? '/admindash' : '/home');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="bg-gray-400 min-h-screen flex flex-col items-center justify-center">
            <div className="text-center text-white">
                <img src={llogo} alt="Logo" className="size-32 rounded-full" />
                <p className="font-semibold">BOOK SHELF</p>
                <h1 className="text-5xl font-bold text-gray-900 mt-6">Welcome to the Library System</h1>
                <h2 className="text-white mt-4">Login to Continue...</h2>
            </div>
            
            <div className="bg-neutral-200 w-[450px] p-6 mt-10 shadow-lg rounded-lg">
                <h2 className="text-gray-900 font-semibold text-3xl text-center">Login</h2>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                <form onSubmit={handleLogin} className="flex flex-col mt-4">
                    <label className="font-semibold">User Name</label>
                    <input 
                        type="text" 
                        className="border-2 border-cyan-700 p-2 mt-2" 
                        required 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label className="font-semibold mt-4">Password</label>
                    <input 
                        type="password" 
                        className="border-2 border-cyan-700 p-2 mt-2" 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" className="bg-gray-900 w-full h-10 text-lg text-white rounded-md mt-4 hover:text-xl">Login</button>
                </form>
                
                <p className="mt-6 text-gray-900 text-center">Don't have an Account? <Link to="/signup" className="text-indigo-700">SignUp</Link></p>
            </div>
        </div>
    );
}

export default Login;
