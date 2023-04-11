import React, { createContext, useState } from 'react'
import App from './../App';

export const appContext = createContext();

export const AppContext = () => {
  const [userData, setUserData] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <appContext.Provider value={{ loggedIn, setLoggedIn, userData, setUserData }}>
      <App />
    </appContext.Provider>
  )
}
