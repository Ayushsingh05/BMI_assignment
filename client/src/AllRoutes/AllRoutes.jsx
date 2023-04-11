import React, { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../Pages/Login'
import Navbar from '../Components/Navbar/Navbar'
import { Dashboard } from './../Pages/Dashboard';
import { History } from './../Pages/History';
import { Profile } from '../Pages/Profile';
import { appContext } from '../Context/AppContext';
import Cookies from 'universal-cookie';

export const AllRoutes = () => {
    const cookies = new Cookies();
    const token = cookies.get('jwt')
    const { loggedIn, setLoggedIn } = useContext(appContext);
    useEffect(() => {
        if (token) {
            setLoggedIn(true)
        }
    }, [])
    return (
        <>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Dashboard />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/history" element={loggedIn ? <History /> : <Login />} />
                <Route exact path='/profile' element={loggedIn ? <Profile /> : <Login />} />
            </Routes>
        </>
    )
}
