import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../Pages/Login'
import Navbar from '../Components/Navbar/Navbar'
import { Dashboard } from './../Pages/Dashboard';
import { History } from './../Pages/History';



export const AllRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Dashboard />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/history" element={<History />} />
            </Routes>
        </>
    )
}
