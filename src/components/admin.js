import React from "react";
import NavigationBar from './navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import {postMall , getMalls, postLot, getLots, postSlot, deleteBookings} from '../api/api_helper';

const Admin = ()=>{

    const[malls,setMalls] = React.useState([])
    const[lots,setLots] = React.useState([])

    const[addMall, setAddMall] = React.useState({
        showAddMall: false,
        mallName: "",
        mallLocation:""
    })

    const[addLot, setAddLot] = React.useState({
        showAddLot: false,
        mallid: "",
        lotName:""
    })

    const[addSlot, setAddSlot] = React.useState({
        showAddSlot: false,
        lotId:"",
        slotNumber:""
    })

    const[deleteDb, setDeleteDb] = React.useState({
        showDleteDb: false
    })

    const init = () => {
        getMalls().then(data => {
            if (data.error) {
                setMalls([]);
            } else {
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
        setAddSlot({...addSlot, showAddSlot:false})
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
    }

      // ADD LOT FORM RELATED COMPONENTS

    const showAddLotForm = (e)=>{
        e.preventDefault();
        setAddMall({...addMall, showAddMall:false})
        setAddLot({...addLot, showAddLot:true})
        setAddSlot({...addSlot, showAddSlot:false})
        setDeleteDb({...deleteDb, showDleteDb:false})
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
        </div>);
    }

    const handleAddLotFormChange = (name) => event=> {
        setAddLot({ ...addLot, [name]: event.target.value});
    };

    const submitAddLotForm = (e)=>{
        e.preventDefault();
        postLot(addLot.mallid,addLot.lotName).then(data=>console.log(data)).catch(err=>console.log(err))
    }

     // ADD SLOT FORM RELATED COMPONENTS

    const showAddSlotForm = (e)=>{
        e.preventDefault();
        setAddMall({...addMall, showAddMall:false})
        setAddLot({...addLot, showAddLot:false})
        setAddSlot({...addSlot, showAddSlot:true})
        setDeleteDb({...deleteDb, showDleteDb:false})
    }

    const addSlotForm = ()=>{
        return(
        <div>
        <div style={{width:"25px"}}></div>
        <form style={{marginTop:"10px" , paddingTop:"10px"}}>
        <div className="input-group date" id="startTime">
        <label><b>Select Mall:&nbsp;&nbsp;</b></label>
        <select onChange={e=>handleChangeMall(e.target.value)} >
        <option>Please select</option>
        {malls &&
            malls.map((c, i) => (
                <option key={i} value={c.id}>
                    {c.mall_name}
                </option>
            ))}
        </select>
        </div>
        <div className="input-group date" id="startTime">
        <label><b>Select Lot:&nbsp;&nbsp;</b></label>
        <select onChange={handleAddSlotFormChange("lotId")} >
        <option>Please select</option>
        {lots && lots.map((c, i) => (
            <option key={i} value={c.id}>
                {c.lot_name}
            </option>
        ))

        }
        </select>
        </div>
        <div style={{margin:"55px"}}></div>
        <div className="input-group date">
        <label><b>SLOT NUMBER:&nbsp;&nbsp; </b> </label>
        <input className="form-control" onChange={handleAddSlotFormChange("slotNumber")} type="text" style={{backgroundColor: "rgb(236,249,244)",fontFamily: "Allerta, sans-serif"}}/></div>
        <div style={{margin:"25px"}}></div>
        <div className="input-group date" id="startTime">
        <button className="btn-block" onClick={e=>submitAddSlotForm(e)} style={{color: "rgba(0,0,0,0.61)",fontFamily: "Alfa Slab One, cursive",fontSize: "16px"}}><b>ADD SLOT</b></button>
        </div>
        </form>
        </div>);
    }
    //Get lots as per the selection of the mall
    const handleChangeMall = (data)=>{
        getLots(data).then((data)=> {console.log(data);setLots(data.lots)})
    }

    const handleAddSlotFormChange = (name) => event=> {
        setAddSlot({ ...addSlot, [name]: event.target.value});
    };

    const submitAddSlotForm=(e)=>{
        e.preventDefault();
        postSlot(addSlot.lotId,addSlot.slotNumber).then((data)=> {console.log(data)})
    }

    const showDeleteTab = (e)=>{
        e.preventDefault();
        setAddMall({...addMall, showAddMall:false})
        setAddLot({...addLot, showAddLot:false})
        setAddSlot({...addSlot, showAddSlot:false})
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
                <button className="btn-block" onClick={e=>showAddSlotForm(e)} style={{color: "rgba(0,0,0,0.61)",fontFamily: "Alfa Slab One, cursive",fontSize: "16px"}}>ADD SLOT</button>
                </div>
                <div className="input-group date" id="startTime">
                <button className="btn-block" onClick={e=>showDeleteTab(e)} style={{color: "rgba(0,0,0,0.61)",fontFamily: "Alfa Slab One, cursive",fontSize: "16px"}}>CLEAR DB</button>
                </div>
                </form>
                {/* Add mall form */}
                {addMall.showAddMall && addMallForm() }
                {addLot.showAddLot && addLotForm() }
                {addSlot.showAddSlot && addSlotForm() }
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