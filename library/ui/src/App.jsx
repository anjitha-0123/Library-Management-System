import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Frontpage from './pages/Frontpage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Admindash from './pages/Admindash'
import Home from './pages/Home'
import AddBook from './pages/Addbook'
import ViewBookPage from './pages/Viewbookpage'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Frontpage/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/admindash' element={<Admindash/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/addbook' element={<AddBook/>}/>
      <Route path='/viewbook' element={<ViewBookPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}


export default App