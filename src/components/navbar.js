import React from "react";
import {Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const NavigationBar = ()=>{
    return(
        <div>
        <nav className="navbar navbar-light navbar-expand-md" style={{backgroundColor: "#6b69f7"}}>
        <div className="container-fluid"><a className="navbar-brand" href="/">SureReserve</a><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse"
                id="navcol-1">
                <ul className="nav navbar-nav">
                    <li className="nav-item" role="presentation"><Link className="nav-link active" to="/">Home</Link></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link" to="/admin" style={{opacity: 1,filter: "blur(0px)",color: "rgba(0,0,0,0.9)"}}>Admin</Link></li>
                    <li className="nav-item" role="presentation"></li>
                </ul>
            </div>
        </div>
    </nav>
        </div>
    );
}

export default NavigationBar;