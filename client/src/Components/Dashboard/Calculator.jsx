import React, { useState } from 'react';
import './index.css';

export const Calculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState('');
  const getBMICategory = (bmi) => {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi < 25) {
      return "Normal weight";
    } else if (bmi < 30) {
      return "Overweight";
    } else {
      return "Obese";
    }
  }
  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleCalculateClick = () => {
    setBmi(calculateBMI(height, weight));
  };

  const calculateBMI = (height, weight) => {
    return 'Your BMI is ' + height + 'ft and ' + weight + 'kg';
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
      {bmi && <div className='result'>{bmi}</div>}
    </div>
  );
};

