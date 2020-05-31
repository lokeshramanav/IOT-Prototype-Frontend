import React from "react";
import NavigationBar from './navbar';
import "../login-page.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import '../styles/login-page.css';
import { useCookies } from "react-cookie";
import {Link } from "react-router-dom";

const Home = ()=> {
    const[userName , setUserName] = React.useState("")
    const[email , setEmail] = React.useState("")
    const [cookies, setCookie] = useCookies(['name','email']);

    const addUserNameToCookie = ()=>{
        console.log("this is the username!!!")
        console.log(userName)
        setCookie('name', userName, { path: '/' });
        setCookie('email', email, { path: '/' });
        console.log(cookies.name)
    }

    const getUserName = ()=>{
        return (
            <div className="login-clean" style={{height: "1000px",backgroundColor: "rgb(135,177,213)"}}>
            <form >
            <h2 className="sr-only">Login Form</h2>
            <p style={{fontFamily: "Allerta, sans-serif",backgroundColor: "#ffffff",fontSize: "25px"}}>Hi!!! There how do we call you</p>
            <div className="illustration"></div>
            <div className="form-group"><label>Username: </label><input value={userName} onChange={(event)=> setUserName(event.target.value)}className="form-control" type="text" style={{backgroundColor: "rgb(236,249,244)",fontFamily: "Allerta, sans-serif"}}/></div>
            <div className="form-group"><label>Email: </label><input value={email} onChange={(event)=> setEmail(event.target.value)}className="form-control" type="text" style={{backgroundColor: "rgb(236,249,244)",fontFamily: "Allerta, sans-serif"}}/></div>
            <div className="form-group"><Link to="/bookslot" ><button onClick={addUserNameToCookie()}className="btn btn-primary btn-block" style={{color: "rgba(0,0,0,0.61)",fontFamily: "Alfa Slab One, cursive",fontSize: "16px"}}>BOOK SLOT</button></Link></div>
            </form>
            </div>

        );
    }


    return(
        <div>
        <NavigationBar/>
        {getUserName()}
        </div>
    );
}


export default Home;