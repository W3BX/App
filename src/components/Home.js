import React from 'react'
import Navbar from './Navbar'
import DashBoard from "./Dashboard"
import Login from './Login'
import Logout from './Logout'
import Register from './Register'
import User from './user'
import Error from './Error'
import "../main.scss"
import { Route, Routes, Switch } from "react-router-dom"


const Home = () => {
    return (
        <div className='container-fluisd'>
            <Navbar />
            <Routes>
                <Route path="/" element={<DashBoard />} />
                <Route path="/login" element={<Login />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/register' element={<Register />} />
                <Route path='/user' element={<User />} />
                <Route path='*' element={<Error />} />
            </Routes>
        </div>
    )
}

export default Home