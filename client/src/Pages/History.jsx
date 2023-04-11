import React, { useEffect, useState } from 'react'
import { HistoryList } from '../Components/History/HistoryList'
import Cookies from 'universal-cookie'

import axios from 'axios';
export const History = () => {
  const [arr,setArr]=  useState();
  const cookies = new Cookies();
  const token= cookies.get('jwt');
  const deleteHistory= (id)=>{
    const filteredArray = arr.filter(el=> el._id !== id);
    setArr(filteredArray);
  }
  useEffect(()=>{
    axios.get(`https://bmi-assignment.vercel.app/users/loggedin`,{
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }).then((res)=>{
      console.log(res.data)
      setArr(res.data.user.calculateHistory);
    }).catch((e)=>{
      console.log(e)
    })
  },[])
  return (
    <div className='history'>
      {arr && arr.length>0 ? arr.map(el=>  <HistoryList key={el._id} props={el} func={deleteHistory} />) : <h1>No History found</h1>}
     
    </div>
  )
}
