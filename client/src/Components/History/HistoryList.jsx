import React from 'react'
import './index.css'
import Cookies from 'universal-cookie'
import axios from 'axios';
export const HistoryList = ({ props, func }) => {
  const { height, weight, result, date, _id } = props;
  const cookies = new Cookies();
  const token = cookies.get('jwt');
  const handleDelete = async () => {
    axios.put(`http://localhost:8080/users/delete/history/${_id}`, {},{
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }).then((res) => {

      func(_id);
    }).catch((e) => {
      console.log(e);
    })
  }
  return (
    <div class="data-row">
      <div class="data-cell">{height} feet</div>
      <div class="data-cell">{weight} kg </div>
      <div class="data-cell">{result}</div>
      <div class="data-cell">{date}</div>
      <div class="data-cell"><button onClick={handleDelete}>Delete</button></div>
    </div>

  )
}
