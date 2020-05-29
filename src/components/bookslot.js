import React from "react";
import NavigationBar from './navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { useCookies } from 'react-cookie';


const BookSlot = ()=>{
    const [cookies, setCookie] = useCookies(['name']);

    const[bookingDate,setBookingDate ] = React.useState(new Date())
    const handlebookingDate = (date)=>{
        console.log(date)
        setBookingDate(date)
    }

    const bookingSlotForm = ()=>{
        return (
            <div className="login-clean" style={{backgroundColor: "rgb(135,177,213)"}}>
            <form >
            <h2 >Hello {cookies.name}!!!</h2>
            <label>Select Date: </label>
            <DatePicker selected={bookingDate} onChange={(date)=> handlebookingDate(date)}/>
            <label>Select Time: </label>
            <TimePicker defaultValue={moment()} showSecond={false} minuteStep={15} />
            </form>
            </div>
        );
    }


    return( <div>
            <NavigationBar/>
            {bookingSlotForm()}
            </div>
        );
}

export default BookSlot;