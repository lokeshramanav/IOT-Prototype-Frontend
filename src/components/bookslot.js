import React from "react";
import NavigationBar from './navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { useCookies } from 'react-cookie';
import {getMalls , getSlots} from '../api/api_helper';


const BookSlot = ()=>{
    const [cookies, setCookie] = useCookies(['name']);
    const[bookingDate,setBookingDate ] = React.useState(new Date())
    const[malls,setMalls] = React.useState([])
    const[mall,setMall] = React.useState("")
    const[bookingTime,setBookingTime] = React.useState(moment())
    const[bookingMessage, setBookingMessage] = React.useState({
        showMessage: false,
        message: ""
    })

    const init = () => {
        getMalls().then(data => {
            if (data.error) {
                setMalls([]);
            } else {
                setMalls(data.malls);
            }
        })
    };

    React.useEffect(() => {init();}, []);

    const handleMallChange = (data)=>{
        setMall(data)
    }
    const handlebookingDate = (date)=>{
        setBookingDate(date)
    }

    const handlebookingTime = (time)=>{
        setBookingTime(time)
    }

    const printDetails = (e)=>{
        e.preventDefault();
        getSlots(bookingDate.toISOString().slice(0,10), bookingTime.format("HH:mm"), mall, cookies.name ).then(data=>{
            setBookingMessage({...bookingMessage,message:data.message,showMessage:true})
        })
    }

    const bookingSlotForm = ()=>{
        return (
            <div className="login-clean-bs" style={{height:"1000px" ,backgroundColor: "rgb(135,177,213)"}}>
  <form>
    <h2 ><b><i>Hello {cookies.name}!!!</i></b></h2>
    <div style={{margin:"50px"}}></div>
    <div class="form-group">
      <div class="input-group date " id="startDate">
        <label><b>Select Date:&nbsp;&nbsp;</b></label>
        <DatePicker selected={bookingDate} onChange={(date)=> handlebookingDate(date)}/>
      </div>
      <div class="input-group date" id="startTime">
        <label><b>Select Time: &nbsp;&nbsp;</b></label>
        <TimePicker value={bookingTime} onChange={(value)=>{handlebookingTime(value)}} showSecond={false} minuteStep={15} />
      </div>
      <div class="input-group date" id="startTime">
      <label><b>Select Mall:&nbsp;&nbsp;</b></label>
        <select onChange={(event)=>{handleMallChange(event.target.value)}}>
        <option>Please select</option>
        {malls &&
            malls.map((c, i) => (
                <option key={i} value={c.mall_name}>
                    {c.mall_name}
                </option>
            ))}
        </select>
      </div>
      <div class="input-group date" id="startTime">
      <button className="btn-block" onClick={e=>printDetails(e)} style={{color: "rgba(0,0,0,0.61)",fontFamily: "Alfa Slab One, cursive",fontSize: "16px"}}>BOOK</button>
      </div>
    </div>
  </form>
  {slotResults(bookingMessage)}
</div>
        );
    }

    const slotResults=(bookingMessage)=>{

        if(bookingMessage.showMessage){
        return(<div>
            <div style={{width:"25px"}}></div>
        <form style={{marginTop:"10px" , paddingTop:"10px"}}>
      <h2 >{bookingMessage.message}</h2>
      </form></div>);}

    }


    return( <div>
            <NavigationBar/>
            {bookingSlotForm()}
            </div>
        );
}

export default BookSlot;