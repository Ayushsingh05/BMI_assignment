import React, { useState } from 'react';
import './index.css';
import axios from 'axios';
import Cookies from 'universal-cookie'
import { useToast } from '@chakra-ui/react';
export const Calculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [color,setColor]= useState("green");
  const toast = useToast();
  const cookies = new Cookies();

  const getBMICategory = (bmi) => {
    if (Number(bmi) < 18.5) {
   
      return "Underweight";
    } else if (Number(bmi) < 25) {
      
      return "Normal weight";
    } else if (Number(bmi) < 30) {
  
      return "Overweight";
    } else {

      return "Obese";
    }
  }
  const  getCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours() % 12 || 12).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    const datetime = `${year}-${month}-${day}/${hour}:${minute} ${ampm}`;
    return datetime;
  }
  
  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };
  const token= cookies.get('jwt')

  const handleCalculateClick = async () => {
    axios.post('https://bmi-assignment.vercel.app/users/bmi', {
      heightFeet:height,weightKg:weight
    }, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }).then((res)=>{
      setBmi(res.data)
        axios.put('https://bmi-assignment.vercel.app/users/add/history',{
          height:height, weight:weight, result:res.data, date:getCurrentTime()
        }, {
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          }})
    }).catch((error)=>{
      toast({
        title: 'Error found',
        position: "top",
        description: error.response.data.message,
        status: 'error',
        duration: 1000,
        isClosable: true,
      })
    })
  };

  return (
    <div className='calculator'>
      <h1>BMI Calculator</h1>
      <div className='input-group'>
        <label htmlFor='height'>Height (in feet): </label>
        <input
          type='number'
          name='height'
          value={height}
          onChange={handleHeightChange}
          className='input-field'
        />
      </div>
      <div className='input-group'>
        <label htmlFor='weight'>Weight (in kg): </label>
        <input
          type='number'
          name='weight'
          value={weight}
          onChange={handleWeightChange}
          className='input-field'
        />
      </div>
      <button onClick={handleCalculateClick} className='calculate-btn'>
        Calculate BMI
      </button>
      {bmi &&<><div className='result'>{bmi}</div> <div className='result'>You are <span>{getBMICategory(bmi)}</span> </div> </> }
    </div>
  );
};

