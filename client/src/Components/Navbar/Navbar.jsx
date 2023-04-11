import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Cookies from 'universal-cookie'
import { HiBars3 } from 'react-icons/hi2'
import { FaTimes } from 'react-icons/fa'
import { appContext } from "../../Context/AppContext";
function Navbar() {
    const [click, setClick] = useState(false);
    const navigate = useNavigate();
    const cookies = new Cookies();
    const { loggedIn, setLoggedIn } = useContext(appContext)

    const handleClick = () => setClick(!click);
    return (
        <>
            <nav className="b">
                <div className="nav-container">
                    <NavLink
                        exact to="/"
                        className="nav-logo">
                        BMICalc
                        <i className="fas fa-code"></i>
                    </NavLink>

                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink
                                exact to="/"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/history"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                History
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/profile"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Profile
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/login"
                                activeClassName="active"
                                className="nav-links"
                                onClick={() => {
                                    if (loggedIn) {
                                        cookies.remove('jwt');
                                        navigate('/login')
                                        setLoggedIn(false)
                                    }
                                    handleClick()
                                }}
                            >

                                {loggedIn ? "Logout" : "Login"}
                            </NavLink>
                        </li>
                    </ul>
                    <div className="nav-icon" onClick={handleClick}>
                        {click ? <FaTimes /> : <HiBars3 />}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;