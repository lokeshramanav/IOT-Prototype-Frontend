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

    return fetch (`${API}/lot/getParkingLot`, {
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



export const postMall = (mallName , mallLocation)=>{
    return fetch(`${API}/mall/addMall`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },body: JSON.stringify({
            mall_name: mallName,
            mall_location: mallLocation
        })
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log( "there is an error in add mall api: " + err);
    });


}

export const postLot = (mallId , lotName)=>{
    return fetch(`${API}/lot/addLot`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },body: JSON.stringify({
            mallId: mallId,
            lotName: lotName
        })
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log( "there is an error in lot mall api: " + err);
    });


}


export const getLots = (mallId)=>{

  return fetch(`${API}/lot/getLots`, {
    method: "POST",
    headers:{
        "Content-Type": "application/json"
    },
    body:JSON.stringify({mallId:mallId})
  }).then(response => {
    return response.json();
}).catch(err => {
    console.log( "there is an error in get lot api: " + err);
})
}

export const postSlot = (lotId, slotNumber)=>{
    return fetch (`${API}/slot/addSlots`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({slotNumber:slotNumber, lotId:lotId})
      }).then(response => {
        return response.json();
    }).catch(err => {
        console.log( "there is an error in add slot api: " + err);
    })
}

export const deleteBookings = ()=>{
    return fetch (`${API}/bookingDetail/delete`,{
        method: "DELETE"
      }).then(response => {
        return response.json();
    }).catch(err => {
        console.log( "there is an error in delete booking api: " + err);
    })
}