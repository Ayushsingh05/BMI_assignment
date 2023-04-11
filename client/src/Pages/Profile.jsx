import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

export const Profile = () => {

  const [user,setUser] = useState();

  const cookies = new Cookies();
  const token= cookies.get('jwt');

  useEffect(() => {
    axios.get(`https://bmi-assignment.vercel.app/users/loggedin`,{
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }).then((res)=>{
      setUser(res.data.user);
    }).catch((e)=>{
      console.log(e)
    })
  }, []);

  return (
    <div  className="profile">
      <h1>Profile</h1>
      <div>
        <img src="https://img.freepik.com/free-icon/user_318-563642.jpg?w=360" alt="Avatar" style={{ height: '100px', width: '100px', borderRadius: '50%' }} />
      </div>
      <div>
        <p className="name">{user ? user.name : ""}</p>
        <p className="email">{user ? user.email : ""}</p>
      </div>
    </div>
  );
};

