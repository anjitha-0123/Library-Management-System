
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import llogo from '../assets/images/library-logo.avif';

function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [userRole, setUserRole] = useState("User");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    FirstName: firstName,
                    LastName: lastName,
                    UserName: userName,
                    Password: password,
                    UserRole: userRole
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            navigate("/login");
        } catch (error) {
            setError(error.message || "Signup Failed: Please try again!");
        }
    };

    return (
        <div>
            <img src={llogo} className="size-32 rounded-full mt-6 ml-6" alt="Library Logo" />
            <p className="font-semibold text-white pl-9">BOOK SHELF</p>
            <h1 className="font-bold text-5xl text-gray-900 pl-20 absolute top-52">
                Welcome to the Library System
            </h1>
            <h3 className="pl-24 text-white absolute top-72">SignUp to Continue...</h3>

            <div className="bg-neutral-200 w-[450px] h-[630px] ml-[1000px] shadow-lg shadow-slate-800 rounded-lg">
                <h2 className="text-gray-900 font-semibold flex justify-center pt-4 text-3xl">SignUp</h2>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                <form onSubmit={handleSignup} className="p-6">
                    <label htmlFor="firstname" className="font-semibold">First Name</label><br />
                    <input 
                        id="firstname" 
                        type="text" 
                        className="border-2 border-cyan-700 w-64 h-10 px-2 rounded-md" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required 
                    /><br /><br />

                    <label htmlFor="lastname" className="font-semibold">Last Name</label><br />
                    <input 
                        id="lastname" 
                        type="text" 
                        className="border-2 border-cyan-700 w-64 h-10 px-2 rounded-md" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required 
                    /><br /><br />

                    <label htmlFor="username" className="font-semibold">User Name</label><br />
                    <input 
                        id="username" 
                        type="text" 
                        className="border-2 border-cyan-700 w-64 h-10 px-2 rounded-md" 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required 
                    /><br /><br />

                    <label htmlFor="password" className="font-semibold">Password</label><br />
                    <input 
                        id="password" 
                        type="password" 
                        className="border-2 border-cyan-700 w-64 h-10 px-2 rounded-md" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    /><br /><br />

                    <label htmlFor="role" className="font-semibold">User Role</label><br />
                    <select 
                        id="role" 
                        className="border-2 border-cyan-700 w-64 h-10 px-2 rounded-md"
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select><br /><br />

                    <button type="submit" className="bg-gray-900 w-24 h-10 text-lg text-white rounded-md hover:text-xl">
                        SignUp
                    </button>

                    <p className="mt-6 text-gray-900">
                        Already have an Account? <Link to="/login" className="text-indigo-700">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;