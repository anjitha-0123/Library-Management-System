import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import llogo from '../assets/images/library-logo.avif';

function Navbar() {
    const navigate=useNavigate()
    const handleLogout = async () => {
        try {
          const response = await fetch("/logout", {
            method: "GET",
            credentials: "include",
          });
    
          if (response.ok) {
            navigate("/login");
          } else {
            console.error("Logout failed");
          }
        } catch (error) {
          console.error("Error logging out:", error);
        }
      };
    
  return (
    <div className="flex pt-6 text-white">
    <img src={llogo} className="size-28 rounded-full mt-4 ml-12"/>
    <Link to='/addbook' className="ml-[700px] mt-20 text-lg text-white hover:text-xl ">Add Book</Link>
    <Link to='/viewbook' className="ml-12 mt-20 text-lg text-white hover:text-xl ">View Books</Link>
    <Link to='/updatebook' className="ml-12 mt-20 text-lg text-white hover:text-xl ">Update Book  </Link>
    <Link to='/userdetails' className=" ml-12 mt-20 text-lg text-white hover:text-xl ">User Details</Link>
    <Link to='/issuebook' className=" ml-12 mt-20 text-lg text-white hover:text-xl ">Issue Book</Link>
    <button onClick={handleLogout} className="ml-12 mt-16 text-lg text-white hover:text-xl">Logout</button> 
   </div> 
  )
}

export default Navbar