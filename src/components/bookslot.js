import React from "react";
import NavigationBar from './navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { useCookies } from 'react-cookie';
import {getMalls} from '../api/api_helper';


const BookSlot = ()=>{
    const [cookies, setCookie] = useCookies(['name']);
    const[bookingDate,setBookingDate ] = React.useState(new Date())
    const[malls,setMalls] = React.useState([])

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


    const handlebookingDate = (date)=>{
        console.log(date)
        setBookingDate(date)
    }

    const bookingSlotForm = ()=>{
        return (
            <div className="login-clean-bs" style={{height:"1000px", backgroundColor: "rgb(135,177,213)"}}>
            <form >

            
            <h2 >Hello {cookies.name}!!!</h2>
            <div style={{margin:"25px"}}></div>
            <div class="form-group">
            <label>Select Date: </label>
            <DatePicker selected={bookingDate} onChange={(date)=> handlebookingDate(date)}/>
            <div style={{margin:"25px"}}></div>
            <label>Select Time: </label>
            <TimePicker defaultValue={moment()} showSecond={false} minuteStep={15} />
            <div style={{margin:"25px"}}></div>
            <label>Select Mall: &nbsp;&nbsp;</label>
            <select>
            <option>Please select</option>
            {malls &&
                malls.map((c, i) => (
                    <option key={i} value={c.id}>
                        {c.mall_name}
                    </option>
                ))}
            </select>
            </div>
            <div>
                    <textarea style={{height:"250px"}}></textarea>
            </div>
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