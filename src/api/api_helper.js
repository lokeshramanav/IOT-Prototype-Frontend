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