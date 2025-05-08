import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/images/logo.avif'



function Frontpage() {
  return (
    <div className="bg-black">
 

    <nav>
        <div className=" flex justify-end mr-6 pt-8 "><Link to='/login' className="w-28 h-10 pt-2 pl-4 bg-red-400 rounded-lg text-white text-xl font-sans mr-4 ">Login</Link>
          <Link to='/signup' className="w-28 h-10 bg-red-400 rounded-lg text-white text-xl font-sans pt-2 pl-4">Register</Link></div>
    </nav>
      


<div className="mt-6 border-2 h-[700px] ml-6 mr-6 "><a><img src={logo} alt='Logo' className="size-56 rounded-full mx-auto  shadow-lg shadow-slate-600 mt-28"/></a>
    <div className=" w-full h-32 mt-6 grid justify-center">
     <h1 className="font-bold text-5xl pt-4 text-white mx-auto">WELCOME TO BOOKSHELF</h1><br></br>
     <p className="font-lg mb-[15px] text-white text-3xl mx-auto">"Today a reader, tomorrow a leader." - Margaret Fuller</p>
    </div></div> 
<footer>
    <p className="bg-slate-900 text-white flex justify-center py-4 mt-28">&copy;2024  Contact Us: 9744890343, libadmin@buk.ac.in.</p>
</footer>





</div>
  )
}

export default Frontpage