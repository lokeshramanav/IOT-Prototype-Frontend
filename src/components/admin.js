import React from "react";
import NavigationBar from './navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import {postMall , getMalls, postLot, getLots, postSlot, deleteBookings} from '../api/api_helper';

const Admin = ()=>{

    const[malls,setMalls] = React.useState([])
    const[addMall, setAddMall] = React.useState({
        showAddMall: false,
        showListMall:false,
        mallName: "",
        mallLocation:"",
        listMalls:[]
    })
    const[addLot, setAddLot] = React.useState({
        showAddLot: false,
        mallid: "",
        lotName:""
    })


    const[deleteDb, setDeleteDb] = React.useState({
        showDleteDb: false
    })

    const init = () => {
        getMalls().then(data => {
            if (data.error) {
                setMalls([]);
            } else {
                console.log("this is the init functions!!!")
                setMalls(data.malls);
            }
        });


    }

    React.useEffect(() => {init();}, []);

    // ADD MALL FORM RELATED COMPONENTS
    const showAddMallForm = (e)=>{
        e.preventDefault();
        setAddMall({...addMall, showAddMall:true})
        setAddLot({...addLot, showAddLot:false})
        setDeleteDb({...deleteDb, showDleteDb:false})
    }

    const addMallForm=()=>{
        return(<div>
            <div style={{width:"25px"}}></div>
        <form style={{marginTop:"10px" , paddingTop:"10px"}}>
        <div className="form-group">
        <label><b>MALL NAME: </b></label>
        <input className="form-control" onChange={handleAddMallFormChange("mallName")} type="text" style={{backgroundColor: "rgb(236,249,244)",fontFamily: "Allerta, sans-serif"}}/></div>
        <div className="form-group">
        <label><b>MALL LOCATION</b> </label>
        <input className="form-control" onChange={handleAddMallFormChange("mallLocation")} type="text" style={{backgroundColor: "rgb(236,249,244)",fontFamily: "Allerta, sans-serif"}}/></div>
        <div className="input-group date" id="startTime">
        <button className="btn-block"  onClick={e=>submitAddMall(e)}style={{color: "rgba(0,0,0,0.61)",fontFamily: "Alfa Slab One, cursive",fontSize: "16px"}}><b>ADD MALL</b></button>
        </div>
        </form>
        {listMall()}
        </div>);

    }

    const listMall=()=>{


        return(<div>
        <form style={{marginTop:"10px" , paddingTop:"10px"}}>
        <table style={{width:"100%"}}>
        <thead>
            <tr>
              <th>MALL NAME</th>
              <th>MALL LOCATION</th>
            </tr>
            </thead>
            <tbody>
            {
                malls.map((c, i) => (<tr key={i}>
                    <td>{c.mall_name}</td>
                    <td>{c.mall_location}</td></tr>
                ))}
                </tbody>
        </table>
        </form>
        </div>);
    }

    const handleAddMallFormChange = (name) => event=> {
        setAddMall({ ...addMall, [name]: event.target.value});
    };

    const submitAddMall = (e)=>{
        e.preventDefault();
        postMall(addMall.mallName, addMall.mallLocation).then(data=>{
            console.log(data)
        })
        getMalls().then(data => {
            if (data.error) {
                setAddMall({...addMall, listMalls:[]});
            } else {
                setMalls(data.malls);
                setAddMall({...addMall, listMalls:data.malls , showListMall:true});
            }
        });

        //setAddMall({...addMall, showListMall:true})
    }

      // ADD LOT FORM RELATED COMPONENTS

    const showAddLotForm = (e)=>{
        e.preventDefault();
        setAddMall({...addMall, showAddMall:false, showListMall:false})
        setAddLot({...addLot, showAddLot:true})
        setDeleteDb({...deleteDb, showDleteDb:false})
        //setAddMall({...addMall, showListMall:false});
    }

    const addLotForm = ()=>{
        return(
        <div>
        <div style={{width:"25px"}}></div>
        <form style={{marginTop:"10px" , paddingTop:"10px"}}>
        <div className="input-group date" id="startTime">
        <label><b>Select Mall:&nbsp;&nbsp;</b></label>
        <select onChange={handleAddLotFormChange("mallid")} >
        <option>Please select</option>
        {malls &&
            malls.map((c, i) => (
                <option key={i} value={c.id}>
                    {c.mall_name}
                </option>
            ))}
        </select>
        </div>
        <div style={{margin:"55px"}}></div>
        <div className="input-group date">
        <label><b>LOT NAME:&nbsp;&nbsp; </b> </label>
        <input onChange={handleAddLotFormChange("lotName")} className="form-control" type="text" style={{backgroundColor: "rgb(236,249,244)",fontFamily: "Allerta, sans-serif"}}/></div>
        <div style={{margin:"25px"}}></div>
        <div className="input-group date" id="startTime">
        <button onClick ={e=>submitAddLotForm(e)}className="btn-block" style={{color: "rgba(0,0,0,0.61)",fontFamily: "Alfa Slab One, cursive",fontSize: "16px"}}><b>ADD LOT</b></button>
        </div>
        </form>
        { listLot()}
        </div>);
    }

    const handleAddLotFormChange = (name) => event=> {
        setAddLot({ ...addLot, [name]: event.target.value});
    };

    const submitAddLotForm = (e)=>{
        e.preventDefault();
        postLot(addLot.mallid,addLot.lotName).then(data=>console.log(data)).catch(err=>console.log(err))
        getMalls().then(data => {
            if (data.error) {
                setMalls([]);
            } else {
                console.log("this is the init functions!!!")
                setMalls(data.malls);
            }
        });
    }

    const listLot = ()=>{
        return(<div>
            <form style={{marginTop:"10px" , paddingTop:"10px"}}>
            <table style={{width:"100%"}}>
            <thead>
                <tr>
                  <th>MALL NAME</th>
                  <th>PARKING LOT</th>
                </tr>
                </thead>
                <tbody>
                {
                    malls.map((c, i) => (<tr key={i} rowspan={c.lot.length}>
                        <td >{c.mall_name}</td>
                        {c.lot.map((m,k)=> (<tr style={{borderStyle:"none"}}><td style={{borderStyle:"none"}}>{m.lot_name}</td></tr>))}
                        </tr>
                    ))}
                </tbody>
            </table>
            </form>
            </div>);
    }

    // View and delete booking history
    const showDeleteTab = (e)=>{
        e.preventDefault();
        setAddMall({...addMall, showAddMall:false})
        setAddLot({...addLot, showAddLot:false})
        setDeleteDb({...deleteDb, showDleteDb:true})
        deleteBookings().then(data=>console.log(data)).catch(err=>console.log(err))
    }

    const deleteDbTab = ()=>{
        return(<div>
            <div style={{width:"25px"}}></div>
        <form style={{marginTop:"10px" , paddingTop:"10px"}}>
      <h2 ><b>The Bookings History has been deleted!!!</b></h2>
      </form></div>);
    }

    const adminPage = ()=>{
        return(<div className="login-clean-bs" style={{height:"1000px" ,backgroundColor: "rgb(135,177,213)"}}>
                <form>
                <div className="input-group date" id="startTime">
                <button className="btn-block" onClick={e=>showAddMallForm(e)} style={{color: "rgba(0,0,0,0.61)",fontFamily: "Alfa Slab One, cursive",fontSize: "16px"}}>ADD MALL</button>
                </div>
                <div className="input-group date" id="startTime">
                <button className="btn-block" onClick={e=>showAddLotForm(e)} style={{color: "rgba(0,0,0,0.61)",fontFamily: "Alfa Slab One, cursive",fontSize: "16px"}}>ADD LOT</button>
                </div>
                <div className="input-group date" id="startTime">
                <button className="btn-block" onClick={e=>showDeleteTab(e)} style={{color: "rgba(0,0,0,0.61)",fontFamily: "Alfa Slab One, cursive",fontSize: "16px"}}>CLEAR DB</button>
                </div>
                </form>
                {/* Add mall form */}
                {addMall.showAddMall && addMallForm() }
                {addLot.showAddLot && addLotForm() }
                {deleteDb.showDleteDb && deleteDbTab() }
                </div>);
    }
    return( <div>
        <NavigationBar/>
        {adminPage()}
        </div>
    );

}


export default Admin;