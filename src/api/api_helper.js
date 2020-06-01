import {API} from '../config'

export const getMalls = ()=>{

    return fetch (`${API}/mall/getMalls`, {
        method: "GET" })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log( "there is an error in mall api: " + err);
        })
}


export const getSlots = (startDate, startTime , mallName, userName )=>{

    return fetch (`${API}/slot/getSlots`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            startDate: startDate,
            startTime: startTime,
            mallName: mallName,
            userName: userName
        })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log( "there is an error in get slots api: " + err);
        })
}




export const createCategory =( userId, token, category ) =>{
    return fetch(`/api/category/create/${userId}`, {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`
      },
      body: JSON.stringify(category)
  })
      .then(response => {
          return response.json();
      })
      .catch(err => {
          console.log( "there is an error in Category: " + err);
      });
  } ;
